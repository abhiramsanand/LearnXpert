import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

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
            <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder' }}>
              #
            </TableCell>
            <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder' }}>
              Student Name
            </TableCell>
            <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder' }}>
              Status
            </TableCell>
            <TableCell style={{ backgroundColor: 'rgba(128, 97, 195, 0.1)', color: 'black', fontWeight: 'bolder' }}>
              Marks Scored
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student.name}>
              <TableCell style={{ fontSize: '12px' }}>{index + 1}</TableCell> {/* Serial number */}
              <TableCell style={{ fontSize: '12px' }}>
                <Typography variant="body2">
                  {student.name}
                </Typography>
              </TableCell>
              <TableCell style={{ ...getStatusStyle(student.status), fontSize: '12px' }}>
                {student.status}
              </TableCell>
              <TableCell style={{ fontSize: '12px' }}>
                {student.marks}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
