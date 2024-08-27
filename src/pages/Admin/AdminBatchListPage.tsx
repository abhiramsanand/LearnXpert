import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import BatchList from '../../components/Admin/AdminBatchList/BatchList';
import CreateNewButton from '../../components/Admin/AdminBatchList/CreateNewButton';

const AdminBatchListPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for API requests)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false when the page is ready
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 2, sm: 3 }, // Adjust margin-bottom for different screen sizes
            flexDirection: { xs: 'column', sm: 'row' }, // Stack title and button on small screens
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontSize: { xs: '20px', sm: '24px', md: '28px' }, // Responsive font size
              mb: { xs: 2, sm: 0 }, // Add margin-bottom on small screens
            }}
          >
            Batch List
          </Typography>
          <CreateNewButton to="/Admin-BatchAdd" />
        </Box>
        <BatchList />
      </Box>
    </Container>
  );
};

export default AdminBatchListPage;
