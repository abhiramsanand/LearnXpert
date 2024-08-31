import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';
import QuestionCard from '../../components/Trainee/AssessmentDisplay/QuestionCard';

interface Question {
  questionId: number;
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assessmentName = queryParams.get('name') || '';

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<{ [questionId: number]: string }>({});

  useEffect(() => {
    const fetchAssessment = async () => {
      if (assessmentName) {
        try {
          const response = await axios.get<Assessment>(`http://localhost:8080/api/v1/assessments/name/${assessmentName}`);
          setAssessment(response.data);
        } catch (err) {
          setError('Failed to fetch assessment data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAssessment();
  }, [assessmentName]);

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

  // This function now accepts the actual option content instead of just the option identifier
  const handleResponseChange = (questionId: number, responseContent: string) => {
    setResponses(prevResponses => {
      const updatedResponses = {
        ...prevResponses,
        [questionId]: responseContent, // Store the content of the selected option
      };
      console.log('Updated Responses:', updatedResponses); // Debugging
      return updatedResponses;
    });
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    const validResponses: { [key: number]: string } = {};
    assessment.questions.forEach(question => {
      const response = responses[question.questionId];
      if (response) {
        validResponses[question.questionId] = response;
      }
    });

    if (Object.keys(validResponses).length === 0) {
      setError('Please provide responses to all questions.');
      return;
    }

    const data = {
      assessmentName: assessment.assessmentName,
      traineeId: 1416,
      questionResponses: validResponses,
    };

    console.log('Data to Submit:', data); // Debugging

    try {
      await axios.post('http://localhost:8080/api/v1/assessments/submit', data);
      console.log('Assessment submitted successfully');
    } catch (err) {
      console.error('Failed to submit assessment:', err);
      setError('Failed to submit assessment.');
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
  questionId={assessment.questions[currentQuestionIndex].questionId}
  questionText={assessment.questions[currentQuestionIndex].question}
  options={{
    optionA: assessment.questions[currentQuestionIndex].optionA,
    optionB: assessment.questions[currentQuestionIndex].optionB,
    optionC: assessment.questions[currentQuestionIndex].optionC,
    optionD: assessment.questions[currentQuestionIndex].optionD,
  }}
  selectedOption={
    Object.entries(assessment.questions[currentQuestionIndex]).find(
      ([key, value]) => value === responses[assessment.questions[currentQuestionIndex].questionId]
    )?.[0] || ''
  }
  onResponseChange={(questionId, selectedOptionKey) => {
    const optionContent = assessment.questions[currentQuestionIndex][selectedOptionKey as keyof typeof assessment.questions[currentQuestionIndex]];
    handleResponseChange(questionId, optionContent);
  }}
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
