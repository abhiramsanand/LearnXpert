import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';


interface TraineeAssessment {
  traineeName: string;
  traineeScore: number;
  traineeStatus: string;
  assessmentName: string;
}

const TraineeAssessmentDetails: React.FC = () => {
  const { assessmentName } = useParams<{ assessmentName: string }>();
  const [traineeAssessments, setTraineeAssessments] = useState<TraineeAssessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTraineeAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/ilpex/trainee-assessments');
        const filteredData = response.data.data.filter(
          (assessment: TraineeAssessment) => assessment.assessmentName === assessmentName
        );
        setTraineeAssessments(filteredData);
      } catch (error) {
        console.error('Error fetching trainee assessments data:', error);
        setError('Failed to fetch trainee assessments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTraineeAssessments();
  }, [assessmentName]);

  if (loading) {
    return <Typography>Loading trainee assessments...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Trainee Assessments for {assessmentName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trainee Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traineeAssessments.map((trainee, index) => (
              <TableRow key={index}>
                <TableCell>{trainee.traineeName}</TableCell>
                <TableCell>{trainee.traineeScore}</TableCell>
                <TableCell>{trainee.traineeStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TraineeAssessmentDetails;
