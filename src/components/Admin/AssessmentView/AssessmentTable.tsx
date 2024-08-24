import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'; // Import Typography
import axios from 'axios';

interface AssessmentsTableProps {
  batchId: number;
}

interface Assessment {
  assessmentName: string;
  assessmentStatus: string;
  traineeCount: number;
}

const AssessmentsTable: React.FC<AssessmentsTableProps> = ({ batchId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/ilpex/assessments/details?batchId=${batchId}`);
        setAssessments(response.data.data);
      } catch (error) {
        console.error('Error fetching assessments data:', error);
        setError('Failed to fetch assessments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [batchId]);

  if (loading) {
    return <Typography>Loading assessments...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
              <TableCell>{index + 1}</TableCell>
              <TableCell>{assessment.assessmentName}</TableCell>
              <TableCell>{assessment.assessmentStatus}</TableCell>
              <TableCell>{assessment.traineeCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AssessmentsTable;
