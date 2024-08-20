import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import QuestionCard from '../../components/Trainee/AssessmentDisplay/QuestionCard';
QuestionCard// Adjust the import path as necessary

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
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const assessmentId = 1; // Replace with the actual ID or use route params

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get<Assessment>(`http://localhost:8080/api/v1/assessments/${assessmentId}`);
        setAssessment(response.data);
      } catch (err) {
        setError('Failed to fetch assessment data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      {assessment && (
        <>
          <Typography variant="h4" gutterBottom>
            {assessment.assessmentName}
          </Typography>
          {assessment.questions.map((question, index) => (
            <QuestionCard
              key={index}
              questionText={question.question}
              options={{
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD
              }}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default AssessmentDisplayPage;
