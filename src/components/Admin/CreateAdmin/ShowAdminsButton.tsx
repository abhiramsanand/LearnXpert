// src/components/Admin/CreateAdmin/ShowAdminsButton.tsx

import React from 'react';
import { Button } from '@mui/material';

interface ShowAdminsButtonProps {
  onClick: () => void;
}

const ShowAdminsButton: React.FC<ShowAdminsButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} sx={{bgcolor:'#8518FF', '&:hover': {
        bgcolor: '#6A1B9A', // Color on hover
      },}}>
      Show Admins
    </Button>
  );
};

export default ShowAdminsButton;
