// AddAssessmentButton.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const AddAssessmentButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Admin-AssessmentCreation');
  };

  return (
    <IconButton
      onClick={handleClick}
      style={{
        backgroundColor: 'rgba(128, 97, 195, 0.1)',
        borderRadius: '50%',
        padding: 10,
        color: 'rgba(128, 97, 195, 1)',
        marginLeft: 16, 
      }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddAssessmentButton;
