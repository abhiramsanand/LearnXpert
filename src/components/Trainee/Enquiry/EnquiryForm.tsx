import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  maxWidth: '500px',
  margin: '0 auto',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8518FF',
    },
    '&:hover fieldset': {
      borderColor: '#8518FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8518FF',
    },
  },
  marginBottom: '8px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#8518FF',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#A54BFF',
  },
  padding: '8px 16px',
  borderRadius: '5px',
});

interface EnquiryFormProps {
  onAddEnquiry: (enquiry: string) => void;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ onAddEnquiry }) => {
  const [enquiryText, setEnquiryText] = useState<string>('');

  const handleSubmit = () => {
    if (enquiryText.trim() === '') {
      alert('Please enter an enquiry.');
      return;
    }

    onAddEnquiry(enquiryText);
    setEnquiryText('');
  };

  return (
    <FormContainer>
      <StyledTextField
        label="Enter your enquiry"
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        value={enquiryText}
        onChange={(e) => setEnquiryText(e.target.value)}
      />
      <StyledButton
        variant="contained"
        size="medium"
        onClick={handleSubmit}
      >
        Submit
      </StyledButton>
    </FormContainer>
  );
};

export default EnquiryForm;
