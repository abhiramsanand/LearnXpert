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
    <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        value={currentSort}
        onChange={handleChange}
        label="Sort By"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="in-progress">In Progress</MenuItem>
        <MenuItem value="scheduled">Scheduled</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortOptions;
