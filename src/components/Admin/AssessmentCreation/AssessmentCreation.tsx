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
  Paper,
  Link,
} from "@mui/material";
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
  const [batch, setBatch] = useState<number | string>(""); // Updated type
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
    formData.append("batchId", batch.toString()); // Ensure batchId is a string
    formData.append("startDate", startDate ? startDate.toISOString().split('T')[0] : ''); // Format as yyyy-mm-dd
    formData.append("endDate", endDate ? endDate.toISOString().split('T')[0] : ''); // Format as yyyy-mm-dd
    if (file) {
      formData.append("file", file);
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/assessmentcreation/create", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        showModal("Success", "Assessment created successfully!");
      } else {
        const errorData = await response.text(); // Read error as text
        showModal("Error", errorData || "An error occurred.");
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
      showModal("Error", "An error occurred. Please try again.");
    }
  };
  
  return (
    <Box component={Paper} className={styles.container}>
      <Typography variant="h4" gutterBottom className={styles.heading}>
        Create Assessment
      </Typography>

      <Box className={styles.formSection}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={styles.label}>
              Title
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={styles.label}>
              Select Batch
            </Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <Select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                displayEmpty
                renderValue={(selected) =>
                  selected ? batches.find(b => b.id === Number(selected))?.batchName : "Select Batch"
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

      <Grid container spacing={3} className={styles.formSection}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" className={styles.label}>
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
          <Typography variant="subtitle1" className={styles.label}>
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
        <Typography variant="subtitle1" className={styles.label}>
          Upload the Assessment
        </Typography>
        <Box className={styles.uploadBox}>
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
              className={styles.uploadButton}
            >
              {file ? file.name : "Choose File"}
            </Button>
          </label>
          <Link
            href="/assets/Files/AssessmentTemplate.xlsx"
            download
            className={styles.downloadLink}
          >
            Get Template
          </Link>
        </Box>
      </Box>

      <Box className={styles.buttonSection}>
        <Button
          variant="contained"
          className={styles.submitButton}
          onClick={handleSubmit}
          size="small"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => console.log("Cancel")}
          size="small"
          className={styles.cancelButton}
        >
          Cancel
        </Button>
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
