// src/components/Trainee/Assessment/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: '60px',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1200, // Ensure it is above other content
      }}
    >
      <Toolbar>
        <Typography variant="h6">My Application</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
