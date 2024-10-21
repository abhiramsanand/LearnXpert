import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddTraineeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userName: string, email: string, percipioEmail: string, password: string) => void;
  batchId: number;
}

const AddTraineeModal: React.FC<AddTraineeModalProps> = ({ open, onClose, onSubmit, batchId }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [percipioEmail, setPercipioEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const newTrainee = {
      userName,
      role: 'Trainee',
      email,
      percipioEmail,
      password,
    };

    fetch(`https://ilpex-backend.onrender.com/api/v1/batches/${batchId}/trainees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrainee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Trainee added successfully:', data);
        onSubmit(userName, email, percipioEmail, password);
        setUserName('');
        setEmail('');
        setPercipioEmail('');
        setPassword('');
        onClose(); 
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #8061C3',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: '#8061C3',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
          Add New Trainee
        </Typography>
        <TextField
          fullWidth
          label="User Name"
          placeholder="Enter trainee's name..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Percipio Email"
          placeholder="Enter Percipio email..."
          value={percipioEmail}
          onChange={(e) => setPercipioEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          placeholder="Enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          type="password"
        />
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: '#8061C3',
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTraineeModal;
