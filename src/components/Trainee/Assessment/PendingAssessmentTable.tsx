import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Assessment {
  id: number;
  name: string;
  dateToBeTaken: string;
}

const CustomTableContainer = styled(Box)({
  flex: '1',
  overflowY: 'auto', // Allow scrolling if content overflows
  paddingRight: '5px',
  marginRight: '10px',
  borderRight: '1px solid #ddd',
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
  '@media (max-width: 900px)': {
    marginRight: '0',
    borderRight: 'none',
    borderBottom: '1px solid #D1B2FF',
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
    <CustomTableContainer component={Paper} style={{ maxHeight: 130 }}>
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
                <Button variant="contained" color="primary" size="small">
                  Take
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
};

export default PendingAssessmentTable;
