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
  position: 'fixed', // Changed to fixed
  bottom: 0,
  width: '100%',
  zIndex: 1100, // Ensures the footer is above other content
});

const Content = styled(Box)({
  flexGrow: 1,
  padding: '20px',
  marginTop: '80px', // Adjust based on the height of the header
  marginBottom: '60px', // Adjust based on the height of the footer
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto', // Enable vertical scrolling
  height: 'calc(100vh - 140px)', // Adjust height to ensure it fits in viewport with space for header and footer
});

const FormContainer = styled(Box)({
  marginBottom: '20px', // Space between the form and the table
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center horizontally
  gap: '8px', // Reduce gap between form elements
  maxWidth: '500px', // Limit the maximum width of the form container
  margin: '0 auto', // Center the form container horizontally
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
  marginBottom: '8px', // Space below the text field
});

const StyledButton = styled(Button)({
  backgroundColor: '#8518FF',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#A54BFF',
  },
  padding: '8px 16px', // Reduce button padding
  borderRadius: '5px', // Rounded corners for the button
});

const TableWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto', // Enable vertical scrolling
  maxHeight: '500px', // Set a fixed height for the table wrapper
});
const TableHeading = styled(Typography)({
  fontSize: '16px', // Reduce font size for the table heading
  fontWeight: 'bold',
  marginBottom: '10px', // Increase margin-bottom
  borderBottom: '2px solid #8518FF', // Horizontal line below heading
  paddingBottom: '5px',
  color: '#8518FF',
});

const TableContainerStyled = styled(TableContainer)({
  backgroundColor: '#EDE9FF', // Light shade of #8518FF
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px', // Reduced margin-bottom
  marginRight: '40%', // Reduced margin-right
  maxHeight: '100%', // Allow it to take the full height of its parent
  overflowY: 'auto', // Enable vertical scrolling within the table container
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Add a subtle shadow
  height: '100%', // Set the height to 100% to enable scrolling
  
});

const TableHeadStyled = styled(TableHead)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#CBC3E3', // Background color to make the header visible
  color: '#fff', // Text color for the header
  fontSize: '12px', // Reduce font size for the header
  zIndex: 1100, // Ensure the header is above the table content
});

const TableRowStyled = styled(TableRow)(({ isEven }: { isEven: boolean }) => ({
  backgroundColor: isEven ? '#FFFFFF' : '#F5F5F5', // Alternating row colors
  fontSize: '12px', // Reduce font size for rows
  '&:hover': {
    backgroundColor: '#DADADA', // Highlight row on hover
  },
}));

const TableCellStyled = styled(TableCell)({
  padding: '6px 12px', // Reduce padding for cells
  textAlign: 'left', // Ensure left alignment
  fontSize: '12px',
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
              rows={3} // Reduce rows for a more compact text field
              variant="outlined"
              fullWidth
              value={enquiryText}
              onChange={(e) => setEnquiryText(e.target.value)}
            />
            <StyledButton
              variant="contained"
              size="medium" // Adjust button size
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
                  <TableRow>
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                        Enquiry
                      </Typography>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                        Date
                      </Typography>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Typography variant="h6" style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>
                        Response
                      </Typography>
                    </TableCellStyled>
                  </TableRow>
                </TableHeadStyled>
                <TableBody>
                  {enquiries.map((enquiry, index) => (
                    <TableRowStyled key={index} isEven={index % 2 === 0}>
                      <TableCellStyled>
                        {enquiry.enquiry}
                      </TableCellStyled>
                      <TableCellStyled>
                        {enquiry.date}
                      </TableCellStyled>
                      <TableCellStyled>
                        {enquiry.response}
                      </TableCellStyled>
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
