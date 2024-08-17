import React, { useState } from 'react';
import { TextField } from '@mui/material';

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
      label="Search Assessments"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
