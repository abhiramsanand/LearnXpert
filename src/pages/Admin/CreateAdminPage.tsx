import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import AdminTable from '../../components/Admin/CreateAdmin/AdminTable';
import CreateAdminForm from '../../components/Admin/CreateAdmin/CreateAdminForm';
import axios from 'axios';

const CreateAdminPage: React.FC = () => {
  const handleCreateAdmin = async (username: string, email: string, password: string) => {
    try {
      await axios.post('http://localhost:8080/api/v1/users/save', {
        username,
        email,
        password,
        rolesId: '1',
      });
      // Optionally refresh the admin list here
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  const handleDeleteClick = useCallback(async (admin: { slno: number; name: string }) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${admin.slno}`);
      // Optionally refresh the admin list here
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  }, []);

  return (
    <Box
      sx={{
        padding: '8px', // Adjust padding as needed
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start', // Align items to the start
      }}
    >
      {/* Create Admin Form */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px',mb:'-1' }}>
        <CreateAdminForm onCreate={handleCreateAdmin} />
      </Box>

      {/* Admin Table */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontSize: '17px',
            fontWeight: 'bold',
            fontFamily: "Montserrat, sans-serif",
            color: '#8061C3',
            textAlign: 'left', // Ensure text is aligned to the left
            marginBottom: '2px', // Adjust margin if needed
          }}
        >
          List of Admins
        </Typography>
        <AdminTable onDeleteClick={handleDeleteClick} />
      </Box>
    </Box>
  );
};

export default CreateAdminPage;
