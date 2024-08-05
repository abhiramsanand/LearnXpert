// AssessmentTable.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import SortOptions from './SortOptions';
import AddAssessmentButton from './AddAssessmentButton'; // Import the AddAssessmentButton component

interface StudentAttended {
  name: string;
  status: string;
  marks: number;
}

interface Assessment {
  assessmentName: string;
  status: string;
  studentsAttended: {
    count: number;
    students: StudentAttended[];
  };
}

interface AssessmentTableProps {
  assessments: Assessment[];
  sortOption: string;
  onSortChange: (sort: string) => void;
}

const AssessmentTable: React.FC<AssessmentTableProps> = ({ assessments, sortOption, onSortChange }) => {
  const filteredAssessments = sortOption === 'all'
    ? assessments
    : assessments.filter(assessment => assessment.status.toLowerCase() === sortOption);

  return (
    <div style={{ position: 'relative' }}> {/* Add relative positioning for the button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SortOptions currentSort={sortOption} onSortChange={onSortChange} />
          <AddAssessmentButton /> 
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#F3E8FF', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>#</TableCell>
              <TableCell style={{ backgroundColor: '#F3E8FF', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>Assessment Name</TableCell>
              <TableCell style={{ backgroundColor: '#F3E8FF', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>Status</TableCell>
              <TableCell style={{ backgroundColor: '#F3E8FF', color: 'black', fontWeight: 'bolder', fontSize: '14px' }}>Students Attended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssessments.map((assessment, index) => (
              <TableRow key={assessment.assessmentName}>
                <TableCell style={{ fontSize: '12px' }}>{index + 1}</TableCell> {/* Serial number */}
                <TableCell style={{ fontSize: '12px' }}>
                  <Typography
                    component={Link}
                    to={`/assignment/${assessment.assessmentName}`}
                    style={{ textDecoration: 'none', color: 'inherit', fontSize: '12px' }} // Apply fontSize to Typography
                  >
                    {assessment.assessmentName}
                  </Typography>
                </TableCell>
                <TableCell style={{ color: getStatusColor(assessment.status), fontSize: '12px' }}>
                  {assessment.status}
                </TableCell>
                <TableCell style={{ fontSize: '12px' }}>{assessment.studentsAttended.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'green'; // Color for Active
    case 'Inactive':
      return 'red';  // Color for Inactive
    default:
      return 'black'; // Default color
  }
};

export default AssessmentTable;
