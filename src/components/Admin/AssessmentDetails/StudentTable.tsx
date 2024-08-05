import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Student {
  name: string;
  status: string;
  marks: number;
}

interface StudentTableProps {
  students: Student[];
  getStatusStyle: (status: string) => React.CSSProperties;
}

const StudentTable: React.FC<StudentTableProps> = ({ students, getStatusStyle }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Marks Scored</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.name}>
              <TableCell>{student.name}</TableCell>
              <TableCell style={getStatusStyle(student.status)}>{student.status}</TableCell>
              <TableCell>{student.marks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
