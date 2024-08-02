import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Assessment {
  id: number;
  name: string;
  dateToBeTaken: string;
}

const CustomTableContainer = styled(Box)(({ theme }) => ({
  maxHeight: 200,
  overflowY: 'auto',
  width: '100%',
  marginBottom: '20px',
  border: '1px solid #D1B2FF',
  backgroundColor:'#F3E8FF',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#A54BFF',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F0F0F0',
    borderRadius: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: 150,
    fontSize: '0.75rem', // Smaller font size for small screens
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& th': {
    fontSize: '1rem',
    padding: '8px',
    backgroundColor:'#F3E8FF',
    borderBottom: '2px solid #D1B2FF',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      padding: '6px',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '& td': {
    border: 'none',
    fontSize: '0.9rem',
    padding: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      padding: '6px',
    },
  },
  '& a': {
    color: 'black',
    textDecoration: 'underline',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

const PendingAssessmentTable: React.FC = () => {
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetch('/PendingAssessment.json') // Adjust the path as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPendingAssessments(data.pendingAssessments))
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  return (
    <CustomTableContainer component={Paper} style={{ maxHeight: 127 }}>
      <Table stickyHeader>
        <StyledTableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell>Date to be Taken</TableCell>
            <TableCell>Take</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {pendingAssessments.map((assessment) => (
            <StyledTableRow key={assessment.id}>
              <TableCell>{assessment.name}</TableCell>
              <TableCell>{assessment.dateToBeTaken}</TableCell>
              <TableCell>
                <a href={`/take-assessment/${assessment.id}`}>Yes</a>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default PendingAssessmentTable;
