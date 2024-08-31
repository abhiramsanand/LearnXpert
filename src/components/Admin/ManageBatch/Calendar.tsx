// src/components/Calendar.tsx
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';

interface DayNumberWithDateDTO {
  date: string;
  dayNumber: number;
}

const CustomCalendar: React.FC = () => {
  const [dates, setDates] = useState<DayNumberWithDateDTO[]>([]);
  const [value, setValue] = useState<Date | Date[]>(new Date());
  const [holidayDate, setHolidayDate] = useState<string>('');

  useEffect(() => {
    axios.get<DayNumberWithDateDTO[]>('http://localhost:8080/api/courses/dates/dayNumber')
      .then(response => {
        setDates(response.data);
      })
      .catch(error => {
        console.error('Error fetching dates:', error);
      });
  }, []);

  const handleMarkHoliday = () => {
    axios.post('http://localhost:8080/api/courses/mark-holiday/day', { holidayDate, description: 'Holiday' })
      .then(() => {
        alert('Holiday marked successfully.');
      })
      .catch(error => {
        console.error('Error marking holiday:', error);
      });
  };

  const handleUnmarkHoliday = () => {
    axios.post('http://localhost:8080/api/courses/unmark-holiday', { holidayDate })
      .then(() => {
        alert('Holiday unmarked successfully.');
      })
      .catch(error => {
        console.error('Error unmarking holiday:', error);
      });
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedDate = date.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
      const dayData = dates.find(d => d.date === formattedDate);

      const isWorkingDay = Boolean(dayData);
      const backgroundColor = isWorkingDay ? '#4CAF50' : '#F44336'; // Green for working days, red otherwise

      return (
        <Box
          sx={{
            backgroundColor,
            color: '#fff',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            padding: '8px',
          }}
        >
          {dayData ? (
            <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
              {dayData.dayNumber}
            </Typography>
          ) : null}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Calendar
        value={value}
        onChange={setValue}
        tileContent={tileContent}
        sx={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: 'transparent',
          '& .react-calendar__tile': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            height: '100px', // Ensure uniform height for all tiles
            width: '100px',  // Ensure uniform width for all tiles
          },
        }}
      />
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Holiday Date"
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleMarkHoliday}>
          Mark as Holiday
        </Button>
        <Button variant="contained" color="secondary" onClick={handleUnmarkHoliday}>
          Unmark Holiday
        </Button>
      </Box>
    </Box>
  );
};

export default CustomCalendar;
