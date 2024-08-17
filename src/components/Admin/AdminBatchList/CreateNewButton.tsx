import React from 'react';
import { Button } from '@mui/material';

const CreateNewButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Responsive font size
        padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' }, // Responsive padding
        margin: { xs: '4px', sm: '6px', md: '8px' }, // Responsive margin
      }}
    >
      Create New
    </Button>
  );
};

export default CreateNewButton;
