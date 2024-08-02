import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

interface ReportTableProps {
  reportData: Array<{
    course: string;
    timeTaken: string;
    keyLearnings: string;
    planForTomorrow: string;
  }>;
}

const ReportTable: React.FC<ReportTableProps> = ({ reportData }) => {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#E6E6FA' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Time Taken</TableCell>
            <TableCell>Key Learnings</TableCell>
            <TableCell>Plan For Tomorrow</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.course}</TableCell>
              <TableCell>{row.timeTaken}</TableCell>
              <TableCell>{row.keyLearnings}</TableCell>
              <TableCell>{row.planForTomorrow}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportTable;
