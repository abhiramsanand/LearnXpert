import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import format from 'date-fns/format';


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
        renderInput={(params) => (
          <StyledTextField 
            {...params} 
            variant="outlined"
            value={selectedDate ? format(selectedDate, 'dd-mm-yyyy') : ''}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
