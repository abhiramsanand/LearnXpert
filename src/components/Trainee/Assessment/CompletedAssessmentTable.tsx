import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Assessment {
  id: number;
  name: string;
  dateTaken: string;
  score: number;
}

const CustomTableContainer = styled(Box)({
  maxHeight: 200, // Reduced height
  overflowY: 'auto',
  width: '100%', // Ensure it takes full width of container
  marginBottom: '20px', // Add spacing below the table
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
});

const StyledTableHead = styled(TableHead)({
  '& th': {
    fontSize: '0.9rem',
    padding: '8px',
    borderBottom: '2px solid #D1B2FF', // Underline for table headings
  },
});

const StyledTableRow = styled(TableRow)({
  '& td': {
    border: 'none', // Remove borders from table cells
    fontSize: '0.8rem',
    padding: '8px',
  },
});

const CompletedAssessmentTable: React.FC = () => {
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetch('/CompletedAssessment.json') // Adjust path if necessary
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCompletedAssessments(data.completedAssessments)) // Access nested array
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
                {assessment.score < 50 ? 'Yes' : 'No'} {/* Display Yes or No based on score */}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default CompletedAssessmentTable;
