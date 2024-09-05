import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<{ id: number; batchName: string }[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/batches");
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches", error);
        alert("Error fetching batches.");
      }
    };

    fetchBatches();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setFileSelected(true);
    }
  };

  const handleSubmit = async () => {
    if (selectedBatch === '') {
      alert("Please select a batch.");
      return;
    }

    const formData = new FormData();
    formData.append("batchId", selectedBatch.toString());

    if (file) {
      formData.append("file", file);
    } else {
      alert("Please upload a file.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/v1/courses/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Course created successfully!");
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("There was an error creating the course!", error);
      alert("There was an error creating the course. Check the console for details.");
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate(-1); // Navigate back or to a different page if needed
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 1,
          p: 4,
          bgcolor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" fontFamily={"Montserrat, sans-serif"}>
          CREATE COURSE
        </Typography>

        <form>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Batch</InputLabel>
                  <Select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(Number(e.target.value))}
                    label="Batch"
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

            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Upload the course details (Format: .xlsx)
              </Typography>
            </Grid>

            <Grid item xs={12} display="flex" alignItems="center">
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

              {fileSelected && (
                <CheckCircleIcon
                  sx={{
                    color: "#4caf50",
                    ml: 1,
                    fontSize: "24px",
                  }}
                />
              )}

              <Typography variant="caption" color="textSecondary" ml={1}>
                Don’t have a template? Download it from{" "}
                <a href="/Course_Creation_Template.xlsx" download style={{ color: "#6C63FF" }}>
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
                onClick={() => navigate(-1)}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{successMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateCourse;
