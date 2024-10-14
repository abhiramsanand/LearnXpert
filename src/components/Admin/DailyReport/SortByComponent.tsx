import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Report } from '../../../shared components/Types'; // Importing the Report type

interface SortByProps {
  onSortChange: (value: keyof Report) => void; // Use keyof Report
}

const SortByComponent: React.FC<SortByProps> = ({ onSortChange }) => {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value as keyof Report); // Cast value to keyof Report
  };

  return (
    <FormControl variant="outlined" fullWidth sx={{ minWidth: "120px" }}>
      <InputLabel id="sort-by-label">Sort By</InputLabel>
      <Select
        labelId="sort-by-label"
        onChange={handleSortChange}
        label="Sort By"
        defaultValue="day"
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
