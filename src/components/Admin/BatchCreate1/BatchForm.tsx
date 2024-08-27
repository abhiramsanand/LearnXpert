import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BatchForm: React.FC = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [programs, setPrograms] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<boolean>(false); // State for file selection
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/programs");
        setPrograms(response.data.map((program: { programName: string }) => program.programName));
      } catch (error) {
        console.error("Error fetching programs", error);
        alert("Error fetching programs.");
      }
    };

    fetchPrograms();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setFileSelected(true); // Update state when file is selected
    }
  };

  const handleSubmit = async () => {
    if (selectedProgram === '') {
      alert("Please select a program.");
      return;
    }

    const formData = new FormData();
    const batchData = JSON.stringify({ batchName, startDate, endDate, programName: selectedProgram });
    formData.append("batchData", batchData);

    if (file) {
      formData.append("file", file);
    } else {
      alert("Please upload a file.");
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
      const batchId = response.data.batchId; // Correctly access batchId from the response
      setSuccessMessage("Batch created successfully!");
      setSuccessModalOpen(true); // Open success modal
      navigate(`/Admin-BatchAdd2/${batchId}`); // Pass batchId to the next page
    } catch (error) {
      console.error("There was an error creating the batch!", error);
      alert("There was an error creating the batch. Check the console for details.");
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
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
          CREATE BATCH
        </Typography>

        <form>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3} alignItems="center">
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Program</InputLabel>
                  <Select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value as string)}
                    label="Program"
                  >
                    {programs.map((program) => (
                      <MenuItem key={program} value={program}>
                        {program}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                      width: "100%",
                      borderRadius: "4px",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3} mt={2}>
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
                    width: "100%",
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
                    width: "100%",
                    borderRadius: "4px",
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Upload the list of trainees (Format: .xlsx)
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
                    color: "#4caf50", // Green color
                    ml: 1,
                    fontSize: "24px",
                  }}
                />
              )}

              <Typography variant="caption" color="textSecondary" ml={1}>
                Don’t have a template? Download it from{" "}
                <a href="/BatchCreationTemplate.xlsx" download style={{ color: "#6C63FF" }}>
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
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <SuccessModal 
        open={successModalOpen} 
        onClose={handleCloseSuccessModal} 
        message={successMessage || "Batch created successfully!"} 
      />
    </Container>
  );
};

const SuccessModal: React.FC<{ open: boolean; onClose: () => void; message: string }> = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BatchForm;
