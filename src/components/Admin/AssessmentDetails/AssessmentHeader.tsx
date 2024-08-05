// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
  assessmentName: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ assessmentName, searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
      <IconButton
        onClick={() => navigate('/Admin-ViewAssessment')}
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '50%',
          padding: 8,
          marginRight: 16,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <h1 style={{ flexGrow: 1 }}>{assessmentName}</h1>
      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginLeft: 'auto' }}
      />
    </div>
  );
};

export default Header;
