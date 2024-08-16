import React from 'react';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Student {
  name: string;
}

interface SearchBarComponentProps {
  students: Student[];
  onStudentSelect: (student: Student | null) => void;
  sx?: object;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ students, onStudentSelect, sx }) => {
  return (
    <Autocomplete
      options={students}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => onStudentSelect(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search"
          sx={{
            width: {
              xs: '100%', // Full width on extra-small screens
              sm: '300px', // 300px on small screens and above
              md: '400px', // 400px on medium screens and above
            },
            height: 40,
            ...sx,
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBarComponent;
