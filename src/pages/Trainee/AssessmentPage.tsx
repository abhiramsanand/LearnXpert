import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import CompletedAssessmentTable from '../../components/Trainee/Assessment/CompletedAssessmentTable';
import PendingAssessmentTable from '../../components/Trainee/Assessment/PendingAssessmentTable';
import TraineeHeader from '../../constants/TraineeHeader';
import Footer from '../../constants/Footer';


const AssessmentsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       <TraineeHeader title={'Assessment'} />
      <main style={{ flex: 1, overflowY: 'auto',paddingTop: '20px', paddingBottom: '50px' }}>
        <Container>
          <Box mt={1} mb={2}> {/* Adjusted margin bottom */}
            <Typography variant="h5" gutterBottom sx={{ fontSize: '1.2rem' }}>
              Completed Assessments
            </Typography>
            <CompletedAssessmentTable />
          </Box>
          <Box mt={2} mb={4}> {/* Adjusted margin top and bottom */}
            <Typography variant="h5" gutterBottom sx={{ fontSize: '1.2rem' }}>
              Pending Assessments
            </Typography>
            <PendingAssessmentTable />
          </Box>
        </Container>
      </main>
      <Footer/>
      
    
    </div>
  );
};

export default AssessmentsPage;