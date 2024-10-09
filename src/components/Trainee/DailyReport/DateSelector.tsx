import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, TextFieldProps } from "@mui/material";
import { format } from "date-fns"; // Import the format function

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={selectedDate}
        onChange={onDateChange}
        inputFormat="dd/MM/yyyy" // Correct format for the displayed date
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                minWidth: '200px',
                height: '30px',
                borderRadius: '20px',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
        )}
        format="dd/MM/yyyy" // Ensure the date is formatted in the desired way
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
