import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

interface AssessmentsTableProps {
  batchId: number;
}

interface Student {
  name: string;
  status: string;
  marks: number;
}

interface Assessment {
  assessmentName: string;
  status: string;
  studentsAttended: {
    count: number;
    students: Student[];
  };
}

interface Batch {
  batchId: number;
  status: string;
  assessments: Assessment[];
}

const AssessmentsTable: React.FC<AssessmentsTableProps> = ({ batchId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetch('/AssessmentList.json')
      .then((response) => response.json())
      .then((data) => {
        const batch = data.batches.find((b: Batch) => b.batchId === batchId);
        if (batch) {
          setAssessments(batch.assessments);
        }
      })
      .catch((error) => {
        console.error('Error fetching assessments data:', error);
      });
  }, [batchId]);

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Assessment Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Trainees Attended</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assessments.map((assessment, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell> {/* Index column */}
              <TableCell>{assessment.assessmentName}</TableCell>
              <TableCell>{assessment.status}</TableCell>
              <TableCell>{assessment.studentsAttended.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AssessmentsTable;
