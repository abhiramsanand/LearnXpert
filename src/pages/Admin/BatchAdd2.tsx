import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TraineeTable from '../../components/Admin/BatchCreate1/TraineeTable';
import AddTraineeModal from '../../components/Admin/BatchCreate1/AddTraineeModal';
import { useNavigate, useParams } from 'react-router-dom';

interface Trainee {
  id: number;
  userName: string;
  email: string;
  percipioEmail: string;
  password: string;
}

const BatchAdd2: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>(); // Get batchId from URL params
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (batchId) {
      fetch(`http://localhost:8080/api/v1/batches/${batchId}/trainees`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: Trainee[]) => setTrainees(data))
        .catch((error) => console.error('There was a problem with the fetch operation:', error));
    }
  }, [batchId]);

  const handleAddTrainee = (userName: string, email: string, percipioEmail: string, password: string) => {
    const newTrainee: Trainee = {
      id: trainees.length + 1,
      userName,
      email,
      percipioEmail,
      password,
    };
    setTrainees([...trainees, newTrainee]);
    setModalOpen(false);
  };

  const handleDeleteTrainee = (id: number) => {
    setTrainees(trainees.filter((trainee) => trainee.id !== id));
  };

  const handleSubmit = () => {
    // Assuming the API expects a JSON array of trainees
    fetch(`http://localhost:8080/api/v1/batches/${batchId}/trainees`, {
      method: 'PUT', // Use POST if creating new entries, PUT for updating existing ones
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainees),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to submit trainee data');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Trainee data updated successfully:', data);
      navigate(-1); // Navigate back after successful submission
    })
    .catch((error) => console.error('There was a problem with the submission:', error));
  };

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
              sx={{ fontWeight: 'bold' }}
            >
              CREATE BATCH
            </Typography>
            <TextField 
              placeholder="Search" 
              sx={{ 
                width: '30%', 
                marginBottom: 2, 
                height: '40px', 
                '& .MuiInputBase-root': {
                  height: '100%',
                  border: "5px",
                  borderColor: "#8061C3",
                }
              }} 
            />
          </Box>

          <TraineeTable
  trainees={trainees}
  batchId={batchId} // Ensure this is a valid number
  onDeleteTrainee={handleDeleteTrainee} // Ensure this function is defined
/>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
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
              onClick={() => navigate(-1)} // Navigate back
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
              onClick={handleSubmit} // Submit data to the backend
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
        batchId={Number(batchId)} // Ensure batchId is passed as a number
      />
    </Container>
  );
};

export default BatchAdd2;
