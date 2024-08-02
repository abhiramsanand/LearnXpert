// src/pages/EnquiryPage.tsx

import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import EnquiryForm from '../../components/Trainee/Enquiry/EnquiryForm';
import EnquiryTable from '../../components/Trainee/Enquiry/EnquiryTable';

const Header = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1100,
});

const Footer = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '16px',
  bottom: 0,
  width: '100%',
  zIndex: 1100,
});

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
      <Header>Enquiry Page</Header>
      <Content>
        <Container>
          <EnquiryForm onAddEnquiry={handleAddEnquiry} />
          <EnquiryTable enquiries={enquiries} />
        </Container>
      </Content>
      <Footer>© 2024 Your Company Name</Footer>
    </Box>
  );
};

export default EnquiryPage;
