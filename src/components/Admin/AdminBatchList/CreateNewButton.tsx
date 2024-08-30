import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface CreateNewButtonProps {
  to: string;
}

const CreateNewButton: React.FC<CreateNewButtonProps> = ({ to }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      component={Link} 
      to={to} 
      sx={{
        fontSize: { xs: '12px', sm: '14px', md: '16px' }, 
        padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' }, 
        margin: { xs: '4px', sm: '6px', md: '8px' },
        backgroundColor: 'rgba(128, 97, 195)', 
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(0.95)', 
          backgroundColor: 'rgba(128, 97, 195, 0.9)'
        },
      }}
    >
      Create New
    </Button>
  );
};

export default CreateNewButton;
