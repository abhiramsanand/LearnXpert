import React from 'react';
import AssignmentDetails from '../../components/Admin/AssessmentDetails/AssessmentDetails';
import { Container } from '@mui/material';

const AdminAssessmentDetailsPage = () => {
  return (
    <Container sx={{mt: 6}}>
      <AssignmentDetails />
    </Container>
  );
};

export default AdminAssessmentDetailsPage;
