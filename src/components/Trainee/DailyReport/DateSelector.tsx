import React, { useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import format from 'date-fns/format';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    border: '2px solid #8061C3',
    borderRadius: '20px',
    color: '#8061C3',
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
  },
  '& .MuiSvgIcon-root': {
    color: '#8061C3',
  },
});

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            component: (params: TextFieldProps) => (
              <StyledTextField
                {...params}
                variant="outlined"
                value={selectedDate ? format(selectedDate, 'dd-MM-yyyy') : ''}
              />
            ),
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
