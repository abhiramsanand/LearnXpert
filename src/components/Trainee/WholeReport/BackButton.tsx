import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      onClick={handleBackClick}
      style={{
        backgroundColor: '#f0f0f0', // Background color for the circle
        border:'1px solid #8518FF ',
        borderRadius: '50%',
        padding: '10px', // Adjust padding as needed
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Optional: Add a shadow for better visibility
        position: 'absolute',
        top: '70px',
        left: '10px',
      }}
    >
      <ArrowBackIcon  sx={{ color: 'black' }}/>
    </IconButton>
  );
};

export default BackButton;
