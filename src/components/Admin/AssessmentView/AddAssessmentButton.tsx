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
        backgroundColor: '#F3E8FF',
        borderRadius: '50%',
        padding: 10,
        color: '#8518FF',
        marginLeft: 16, // Adjust margin if needed
      }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddAssessmentButton;
