import React, { useState } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#8061C3", // Default border color
          },
          "&:hover fieldset": {
            borderColor: "#5B8C5A", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#5B8C5A", // Border color when focused
          },
        },
        "& .MuiInputLabel-root": {
          color: "#8061C3", // Default label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#5B8C5A", // Label color when focused
        },
      }}
    />
  );
};

export default SearchBar;
