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
        rolesId: '1' 
      });
      // Optionally refresh the admin list here
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  const handleDeleteClick = useCallback(async (admin: { slno: number, name: string }) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${admin.slno}`);
      // Optionally refresh the admin list here
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  }, []);

  return (
    <Box sx={{ padding: '1px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }}>
        List of Admins
      </Typography>
      <AdminTable onDeleteClick={handleDeleteClick} />
      <CreateAdminForm onCreate={handleCreateAdmin} />
    </Box>
  );
};

export default CreateAdminPage;
