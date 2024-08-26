import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Define types
interface Admin {
  slno: number;
  name: string;
}

interface AdminTableProps {
  onDeleteClick: (admin: Admin) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ onDeleteClick }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/users/view');
        setAdmins(response.data.map((user: any) => ({
          slno: user.id,
          name: user.userName
        })));
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (adminToDelete: Admin) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${adminToDelete.slno}`);
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.slno !== adminToDelete.slno));
      onDeleteClick(adminToDelete); // Notify the parent component
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Calculate serial number based on page and rows per page
  const getSerialNumber = (index: number) => page * rowsPerPage + index + 1;

  return (
    <TableContainer component={Paper} sx={{ marginBottom: '5px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '4px' }}>Sl. No</TableCell>
            <TableCell sx={{ padding: '4px' }}>Name</TableCell>
            <TableCell sx={{ padding: '4px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin, index) => (
            <TableRow key={admin.slno} sx={{ height: '10px' }}>
              <TableCell sx={{ padding: '2px' }}>{getSerialNumber(index)}</TableCell>
              <TableCell sx={{ padding: '2px' }}>{admin.name}</TableCell>
              <TableCell sx={{ padding: '2px' }}>
                <IconButton onClick={() => handleDelete(admin)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 10, 25]}
        component="div"
        count={admins.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ height: '35px', overflowY: 'hidden' }}
      />
    </TableContainer>
  );
};

export default AdminTable;
