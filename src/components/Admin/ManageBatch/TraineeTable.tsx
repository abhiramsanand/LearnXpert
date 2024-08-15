import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Box, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Trainee {
  no: number;
  name: string;
}

interface TraineeTableProps {
  trainees: Trainee[];
  onAddTrainee: () => void;
}

const TraineeTable: React.FC<TraineeTableProps> = ({ trainees, onAddTrainee }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentTrainees, setCurrentTrainees] = useState<Trainee[]>(trainees);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteTrainee = (traineeNo: number) => {
    const updatedTrainees = currentTrainees.filter((trainee) => trainee.no !== traineeNo);
    setCurrentTrainees(updatedTrainees);
  };

  const paginatedTrainees = currentTrainees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ mb: 1, mt: 5 }}>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', maxHeight: '400px' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>No</TableCell>
              <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrainees.map((trainee) => (
              <TableRow key={trainee.no} sx={{ height: '40px' }}>
                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{trainee.no}</TableCell>
                <TableCell sx={{ fontSize: '0.8rem', padding: '4px' }}>{trainee.name}</TableCell>
                <TableCell sx={{ padding: '4px' }}>
                  <IconButton size="small" onClick={() => handleDeleteTrainee(trainee.no)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" size="small" onClick={onAddTrainee}>
            Add New Trainee
          </Button>
        </Box>
        <Box>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={currentTrainees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ height: '40px', fontSize: '0.8rem', overflow: 'hidden' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TraineeTable;
