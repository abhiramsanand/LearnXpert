import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Assessment {
  id: number;
  name: string;
  dateTaken: string;
  score: number;
}

const CustomTableContainer = styled(Box)(({ theme }) => ({
  maxHeight: 200,
  overflowY: 'auto',
  width: '100%',
  marginBottom: '20px',
  backgroundColor:'#E6E6FA',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  border: '1px solid #D1B2FF',
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
    fontSize: '0.75rem',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& th': {
    fontSize: '1rem',
    padding: '8px',
    backgroundColor:'#E6E6FA',
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
}));

const CompletedAssessmentTable: React.FC = () => {
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetch('/CompletedAssessment.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCompletedAssessments(data.completedAssessments))
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  return (
    <CustomTableContainer component={Paper}>
      <Table stickyHeader size="small">
        <StyledTableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell>Date Taken</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Retake</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {completedAssessments.map((assessment) => (
            <StyledTableRow key={assessment.id}>
              <TableCell>{assessment.name}</TableCell>
              <TableCell>{assessment.dateTaken}</TableCell>
              <TableCell>{assessment.score}</TableCell>
              <TableCell>
                {assessment.score < 50 ? (
                  <a href={`/retake-assessment/${assessment.id}`} style={{ color: 'black', textDecoration: 'underline' }}>
                    Yes
                  </a>
                ) : (
                  <span style={{ color: 'grey', cursor: 'not-allowed' }}>No</span>
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default CompletedAssessmentTable;
