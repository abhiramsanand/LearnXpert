import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Trainee {
  id: number;
  name: string;
  batch: string;
  email: string;
}

interface TraineeTableProps {
  selectedBatch: number;
}

const batchNames = ['batch 1', 'batch 2', 'batch 3', 'batch 4'];

const TraineeTable: React.FC<TraineeTableProps> = ({ selectedBatch }) => {
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await fetch('/Trainees.json');
        const data = await response.json();
        setTrainees(data);
      } catch (error) {
        console.error('Failed to fetch trainee data:', error);
      }
    };

    fetchTrainees();
  }, []);

  const filteredTrainees = trainees.filter(
    (trainee) => trainee.batch === batchNames[selectedBatch - 1]
  );

  const handleViewClick = (id: number, name: string, email: string, batch: string) => {
    navigate(`/trainee/${id}`, { state: { id, name, email, batch } });
  };

  return (
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
          {filteredTrainees.map((trainee, index) => (
            <TableRow key={trainee.id}>
              <TableCell style={{ fontSize: '12px' }}>{index + 1}</TableCell> {/* Serial number */}
              <TableCell style={{ fontSize: '12px' }}>{trainee.name}</TableCell>
              <TableCell align="center" style={{ fontSize: '12px' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#8061C3', color: 'white', fontSize: '12px' }}
                  onClick={() => handleViewClick(trainee.id, trainee.name, trainee.email, trainee.batch)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TraineeTable;
