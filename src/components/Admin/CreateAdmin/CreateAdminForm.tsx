import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface CreateAdminFormProps {
  onCreate: (username: string, email: string, password: string) => void;
}

const CreateAdminForm: React.FC<CreateAdminFormProps> = ({ onCreate }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleCreate = () => {
    if (password === confirmPassword) {
      onCreate(username, email, password);
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Admin
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ height: '40px', '& input': { padding: '8px' } }} // Reduced height and padding
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ height: '40px', '& input': { padding: '8px' } }} // Reduced height and padding
          />
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ height: '40px', '& input': { padding: '8px' } }} // Reduced height and padding
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ height: '40px', '& input': { padding: '8px' } }} // Reduced height and padding
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
        >
          Create Admin
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAdminForm;