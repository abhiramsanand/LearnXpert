import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import { Trainee } from '../ManageBatch/BatchDetails';
import axios from "axios";

interface EditTraineeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userName: string, email: string, percipioEmail: string, password: string) => void;
  trainee: Trainee;
}

const EditTraineeModal: React.FC<EditTraineeModalProps> = ({ open, onClose, onSubmit, trainee }) => {
  const [userName, setUserName] = useState(trainee.userName);
  const [email, setEmail] = useState(trainee.email);
  const [percipioEmail, setPercipioEmail] = useState(trainee.percipioEmail);
  const [password, setPassword] = useState(trainee.password);

 // In EditTraineeModal.tsx

const handleSubmit = async () => {
    try {
        await axios.put(`https://ilpex-backend.onrender.com/api/v1/batches/trainees/${trainee.traineeId}`, {
            userName,
            email,
            percipioEmail,
            password
        });
        onSubmit(userName, email, percipioEmail, password);
        onClose();
    } catch (error) {
        console.error("Error updating trainee:", error);
        // Handle error (e.g., show a notification)
    }
};

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Trainee</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="User Name"
          fullWidth
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Percipio Email"
          type="email"
          fullWidth
          value={percipioEmail}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPercipioEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="text"
          fullWidth
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTraineeModal;
