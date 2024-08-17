import React, { useState } from 'react';
import { Modal, Box, TextField, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddTraineeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, percipioEmail: string, password: string) => void;
}

const AddTraineeModal: React.FC<AddTraineeModalProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [percipioEmail, setPercipioEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit(name, email, percipioEmail, password);
    setName('');
    setEmail('');
    setPercipioEmail('');
    setPassword('');
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
            color:"#8061C3",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" align="center" sx={{ mb: 2,fontWeight:"bold" }}>
          Add New Trainee
        </Typography>
        <TextField
          fullWidth
          label="Name"
          placeholder="trainee name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="percipio email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Percipio Email"
          placeholder="percipio email..."
          value={percipioEmail}
          onChange={(e) => setPercipioEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          type="password"
        />
        <Box
          sx={{
            
            textAlign: 'center',
          }}
        >
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
