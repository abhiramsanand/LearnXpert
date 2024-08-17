import React, { useState } from "react";
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
import batches from "../../../../public/batches.json";

const AssessmentForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [batch, setBatch] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      title,
      batch,
      startDate,
      endDate,
      file,
    });
  };

  return (
    <Box
      component={Paper}
      sx={{
        maxWidth: '100%',
        py: "18px",
        px: "40px",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
          mb: 4,
        }}
      >
        Create Assessment
      </Typography>

      {/* Title and batch selection */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
              Title
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ fontSize: "0.875rem" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
              Select Batch
            </Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <Select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                displayEmpty
                renderValue={(selected) =>
                  selected ? selected : "Select Batch"
                }
                sx={{ fontSize: "0.875rem" }}
              >
                {batches.map((batch) => (
                  <MenuItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Date fields */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
            Start Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  size="small"
                  sx={{
                    fontSize: "0.875rem",
                    height: "40px",
                    "& .MuiInputBase-input": {
                      height: "40px",
                      padding: "0 8px",
                      fontSize: "0.875rem",
                    },
                    "& .MuiInputAdornment-root": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              )}
              componentsProps={{
                popper: {
                  sx: {
                    "& .MuiPickersCalendar-root": {
                      width: "200px",
                      height: "auto",
                    },
                  },
                },
              }}
              components={{
                OpenPickerIcon: () => (
                  <CalendarTodayIcon sx={{ fontSize: "0.875rem" }} />
                ),
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
            End Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  size="small"
                  sx={{
                    fontSize: "0.875rem",
                    height: "40px",
                    "& .MuiInputBase-input": {
                      height: "40px",
                      padding: "0 8px",
                      fontSize: "0.875rem",
                    },
                    "& .MuiInputAdornment-root": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              )}
              componentsProps={{
                popper: {
                  sx: {
                    "& .MuiPickersCalendar-root": {
                      width: "200px",
                      height: "auto",
                    },
                  },
                },
              }}
              components={{
                OpenPickerIcon: () => (
                  <CalendarTodayIcon sx={{ fontSize: "0.875rem" }} />
                ),
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      {/* File upload */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "0.875rem",
            color: "black",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Upload the Assessment
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
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
                fontSize: "0.875rem",
                borderColor: "rgba(128, 97, 195)",
                color: "rgba(128, 97, 195)",
                "&:hover": {
                  borderColor: "rgba(128, 97, 195)",
                  backgroundColor: "rgba(128, 97, 195)",
                },
              }}
            >
              {file ? file.name : "Choose File"}
            </Button>
          </label>
          <Link
            href="/template.xlsx"
            download
            sx={{ ml: 2, fontSize: "0.875rem", color: "rgba(128, 97, 195)" }}
          >
            Get Template
          </Link>
        </Box>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            mr: 1,
            fontSize: "0.875rem",
            backgroundColor: "rgba(128, 97, 195)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#7318e5",
            },
          }}
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
          sx={{ fontSize: "0.875rem", color: "rgba(128, 97, 195)", borderColor: "rgba(128, 97, 195)" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AssessmentForm;
