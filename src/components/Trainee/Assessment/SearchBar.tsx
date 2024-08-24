import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          height: 40, // Adjust height if needed
          padding: '8px 14px',
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          paddingRight: '8px', // Adjust padding to prevent the text from getting clipped
        },
      }}
    />
  );
};

export default SearchBar;
