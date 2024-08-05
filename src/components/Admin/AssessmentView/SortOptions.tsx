import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortOptionsProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl
      sx={{ 
        marginTop: 4,
        minWidth: 160,  // Adjusted width
        marginBottom: 2 
      }}
    >
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        value={currentSort}
        onChange={handleChange}
        label="Sort By"
        sx={{
          width: 200,  // Set desired width
          height: 36,  // Set height to be smaller
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptions;
