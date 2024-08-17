import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

interface Trainee {
  id: number;
  name: string;
  email: string;
  percipioEmail: string;
  password: string;
}

interface TraineeTableProps {
  trainees: Trainee[];
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the trainees to display on the current page
  const displayedTrainees = trainees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f3f0f9" }}>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>S I.No</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Name of Trainee</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Percipio Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Password</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedTrainees.map((trainee, index) => (
            <TableRow key={trainee.id} sx={{ height: '40px' }}>
              <TableCell sx={{ padding: '8px' }}>{(page - 1) * rowsPerPage + index + 1}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.name}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.email}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.percipioEmail}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.password}</TableCell>
              <TableCell sx={{ padding: '8px' }}>
                <Button sx={{color:"#8061C3"}} size="small">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
  count={Math.ceil(trainees.length / rowsPerPage)}
  page={page}
  onChange={handlePageChange}
  color="primary"
  sx={{
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    '& .MuiPaginationItem-root': {
      bgcolor: '#8061C3',
      color: '#ffffff', // Optional: Set text color to white for better contrast
      '&.Mui-selected': {
        bgcolor: '#blue',
        color: '#ffffff', // Optional: Set text color to white for better contrast
      },
    },
  }}
/>
    </TableContainer>
  );
};

export default TraineeTable;
 