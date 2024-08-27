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
      component={Link} // Use the Link component from react-router-dom
      to={to} // Pass the `to` prop to the Link component
      sx={{
        fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Responsive font size
        padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' }, // Responsive padding
        margin: { xs: '4px', sm: '6px', md: '8px' }, // Responsive margin
        backgroundColor: 'rgba(128, 97, 195)', // Background color for default theme
        transition: 'transform 0.3s ease', // Smooth transition for scaling
        '&:hover': {
          transform: 'scale(0.95)', // Scale up the component on hover
          backgroundColor: 'rgba(128, 97, 195, 0.9)'
        },
      }}
    >
      Create New
    </Button>
  );
};

export default CreateNewButton;
