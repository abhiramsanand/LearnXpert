import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

interface Admin {
  id: number;
  name: string;
}

interface AdminTableProps {
  onDeleteClick: (adminId: number) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ onDeleteClick }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/users/view');
        setAdmins(
          response.data.map((user: any) => ({
            id: user.id,
            name: user.userName,
          }))
        );
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAdmin) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/users/delete/${selectedAdmin.id}`);
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== selectedAdmin.id));
        onDeleteClick(selectedAdmin.id);
      } catch (error) {
        console.error('Error deleting admin:', error);
      }
      setOpenDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          maxHeight: 'calc(100vh - 377px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          mt: "-28px",
          backgroundColor: '#F1EDEE',
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8061C3",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ padding: '8px', fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ padding: '8px', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ padding: '8px', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow
                key={admin.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#F9F6F7' : '#f9f9f9',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  "&:hover": {
                    backgroundColor: "#e0d8e0",
                  },
                }}
              >
                <TableCell sx={{ padding: '8px' }}>{index + 1}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{admin.name}</TableCell>
                <TableCell sx={{ padding: '8px' }}>
                  <IconButton onClick={() => handleDeleteClick(admin)} sx={{ color: '#d32f2f' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {admins.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ padding: '16px' }}>
                  <Typography variant="body1" color="textSecondary">
                    No admins found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this admin?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminTable;
