import React from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortByProps {
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const SortBy: React.FC<SortByProps> = ({ onSortChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value as 'asc' | 'desc');
  };

  return (
    <Select
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Sort by' }}
      sx={{ minWidth: 120 }}
    >
      <MenuItem value="asc">Sort Ascending</MenuItem>
      <MenuItem value="desc">Sort Descending</MenuItem>
    </Select>
  );
};

export default SortBy;
