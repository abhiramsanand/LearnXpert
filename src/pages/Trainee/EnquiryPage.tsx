// src/pages/EnquiryPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import EnquiryForm from '../../components/Trainee/Enquiry/EnquiryForm';
import EnquiryTable from '../../components/Trainee/Enquiry/EnquiryTable';
import TraineeHeader from '../../constants/TraineeHeader';



const Content = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  marginTop: '3%',
  marginBottom: '60px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 140px)',
  overflow: 'auto',
});

const EnquiryPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    // Fetch the JSON data from the public directory
    fetch('./enquiry.json')
      .then((response) => response.json())
      .then((data) => setEnquiries(data.enquiries))
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, []);

  const handleAddEnquiry = (enquiryText: string) => {
    const newEnquiry: Enquiry = {
      enquiry: enquiryText,
      date: new Date().toISOString().split('T')[0],
    };

    setEnquiries([...enquiries, newEnquiry]);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TraineeHeader title={'Enquiry'}/>
      <Content>
        <Container>
          <EnquiryForm onAddEnquiry={handleAddEnquiry} />
          <EnquiryTable enquiries={enquiries} />
        </Container>
      </Content>
     
    </Box>
  );
};

export default EnquiryPage;
