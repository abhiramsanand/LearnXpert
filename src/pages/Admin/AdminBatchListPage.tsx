import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import AdminHeader from '../../shared components/AdminHeader';
import Footer from '../../shared components/Footer';
import Sidebar from '../../shared components/AdminSidebar';
import BatchList from '../../components/Admin/AdminBatchList/BatchList';
import CreateNewButton from '../../components/Admin/AdminBatchList/CreateNewButton';

const AdminBatchListPage: React.FC = () => {
  return (
    <>
      <AdminHeader />
      <Sidebar />
      <Container>
        <Box>
          {/* Header with title and button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: { xs: 2, sm: 3 }, // Adjust margin-bottom for different screen sizes
              mt: { xs: -5, sm: -7 }, // Adjust margin-top to avoid overlap with other elements
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
            <CreateNewButton />
          </Box>

          {/* Batch List */}
          <BatchList />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AdminBatchListPage;
