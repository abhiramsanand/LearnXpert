import React from 'react';
import { TextField, TextFieldProps, createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider, DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A2BE2', // Replace with your desired color
    },
  },
});

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <MUIDatePicker
          label="Select Date"
          value={date}
          onChange={(newValue: Date | null) => setDate(newValue)}
          slots={{ textField: (params: TextFieldProps) => <TextField {...params} variant="outlined" sx={{ width: 200 }} /> }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default DatePicker;
