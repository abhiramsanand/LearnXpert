import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      label="Search by course"
      onChange={handleChange}
      sx={{ marginRight: '16px' }}
    />
  );
};

export default SearchBar;
