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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

interface Assessment {
  assessmentName: string;
}

interface TraineeAssessment {
  traineeName: string;
  traineeScore: number;
  traineeStatus: string;
  assessmentName: string;
}

const AssessmentDetails: React.FC<{ batchId: number }> = ({ batchId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [traineeAssessments, setTraineeAssessments] = useState<TraineeAssessment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>('');

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/ilpex/assessments/details?batchId=15`);
        const fetchedAssessments = response.data.data;
        setAssessments(fetchedAssessments);

        // Automatically select the latest assessment
        if (fetchedAssessments.length > 0) {
          const latestAssessmentName = fetchedAssessments[0].assessmentName;
          setSelectedAssessment(latestAssessmentName);
          fetchTraineeAssessments(latestAssessmentName);
        }
      } catch (error) {
        console.error('Error fetching assessments data:', error);
        setError('Failed to fetch assessments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [batchId]);

  const fetchTraineeAssessments = async (assessmentName: string) => {
    setLoading(true); // Set loading to true only when fetching new trainee assessments
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

  const handleAssessmentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const assessmentName = event.target.value as string;
    setSelectedAssessment(assessmentName);
    setError(null);
    fetchTraineeAssessments(assessmentName);
  };

  return (
    <Box sx={{ mt: "-20px" }}>
      {error && <Typography sx={{ color: 'error.main', mb: 2 }}>{error}</Typography>}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControl size="small" sx={{ width: '200px' }}>
          <InputLabel>Select Assessment</InputLabel>
          <Select
            value={selectedAssessment}
            onChange={handleAssessmentChange}
          >
            {assessments.map((assessment, index) => (
              <MenuItem key={index} value={assessment.assessmentName}>
                {assessment.assessmentName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Typography
            sx={{
              fontSize: "30px",
              color: "#8061C3",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              animation: "flip 1s infinite",
              "@keyframes flip": {
                "0%": { transform: "rotateX(0)" },
                "50%": { transform: "rotateX(180deg)" },
                "100%": { transform: "rotateX(360deg)" },
              },
            }}
          >
            ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Trainee Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
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
      )}
    </Box>
  );
};

export default AssessmentDetails;
