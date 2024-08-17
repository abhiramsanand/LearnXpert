import React, { useState, useEffect } from 'react';
import { Box, Button, Typography,Container, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TraineeTable from '../../components/Admin/BatchCreate1/TraineeTable';
import AddTraineeModal from '../../components/Admin/BatchCreate1/AddTraineeModal';

interface Trainee {
  id: number;
  name: string;
}

const BatchAdd2: React.FC = () => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Correct path to fetch the JSON file from the public folder
    fetch('/Data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Trainee[]) => setTrainees(data))
      .catch((error) => console.error('There was a problem with the fetch operation:', error));
  }, []);
  
  const handleAddTrainee = (name: string) => {
    const newTrainee: Trainee = {
      id: trainees.length + 1,
      name,
    };
    setTrainees([...trainees, newTrainee]);
    setModalOpen(false);
  };

  return (
    <Container>
    <Box
      sx={{
        mt: 2,
        mb:5,
        p: 4,
        bgcolor: "#ffffff", // Softer background color
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
        sx={{ fontWeight: 'bold' }} // Makes the text more bold
      >
        CREATE BATCH
      </Typography>
      <TextField 
        placeholder="Search" 
        sx={{ 
          marginBottom: 2, 
          
          height: '40px',  // Adjust the height of the search bar
          '& .MuiInputBase-root': {
            height: '100%', // Ensures the height applies to the input field
            border:"5px",
            borderColor:"#8061C3",
        }
        }} 
      />
    </Box>
      
     
      <Typography variant="h6" component="h3" gutterBottom>
        List of trainees
      </Typography>
     
      <TraineeTable trainees={trainees} />
      <Box display="flex" justifyContent="center" mt={2}>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ 
          color: "#fff", 
          borderColor: "#8061C3" ,
          bgcolor:"#8061C3"
        }}
        onClick={() => setModalOpen(true)}
      >
        Add New Trainee
      </Button>
    </Box>
      <AddTraineeModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddTrainee} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button variant="outlined" sx={{color:"#8061C3",borderColor:"#8061C3"}}>Go back</Button>
        <Button variant="contained" sx={{bgcolor:"#8061C3"}}>
          Submit
        </Button>
      </Box>
    </Box>
   
    </Box>
    </Container>
  );
};

export default BatchAdd2;
