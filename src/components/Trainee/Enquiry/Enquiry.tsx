import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

interface Enquiry {
  enquiry: string;
  date: string;
  response: string;
}

// Header and Footer components
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
  zIndex: 1100, // Ensures the header is above other content
});

const Footer = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '16px',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: 1100, // Ensures the footer is above other content
});

const Content = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  marginTop: '80px', // Adjust based on the height of the header
  marginBottom: '60px', // Adjust based on the height of the footer
  overflow: 'hidden', // Prevent scrolling for the main content
});

const FormContainer = styled(Box)({
  marginBottom: '20px', // Space between the form and the table
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  gap: '10px',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8518FF', // Border color for the text area
    },
    '&:hover fieldset': {
      borderColor: '#8518FF', // Border color when hovered
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8518FF', // Border color when focused
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#8518FF',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#A54BFF',
  },
});

const TableWrapper = styled(Box)({
  marginTop: '20px',
});

const TableHeading = styled(Typography)({
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
  borderBottom: '2px solid #8518FF', // Horizontal line below heading
  paddingBottom: '5px',
  color: '#8518FF',
});

const TableContainerStyled = styled(TableContainer)({
  backgroundColor: '#EDE9FF', // Light shade of #8518FF
  borderRadius: '8px',
  padding: '10px',
  position: 'relative',
  overflowY: 'auto', // Enable vertical scrolling within the table container
  maxHeight: '400px', // Set a maximum height for the table container
});

const TableHeadStyled = styled(TableHead)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#8518FF', // Background color to make the header visible
  color: '#fff', // Text color for the header
  zIndex: 1100, // Ensure the header is above the table content
});

const TableRowStyled = styled(TableRow)(({ isEven }: { isEven: boolean }) => ({
  backgroundColor: isEven ? '#FFFFFF' : '#F5F5F5', // Alternating row colors
}));

const TableCellStyled = styled(TableCell)({
  padding: '10px 20px',
  textAlign: 'left', // Ensure left alignment
  fontSize: '16px',
  color: '#333',
});

const EnquiryPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryText, setEnquiryText] = useState<string>('');

  useEffect(() => {
    // Fetch the JSON data from the public directory
    fetch('./enquiry.json')
      .then((response) => response.json())
      .then((data) => setEnquiries(data.enquiries))
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, []);

  const handleSubmit = () => {
    if (enquiryText.trim() === '') {
      alert('Please enter an enquiry.');
      return;
    }

    const newEnquiry: Enquiry = {
      enquiry: enquiryText,
      date: new Date().toISOString().split('T')[0],
      response: 'Response pending...',
    };

    setEnquiries([...enquiries, newEnquiry]);
    setEnquiryText('');
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header>Enquiry Page</Header>
      <Content>
        <Container>
          <FormContainer>
            <StyledTextField
              label="Enter your enquiry"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={enquiryText}
              onChange={(e) => setEnquiryText(e.target.value)}
            />
            <StyledButton
              variant="contained"
              size="small" // Make the button smaller
              onClick={handleSubmit}
            >
              Submit
            </StyledButton>
          </FormContainer>

          <TableHeading>Recent Enquiries</TableHeading>
          <TableWrapper>
            <TableContainerStyled component={Paper}>
              <Table>
                <TableHeadStyled>
                  <TableRow >
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>
                        Enquiry
                      </Typography>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>
                        Date
                      </Typography>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff' }}>
                        Response
                      </Typography>
                    </TableCellStyled>
                  </TableRow>
                </TableHeadStyled>
                <TableBody>
                  {enquiries.map((enquiry, index) => (
                    <TableRowStyled key={index} isEven={index % 2 === 0}>
                      <TableCellStyled>{enquiry.enquiry}</TableCellStyled>
                      <TableCellStyled>{enquiry.date}</TableCellStyled>
                      <TableCellStyled>{enquiry.response}</TableCellStyled>
                    </TableRowStyled>
                  ))}
                </TableBody>
              </Table>
            </TableContainerStyled>
          </TableWrapper>
        </Container>
      </Content>
      <Footer>© 2024 Your Company Name</Footer>
    </Box>
  );
};

export default EnquiryPage;
