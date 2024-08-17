import React from 'react';
import { Box, Typography } from '@mui/material';
import AdminTable from '../../components/Admin/CreateAdmin/AdminTable';
import CreateAdminForm from '../../components/Admin/CreateAdmin/CreateAdminForm';

interface CreateAdminPageProps {
  onDeleteClick: (admin: { slno: number, name: string }) => void;
}

const CreateAdminPage: React.FC<CreateAdminPageProps> = ({ onDeleteClick }) => {
  const handleCreateAdmin = (username: string, email: string, password: string) => {
    // Handle the admin creation logic here
    console.log('Creating admin:', { username, email, password });
  };

  return (
    <Box sx={{ padding: '1px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' } }}>
        List of Admins
      </Typography>

      <AdminTable onDeleteClick={onDeleteClick} />
      <CreateAdminForm onCreate={handleCreateAdmin} />
    </Box>
  );
};

export default CreateAdminPage;
