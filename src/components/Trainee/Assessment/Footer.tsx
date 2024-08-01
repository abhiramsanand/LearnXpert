import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        &copy; 2024 Your Company
      </Typography>
    </Box>
  );
};

export default Footer;
