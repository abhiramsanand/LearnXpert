import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortByProps {
  onSortChange: (value: string) => void;
}

const SortByComponent: React.FC<SortByProps> = ({ onSortChange }) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth sx={{minWidth: "120px"}}>
      <InputLabel id="sort-by-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-label"
        onChange={handleSortChange}
        label="Sort By"
        defaultValue="day" // Set default value to "day"
      >
        <MenuItem value="day">Day</MenuItem>
        <MenuItem value="course">Course</MenuItem>
        <MenuItem value="timeTaken">Time Taken</MenuItem>
        <MenuItem value="status">Status</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortByComponent;
