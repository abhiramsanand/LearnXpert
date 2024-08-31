import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

interface CourseDate {
  date: string; // Ensure this is in ISO format or a format parseable by Date
  dayNumber: number;
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format: (date, format, culture) => date.toLocaleDateString(culture),
  parse: (value, format, culture) => new Date(value),
  startOfWeek: () => new Date(),
  getDay: (date) => date.getDay(),
  locales,
});

const HolidayCalendar: React.FC = () => {
  const [courseDates, setCourseDates] = useState<CourseDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCourseDates();
  }, []);

  const fetchCourseDates = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses/dates/dayNumber');
      if (Array.isArray(response.data)) {
        setCourseDates(response.data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching course dates', error);
      enqueueSnackbar('Failed to load course dates', { variant: 'error' });
    }
  };

  const handleDateClick = (slotInfo: any) => {
    console.log('Date clicked:', slotInfo.start); // Debugging line
    setSelectedDate(slotInfo.start);
    setDialogOpen(true);
  };

  const handleMarkHoliday = async () => {
    if (selectedDate) {
      try {
        await axios.post('http://localhost:8080/api/courses/mark-holiday/day', {
          holidayDate: selectedDate.toISOString().split('T')[0],
        });
        enqueueSnackbar('Holiday marked successfully', { variant: 'success' });
        fetchCourseDates();
      } catch (error) {
        console.error('Error marking holiday', error);
        enqueueSnackbar('Failed to mark holiday', { variant: 'error' });
      }
    }
    setDialogOpen(false);
  };

  const handleUnmarkHoliday = async () => {
    if (selectedDate) {
      try {
        await axios.post('http://localhost:8080/api/courses/unmark-holiday', {
          holidayDate: selectedDate.toISOString().split('T')[0],
        });
        enqueueSnackbar('Holiday unmarked successfully', { variant: 'success' });
        fetchCourseDates();
      } catch (error) {
        console.error('Error unmarking holiday', error);
        enqueueSnackbar('Failed to unmark holiday', { variant: 'error' });
      }
    }
    setDialogOpen(false);
  };

  const events = courseDates.map((courseDate) => ({
    title: `Day ${courseDate.dayNumber}`,
    start: new Date(courseDate.date),
    end: new Date(courseDate.date),
    allDay: true,
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locales['en-US']}>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        Click on a date to mark or unmark it as a holiday.
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleDateClick}
        selectable
        views={['month']}
      />
      <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Select Action</DialogTitle>
        <DialogContent>
          <Button onClick={handleMarkHoliday} color="primary" variant="contained">Mark as Holiday</Button>
          <Button onClick={handleUnmarkHoliday} color="secondary" variant="contained">Unmark as Holiday</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="default">Cancel</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default HolidayCalendar;
