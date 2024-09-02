import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarComponentProps {
  onSearch: (searchValue: string) => void;
  sx?: object;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ onSearch, sx }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      onChange={handleChange}
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
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBarComponent;
