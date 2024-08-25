import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import QuestionCard from '../../components/Trainee/AssessmentDisplay/QuestionCard';

interface Question {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface Assessment {
  assessmentName: string;
  questions: Question[];
}

const AssessmentDisplayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL params
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (id) {
        try {
          const response = await axios.get<Assessment>(`http://localhost:8080/api/v1/assessments/${id}`);
          setAssessment(response.data);
        } catch (err) {
          setError('Failed to fetch assessment data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAssessment();
  }, [id]);

  const handleNextQuestion = () => {
    if (assessment && currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponseChange = (response: string) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = response;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/assessments/submit', {
        assessmentId: id,
        responses
      });
      console.log('Assessment submitted successfully');
    } catch (err) {
      console.error('Failed to submit assessment');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 2 }}>
      {assessment && (
        <>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '1.2rem', mb: 2 }}>
            {assessment.assessmentName}
          </Typography>
          <QuestionCard
            questionText={assessment.questions[currentQuestionIndex].question}
            options={{
              optionA: assessment.questions[currentQuestionIndex].optionA,
              optionB: assessment.questions[currentQuestionIndex].optionB,
              optionC: assessment.questions[currentQuestionIndex].optionC,
              optionD: assessment.questions[currentQuestionIndex].optionD,
            }}
            selectedOption={responses[currentQuestionIndex]}
            onResponseChange={handleResponseChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#917fb3', color: '#fff', fontSize: '0.75rem', px: 2 }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex === assessment.questions.length - 1 ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#917fb3', color: '#fff', fontSize: '0.75rem', px: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#917fb3', color: '#fff', fontSize: '0.75rem', px: 2 }}
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default AssessmentDisplayPage;
