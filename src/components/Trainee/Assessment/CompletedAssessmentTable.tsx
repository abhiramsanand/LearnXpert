import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Assessment {
  id: number;
  name: string;
  dateTaken: string;
  score: number;
}

const CompletedAssessmentTable: React.FC = () => {
  const [completedAssessments, setCompletedAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetch('/CompletedAssessment.json') // Corrected path
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assessment Name</TableCell>
            <TableCell>Date Taken</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Retake</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedAssessments.map((assessment) => (
            <TableRow key={assessment.id}>
              <TableCell>{assessment.name}</TableCell>
              <TableCell>{assessment.dateTaken}</TableCell>
              <TableCell>{assessment.score}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Retake
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompletedAssessmentTable;
