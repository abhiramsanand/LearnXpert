import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination } from '@mui/material';

interface Trainee {
  traineeId: number;  // Updated property name
  userName: string;
  email: string;
  percipioEmail: string;
  password: string;
}

interface TraineeTableProps {
  trainees: Trainee[];
  batchId: number;
  onDeleteTrainee: (id: number) => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees, batchId, onDeleteTrainee }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const displayedTrainees = trainees.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (traineeId: number) => {
    const url = `http://localhost:8080/api/v1/batches/${batchId}/trainees/${traineeId}`;
    console.log("Deleting trainee at URL:", url);
    
    fetch(url, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete trainee');
      }
      console.log('Trainee deleted successfully');
      onDeleteTrainee(traineeId);
    })
    .catch((error) => {
      console.error('There was a problem with the delete operation:', error);
    });
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
            <TableRow key={trainee.traineeId} sx={{ height: '40px' }}> {/* Updated key */}
              <TableCell sx={{ padding: '8px' }}>{(page - 1) * rowsPerPage + index + 1}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.userName}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.email}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.percipioEmail}</TableCell>
              <TableCell sx={{ padding: '8px' }}>{trainee.password}</TableCell>
              <TableCell sx={{ padding: '8px' }}>
                <Button 
                  sx={{ color: "#8061C3" }} 
                  size="small" 
                  onClick={() => {
                    console.log("Delete button clicked for trainee ID:", trainee.traineeId);
                    handleDelete(trainee.traineeId);
                  }}
                >
                  Delete
                </Button>
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
            color: '#ffffff',
            '&.Mui-selected': {
              bgcolor: '#4A00C2',
              color: '#ffffff',
            },
          },
        }}
      />
    </TableContainer>
  );
};

export default TraineeTable;
