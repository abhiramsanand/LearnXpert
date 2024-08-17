import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import CheckCircle icon

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
         
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
            Success
          </Typography>
          <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mr: 1 }} />
        </Box>
        <Typography sx={{ mb: 3 }}>
          Admin added successfully.
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 1,
            textTransform: 'none',
            bgcolor: '#6A1B9A',
            '&:hover': {
              bgcolor: '#4A0072', // Darker color on hover
            },
            transition: 'background-color 0.3s ease',
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
