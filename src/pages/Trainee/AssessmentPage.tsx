import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CompletedAssessmentTable from '../../components/Trainee/Assessment/CompletedAssessmentTable';
import PendingAssessmentTable from '../../components/Trainee/Assessment/PendingAssessmentTable';
import TraineeHeader from '../../shared components/TraineeHeader';
import Footer from '../../shared components/Footer';

const AssessmentsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TraineeHeader title={'Assessment'} />
      <main style={{ flex: 1, overflowY: 'auto', paddingTop: '5px', paddingBottom: '50px' }}>
        <Container maxWidth="lg">
          <Box mt={1} mb={2}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.3rem' } }}>
              Completed Assessments
            </Typography>
            <CompletedAssessmentTable />
          </Box>
          <Box mt={2} mb={4}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.3rem' } }}>
              Pending Assessments
            </Typography>
            <PendingAssessmentTable />
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default AssessmentsPage;
