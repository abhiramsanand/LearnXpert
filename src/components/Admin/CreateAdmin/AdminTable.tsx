import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    fetch('/admins.json')
      .then((response) => response.json())
      .then((data) => setAdmins(data.admins))
      .catch((error) => console.error('Error fetching admins:', error));
  }, []);

  const handleDelete = (adminToDelete: Admin) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.slno !== adminToDelete.slno));
    onDeleteClick(adminToDelete); // Notify the parent component
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

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
          {admins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin) => (
            <TableRow key={admin.slno} sx={{ height: '10px' }}>
              <TableCell sx={{ padding: '2px' }}>{admin.slno}</TableCell>
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
