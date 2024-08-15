import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import AdminForm from '../../components/Admin/CreateAdmin/AdminForm';
import AdminModal from '../../components/Admin/CreateAdmin/AdminModal';
import ShowAdminsButton from '../../components/Admin/CreateAdmin/ShowAdminsButton';

interface Admin {
  username: string;
  email: string;
}

const CreateAdminPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAdmin = (admin: Admin) => {
    setAdmins([...admins, admin]);
  };

  const handleDeleteAdmin = (index: number) => {
    setAdmins(admins.filter((_, i) => i !== index));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container
      sx={{
        height: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        padding: '2px',
        overflowY: 'auto', // Enable vertical scrolling
        
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Align to the right
        width: '100%',
        mb: 2,
    

      }}>
        <ShowAdminsButton onClick={handleOpenModal} />
      </Box>
      <Box
        sx={{
          flex: 1, // Take up remaining space
          overflowY: 'auto', // Enable vertical scrolling if needed
        }}
      >
        <AdminForm onAddAdmin={handleAddAdmin} />
      </Box>
      <AdminModal
        open={isModalOpen}
        admins={admins}
        onClose={handleCloseModal}
        onDeleteAdmin={handleDeleteAdmin}
      />
    </Container>
  );
};

export default CreateAdminPage;
