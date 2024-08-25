import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";

const BatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const batchData = JSON.stringify({ batchName, startDate, endDate });
    formData.append("batchData", batchData);

    if (file) {
      formData.append("file", file);
    } else {
      setMessage("Please upload a file.");
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/batches/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const batchId = response.data.id; // Assuming the response contains the batch ID
      setMessage("Batch created successfully!");
      setMessageType('success');
      navigate(`/Admin-BatchAdd2/${batchId}`); // Pass batchId to the next page
    } catch (error) {
      console.error("There was an error creating the batch!", error);
      setMessage("There was an error creating the batch. Check the console for details.");
      setMessageType('error');
    }
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 2,
          p: 4,
          bgcolor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" fontFamily={"Montserrat, sans-serif"}>
          CREATE BATCH
        </Typography>

        {message && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: messageType === 'success' ? '#d4edda' : '#f8d7da',
              color: messageType === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px',
            }}
          >
            <Typography variant="body2">{message}</Typography>
          </Box>
        )}

        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Batch Name"
                variant="outlined"
                placeholder="ILP-2023-B03"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                InputProps={{
                  sx: {
                    bgcolor: "#FFF",
                    width: "250px",
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Start Date (Tentative)"
                variant="outlined"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  bgcolor: "#FFF",
                  width: "250px",
                  borderRadius: "4px",
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="End Date (Tentative)"
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  bgcolor: "#FFF",
                  width: "250px",
                  borderRadius: "4px",
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Upload the list of trainees (Format: .xlsx)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  color: "#8061C3",
                  bgcolor: "#ffff",
                  border: "6px #8061C3",
                  borderRadius: "24px",
                  height: "46px",
                  fontSize: "16px",
                  marginRight: "26px",
                  borderColor: "#8061C3",
                  "&:hover": {
                    bgcolor: "#D0C7FF",
                  },
                }}
              >
                + UPLOAD FILE
                <input
                  type="file"
                  hidden
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
              </Button>

              <Typography variant="caption" color="textSecondary">
                Don’t have a template? Download it from{" "}
                <a href="#" style={{ color: "#6C63FF" }}>
                  here
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  color: "#8061C3",
                  borderColor: "#8061C3",
                  borderRadius: "4px",
                  height: "36px",
                  width: "90px",
                  fontSize: "16px",
                  marginRight: "26px",
                  "&:hover": {
                    borderColor: "#D0C7FF",
                    bgcolor: "white",
                  },
                }}
                onClick={() => navigate(-1)} // Navigate back
              >
                CANCEL
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#8061C3",
                  color: "#FFFFFF",
                  borderRadius: "4px",
                  height: "36px",
                  width: "90px",
                  fontSize: "16px",
                  "&:hover": {
                    bgcolor: "#D0C7FF",
                  },
                }}
                onClick={handleSubmit}
              >
                NEXT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default BatchForm;
