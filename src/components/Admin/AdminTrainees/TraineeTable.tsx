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
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null); // Start with null
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveBatch = async () => {
      try {
        const batchResponse = await fetch("https://ilpex-backend.onrender.com/api/v1/batches");
        if (!batchResponse.ok) {
          throw new Error('Failed to fetch batch data');
        }
        const batches = await batchResponse.json();

        // Find the active batch
        const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
        if (!activeBatch) {
          console.error("No active batch found");
          return;
        }

        // Set the active batch as the selected batch
        setSelectedBatch(activeBatch.batchId); // Assuming batchId is the identifier
      } catch (error) {
        console.error('Failed to fetch batch data:', error);
      }
    };

    fetchActiveBatch();
  }, []);

  useEffect(() => {
    const fetchTrainees = async () => {
      if (selectedBatch === null) return; // Do nothing if no batch is selected

      try {
        const response = await fetch(`https://ilpex-backend.onrender.com/api/trainees/batch/${selectedBatch}`);
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
    setPage(0);
  };

  const traineesPerPage = 4;
  const displayedTrainees = trainees.slice(page * traineesPerPage, page * traineesPerPage + traineesPerPage);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2, 
          marginTop: '-20px'
        }}
      >
        <BatchSelect selectedBatch={selectedBatch ?? 0} onBatchSelect={handleBatchSelect} /> {/* Default to 0 if selectedBatch is null */}
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
        rowsPerPageOptions={[]}
      />
    </>
  );
};

export default TraineeTable;
