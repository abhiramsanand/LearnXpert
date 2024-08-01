// src/components/PendingAssessmentsTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Assessment {
  id: number;
  name: string;
  dateToBeTaken: string;
}

const pendingAssessments: Assessment[] = [
  { id: 1, name: 'Assessment 3', dateToBeTaken: '2024-08-01' },
  { id: 2, name: 'Assessment 4', dateToBeTaken: '2024-08-10' },
  // Add more pending assessments
];

const PendingAssessmentTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell>Date to be Taken</TableCell>
            <TableCell>Take</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendingAssessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell>{assessment.name}</TableCell>
              <TableCell>{assessment.dateToBeTaken}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Take
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingAssessmentTable;
