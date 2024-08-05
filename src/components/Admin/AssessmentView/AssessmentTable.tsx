import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import SortOptions from './SortOptions'; // Adjust the import path as needed

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div></div> {/* Empty div for alignment */}
        <SortOptions currentSort={sortOption} onSortChange={onSortChange} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assessment Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Students Attended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssessments.map((assessment) => (
              <TableRow key={assessment.assessmentName}>
                <TableCell>
                  <Typography
                    component={Link}
                    to={`/assignment/${assessment.assessmentName}`}
                    style={{ textDecoration: 'none', color: 'inherit' }} // Normal link color
                  >
                    {assessment.assessmentName}
                  </Typography>
                </TableCell>
                <TableCell style={{ color: getStatusColor(assessment.status) }}>
                  {assessment.status}
                </TableCell>
                <TableCell>{assessment.studentsAttended.count}</TableCell>
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
    case 'Completed':
      return 'green'; // Color for Completed
    case 'In Progress':
      return 'blue';  // Color for In Progress
    case 'Scheduled':
      return 'Red';  // Color for Scheduled
    default:
      return 'black'; // Default color
  }
};

export default AssessmentTable;
