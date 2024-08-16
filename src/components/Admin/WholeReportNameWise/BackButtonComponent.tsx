import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
 
const BackButtonComponent: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
 
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <IconButton onClick={handleBack} aria-label="back">
      <ArrowBackIcon />
    </IconButton>
  );
};
 
export default BackButtonComponent;