import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import QuestionCard from '../../components/Trainee/AssessmentDisplay/QuestionCard';
import { styled } from '@mui/system';

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
  traineeId: number;
}

const StyledContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '16px',
});

const StyledTypography = styled(Typography)({
  fontSize: '1.2rem',
  marginBottom: '16px',
});

const StyledQuestionBox = styled(Box)({
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '16px',
  padding: '16px',
  backgroundColor: '#f5f5f5',
});

const StyledButton = styled(Button)({
  backgroundColor: '#917fb3',
  color: '#fff',
  fontSize: '0.75rem',
  padding: '8px 16px',
  margin: '0 4px',
});

const AssessmentDisplayPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const assessmentName = queryParams.get('name') || '';

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<{ [questionId: number]: string }>({});
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

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

  const handleResponseChange = (questionId: number, responseContent: string) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: responseContent,
    }));
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

    const Id = localStorage.getItem('traineeId');
    const data = {
      assessmentName: assessment.assessmentName,
      traineeId: Id,
      questionResponses: validResponses,
    };

    setSubmitting(true); // Start loading animation

    try {
      await axios.post('http://localhost:8080/api/v1/assessments/submit', data);
      setSuccessDialogOpen(true); // Open the success dialog on successful submission
    } catch (err) {
      console.error('Failed to submit assessment:', err);
      setError('Failed to submit assessment.');
    } finally {
      setSubmitting(false); // Stop loading animation
    }
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
    navigate('/Trainee-Assessments'); // Redirect after closing the dialog
  };

  if (loading || submitting) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
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
    );
  }

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <StyledContainer maxWidth="md">
      {assessment && (
        <>
          <StyledTypography variant="h4" gutterBottom>
            {assessment.assessmentName}
          </StyledTypography>

          <StyledQuestionBox>
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
          </StyledQuestionBox>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <StyledButton
              variant="contained"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </StyledButton>
            {currentQuestionIndex === assessment.questions.length - 1 ? (
              <StyledButton
                variant="contained"
                onClick={handleSubmit}
              >
                Submit
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                onClick={handleNextQuestion}
              >
                Next
              </StyledButton>
            )}
          </Box>
        </>
      )}

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography>Your assessment has been submitted successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default AssessmentDisplayPage;
