import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BatchSelect from '../../../shared components/Admin/BatchSelect';

interface Trainee {
  traineeId: number;
  traineeName: string;
}

const TraineeTable: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(15); // Default batch ID to 15
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [page, setPage] = useState(0); // Current page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/trainees/batch/${selectedBatch}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trainee data');
        }
        const data = await response.json();
        setTrainees(data);
      } catch (error) {
        console.error('Failed to fetch trainee data:', error);
      }
    };

    fetchTrainees();
  }, [selectedBatch]);

  const handleViewClick = (id: number, name: string) => {
    navigate(`/trainee/${id}`, { state: { id, name } });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
    setPage(0); // Reset the page when the batch changes
  };

  // Determine the trainees to display based on the current page
  const traineesPerPage = 4;
  const displayedTrainees = trainees.slice(page * traineesPerPage, page * traineesPerPage + traineesPerPage);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2, // Add some space below the BatchSelect
          marginTop: '-20px'
        }}
      >
        <BatchSelect selectedBatch={selectedBatch} onBatchSelect={handleBatchSelect} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>ID</TableCell>
              <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>Trainee Name</TableCell>
              <TableCell align="center" style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedTrainees.map((trainee, index) => (
              <TableRow key={trainee.traineeId}>
                <TableCell style={{ fontSize: '12px' }}>{index + 1 + page * traineesPerPage}</TableCell> {/* Serial number */}
                <TableCell style={{ fontSize: '12px' }}>{trainee.traineeName}</TableCell>
                <TableCell align="center" style={{ fontSize: '12px' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#8061C3', color: 'white', fontSize: '12px' }}
                    onClick={() => handleViewClick(trainee.traineeId, trainee.traineeName)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={trainees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={traineesPerPage}
        rowsPerPageOptions={[]} // Disable custom rows per page options
      />
    </>
  );
};

export default TraineeTable;
