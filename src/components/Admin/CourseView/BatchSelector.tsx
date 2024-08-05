import React from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledFormControl = styled(FormControl)({
  marginBottom: '16px', // Adjust margin as needed
});

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#F3E8FF', // Light purple background for the select input
  '& .MuiSelect-icon': {
    color: '#8518FF', // Color of the dropdown icon
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8518FF', // Border color of the select input
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8518FF', // Border color on hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#8518FF', // Border color when focused
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: '#8518FF', // Color of the input label
}));

interface BatchSelectorProps {
  batches: string[];
  selectedBatch: string;
  onBatchChange: (batch: string) => void;
}

const BatchSelector: React.FC<BatchSelectorProps> = ({ batches, selectedBatch, onBatchChange }) => {
  return (
    <StyledFormControl fullWidth>
      <StyledInputLabel>Select Batch</StyledInputLabel>
      <StyledSelect
        value={selectedBatch}
        onChange={(e) => onBatchChange(e.target.value as string)}
        label="Select Batch"
        variant="outlined" // Ensure the select component is outlined
      >
        {batches.map(batch => (
          <MenuItem key={batch} value={batch}>
            {batch}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default BatchSelector;
