/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TraineeTable from "../../components/Admin/BatchCreate1/TraineeTable";
import AddTraineeModal from "../../components/Admin/BatchCreate1/AddTraineeModal";
import { useNavigate, useParams } from "react-router-dom";
import { Trainee } from "./types"; // Import the Trainee type

const BatchAdd2: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>(); 
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (batchId) {
      fetch(`http://localhost:8080/api/v1/batches/${batchId}/trainees`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: Trainee[]) => setTrainees(data))
        .catch((error) =>
          console.error("There was a problem with the fetch operation:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [batchId]);

  const handleAddTrainee = (
    userName: string,
    email: string,
    percipioEmail: string,
    password: string
  ) => {
    const newTrainee: Trainee = {
      traineeId: trainees.length + 1, // Change id to traineeId
      userName,
      email,
      percipioEmail,
      password,
    };
    setTrainees([...trainees, newTrainee]);
    setModalOpen(false);
  };

  const handleDeleteTrainee = (id: number) => {
    setTrainees(trainees.filter((trainee) => trainee.traineeId !== id)); // Change id to traineeId
  };

  const handleSubmit = () => {
    if (trainees.length === 0) {
      alert("Please add at least one trainee before submitting.");
      return;
    }

    setLoading(true);

    fetch(`http://localhost:8080/api/v1/batches/${batchId}/trainees`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainees),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit trainee data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Trainee data updated successfully:", data);
        setSuccessMessage(data.message);
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error("There was a problem with the submission:", error);
        alert("Error submitting data: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate(-1); 
  };

  const filteredTrainees = trainees.filter(
    (trainee) =>
      trainee.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.percipioEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          mt: 1,
          mb: 5,
          p: 4,
          bgcolor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box sx={{ paddingLeft: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              CREATE BATCH
            </Typography>
            <TextField
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: "30%",
                marginBottom: 2,
                height: "40px",
                "& .MuiInputBase-root": {
                  height: "100%",
                  border: "5px",
                  borderColor: "#8061C3",
                },
              }}
            />
          </Box>

          <TraineeTable
            trainees={filteredTrainees} // Use filtered trainees here
            batchId={Number(batchId)}
            onDeleteTrainee={handleDeleteTrainee} onEditTrainee={function (_id: number): void {
              throw new Error("Function not implemented.");
            } }          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: "#8061C3",
                borderColor: "#8061C3",
                borderRadius: "4px",
                "&:hover": {
                  borderColor: "#D0C7FF",
                  bgcolor: "white",
                },
              }}
              onClick={() => navigate(-1)} 
            >
              Go Back
            </Button>
            <Button
              onClick={() => setModalOpen(true)}
              variant="outlined"
              sx={{
                color: "#8061C3",
                borderColor: "#8061C3",
                borderRadius: "4px",
                "&:hover": {
                  borderColor: "#D0C7FF",
                  bgcolor: "white",
                },
              }}
            >
              <AddIcon />
              Add Trainee
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8061C3",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#6a4bc3",
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

      <AddTraineeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTrainee}
        batchId={Number(batchId)} 
      />

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

export default BatchAdd2;
