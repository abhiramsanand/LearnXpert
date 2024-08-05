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
    <Box component={Paper} sx={{ maxWidth: 800, padding: 2, height: 400 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: "30px", fontWeight: "20px" }}
      >
        Create Assessment
      </Typography>

      {/* Date fields */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.75rem" }}>
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
                    fontSize: "0.75rem",
                    height: "40px",
                    "& .MuiInputBase-input": {
                      height: "40px",
                      padding: "0 8px",
                      fontSize: "0.75rem",
                    },
                    "& .MuiInputAdornment-root": {
                      fontSize: "0.75rem",
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
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.75rem" }}>
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
                    fontSize: "0.75rem",
                    height: "40px",
                    "& .MuiInputBase-input": {
                      height: "40px",
                      padding: "0 8px",
                      fontSize: "0.75rem",
                    },
                    "& .MuiInputAdornment-root": {
                      fontSize: "0.75rem",
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

      {/* Title and batch selection */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.75rem" }}>
            Title
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ fontSize: "0.75rem" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" sx={{ fontSize: "0.75rem" }}>
            Select Batch
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{ maxWidth: "150px" }}
          >
            <Select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              displayEmpty
              renderValue={(selected) => (selected ? selected : "Select Batch")}
              sx={{ fontSize: "0.75rem" }}
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

      {/* File upload */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "0.75rem", color: "#8518FF" }}
        >
          Upload File
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                fontSize: "0.625rem",
                borderColor: "#8518FF", // Set border color
                color: "#8518FF", // Set text color
                "&:hover": {
                  borderColor: "#8518FF", // Ensure border color is maintained on hover
                  backgroundColor: "#f0eaff", // Optional: set a light background color on hover
                },
              }}
            >
              {file ? file.name : "Choose File"}
            </Button>
          </label>
          <Link
            href="/template.xlsx"
            download
            sx={{ ml: 2, fontSize: "0.75rem", color: "#8518FF" }}
          >
            Get Template
          </Link>
        </Box>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="contained"
          // color="primary"
          sx={{ mr: 1, fontSize: "0.625rem", backgroundColor: "#8518FF" }}
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
          sx={{ fontSize: "0.625rem" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AssessmentForm;
