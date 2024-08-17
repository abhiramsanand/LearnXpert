import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

interface AssessmentHeaderProps {
  assessmentName: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({ assessmentName, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
      <IconButton
        onClick={() => navigate('/Admin-Assessments')}
        style={{
          backgroundColor: 'rgba(128, 97, 195, 0.2)', // Light background color for the button
          borderRadius: '50%',
          padding: 8,
          marginRight: 16,
        }}
      >
        <ArrowBackIcon style={{ color: 'rgba(128, 97, 195)' }} /> {/* Dark color for the arrow */}
      </IconButton>
      <h3 style={{ flexGrow: 1 }}>{assessmentName}</h3>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon style={{ color: 'rgba(128, 97, 195)' }} /> {/* Customize color of the search icon */}
            </InputAdornment>
          ),
          sx: {
            '& .MuiInputBase-input': {
              backgroundColor: 'rgba(128, 97, 195, 0.1)', // Set background color for the input box
            },
          },
        }}
        style={{ marginLeft: 'auto' }}
      />
    </div>
  );
};

export default AssessmentHeader;
