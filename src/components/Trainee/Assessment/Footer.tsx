// src/components/Trainee/Assessment/Footer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        height: '60px',
        backgroundColor: '#8518FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1200, // Ensure it is above other content
      }}
    >
      <Typography variant="body2">© 2024 Your Company Name</Typography>
    </Box>
  );
};

export default Footer;
