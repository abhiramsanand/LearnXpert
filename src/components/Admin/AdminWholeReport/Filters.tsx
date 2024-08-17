import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FiltersProps {
  names: string[];
  days: string[];
  statuses: string[];
  selectedName: string;
  selectedDay: string;
  selectedStatus: string;
  onNameChange: (event: SelectChangeEvent<string>) => void;
  onDayChange: (event: SelectChangeEvent<string>) => void;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  names,
  days,
  statuses,
  selectedName,
  selectedDay,
  selectedStatus,
  onNameChange,
  onDayChange,
  onStatusChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Name</InputLabel>
        <Select value={selectedName} onChange={onNameChange} label="Name">
          <MenuItem value=""><em>None</em></MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Day</InputLabel>
        <Select value={selectedDay} onChange={onDayChange} label="Day">
          <MenuItem value=""><em>None</em></MenuItem>
          {days.map((day) => (
            <MenuItem key={day} value={day}>{day}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select value={selectedStatus} onChange={onStatusChange} label="Status">
          <MenuItem value=""><em>None</em></MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
