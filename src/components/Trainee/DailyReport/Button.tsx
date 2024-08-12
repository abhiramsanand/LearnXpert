import React from 'react';
import { Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2', // Replace with your desired color
    },
  },
});

interface ButtonsProps {
  onPendingSubmissionsClick: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ onPendingSubmissionsClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="space-around" mb={2}>
        <Button variant="outlined" color="primary" component={Link} to="/Trainee-Wholereport">View Whole Report</Button>
        <Button variant="outlined" color="primary" onClick={onPendingSubmissionsClick}>Pending Submissions</Button>
      </Box>
    </ThemeProvider>
  );
};

export default Buttons;
