import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Input,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import UploadIcon from "@mui/icons-material/Upload";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./AssessmentCreation.module.css";
 
interface Batch {
  id: number;
  batchName: string;
}
 
const AssessmentCreation: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [batch, setBatch] = useState<number | string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
 
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
 
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/batches");
        if (response.ok) {
          const data = await response.json();
          setBatches(data);
          if (data.length > 0) {
            setBatch(data[0].id);  
          }
        } else {
          console.error("Failed to fetch batches:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };
 
    fetchBatches();
  }, []);
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
 
  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setOpenModal(true);
  };
 
  const handleCloseModal = () => {
    setOpenModal(false);
  };
 
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("batchId", batch.toString());
    formData.append(
      "startDate",
      startDate ? startDate.toISOString().split("T")[0] : ""
    );
    formData.append(
      "endDate",
      endDate ? endDate.toISOString().split("T")[0] : ""
    );
    if (file) {
      formData.append("file", file);
    }
 
    // Debugging logs
    console.log("Form Data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
 
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/assessments/create",
        {
          method: "POST",
          body: formData,
        }
      );
 
      if (response.ok) {
        showModal("Success", "Assessment created successfully!");
      } else {
        const errorData = await response.text();
        showModal("Error", errorData || "An error occurred.");
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
      showModal("Error", "An error occurred. Please try again.");
    }
  };
 
 
  return (
    <Box>
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mb: 2,
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        CREATE ASSESSMENT
      </Typography>
 
      <Box className={styles.formSection}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                color: "#8061C3",
              }}
            >
              Title
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Assessment 1"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8061C3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8061C3",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                color: "#8061C3",
              }}
            >
              Select Batch
            </Typography>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#8061C3",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8061C3",
                  },
                },
              }}
            >
              <Select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                displayEmpty
                renderValue={(selected) =>
                  selected
                    ? batches.find((b) => b.id === Number(selected))?.batchName
                    : "Batch 5"
                }
                className={styles.select}
              >
                {batches.map((batch) => (
                  <MenuItem key={batch.id} value={batch.id}>
                    {batch.batchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
 
      <Grid container className={styles.formSection}>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              color: "#8061C3",
            }}
          >
            Start Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              components={{
                OpenPickerIcon: () => (
                  <CalendarTodayIcon className={styles.icon} />
                ),
              }}
              componentsProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: styles.textField,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              color: "#8061C3",
            }}
          >
            End Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              components={{
                OpenPickerIcon: () => (
                  <CalendarTodayIcon className={styles.icon} />
                ),
              }}
              componentsProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  className: styles.textField,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
 
      <Box className={styles.uploadSection}>
        <Typography
          sx={{
            color: "#8061C3",
          }}
        >
          Upload the Assessment
        </Typography>
        <Box className={styles.uploadBox} gap={4}>
          <label htmlFor="upload-file">
            <Input
              id="upload-file"
              type="file"
              accept=".xlsx"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              color="primary"
              size="small"
              sx={{
                borderRadius: "20px",
                color: "#8061C3",
                borderColor: "#8061C3",
                "&:hover": {
                  backgroundColor: "#6A529D",
                },
              }}
            >
              {file ? file.name : "Choose File"}
            </Button>
          </label>
          <Link
            href="/assets/Files/AssessmentTemplate.xlsx"
            download
            sx={{
              color: "#5B8C5A",
              textDecoration: "none",
              borderBottom: "1px solid #5B8C5A",
              "&:hover": {
                color: "#8061C3",
                borderBottomColor: "#8061C3",
              },
            }}
          >
            Get template from here
          </Link>
        </Box>
      </Box>
 
      <Box className={styles.buttonSection} gap={4}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          size="small"
          sx={{
            borderRadius: "20px",
            backgroundColor: "#8061C3",
            width: "100px",
            "&:hover": {
              backgroundColor: "#6A529D",
            },
          }}
        >
          Submit
        </Button>
        <RouterLink to="/Admin-Assessments" className={styles.cancelButton}>
          <Button variant="outlined" color="secondary" size="small">
            Cancel
          </Button>
        </RouterLink>
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
 
export default AssessmentCreation;