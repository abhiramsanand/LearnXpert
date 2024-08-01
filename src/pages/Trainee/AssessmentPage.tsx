// src/pages/AssessmentsPage.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from '../../components/Trainee/Assessment/Navbar';
import CompletedAssessmentTable from '../../components/Trainee/Assessment/CompletedAssessmentTable';
import PendingAssessmentTable from '../../components/Trainee/Assessment/PendingAssessmentTable';
import Footer from '../../components/Trainee/Assessment/Footer';

const AssessmentPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Completed Assessments
          </Typography>
          <CompletedAssessmentTable />
        </Box>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Pending Assessments
          </Typography>
          <PendingAssessmentTable />
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default AssessmentPage;
