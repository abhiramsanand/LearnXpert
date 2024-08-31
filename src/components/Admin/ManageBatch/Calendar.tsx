import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { Tooltip, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

const HolidayCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses/dates/dayNumber');
      const holidays = Array.from(
        new Set(response.data.map((item: { date: string; dayNumber: number }) => item.date))
      ).map((date) => ({
        title: `Day ${response.data.find((item: { date: string }) => item.date === date)?.dayNumber}`,
        start: new Date(date),
        end: new Date(date),
        allDay: true,
      }));
      setEvents(holidays);
    } catch (error) {
      console.error('Error fetching holidays', error);
      enqueueSnackbar('Failed to load holidays', { variant: 'error' });
    }
  };

  const handleMarkHoliday = async (date: Date) => {
    try {
      await axios.post('http://localhost:8080/api/courses/mark-holiday/day', {
        holidayDate: date.toISOString().split('T')[0],
      });
      enqueueSnackbar('Holiday marked successfully', { variant: 'success' });
      fetchHolidays();
    } catch (error) {
      console.error('Error marking holiday', error);
      enqueueSnackbar('Failed to mark holiday', { variant: 'error' });
    }
  };

  const handleUnmarkHoliday = async (date: Date) => {
    try {
      await axios.post('http://localhost:8080/api/courses/unmark-holiday', {
        holidayDate: date.toISOString().split('T')[0],
      });
      enqueueSnackbar('Holiday unmarked successfully', { variant: 'success' });
      fetchHolidays();
    } catch (error) {
      console.error('Error unmarking holiday', error);
      enqueueSnackbar('Failed to unmark holiday', { variant: 'error' });
    }
  };

  const handleDateHover = (date: Date) => {
    setHoveredDate(date);
  };

  const handleSelectSlot = (slotInfo: { start: Date }) => {
    const isWorkingDay = events.some(event => event.start.toDateString() === slotInfo.start.toDateString());
    if (isWorkingDay) {
      setSelectedDate(slotInfo.start);
      setShowConfirm(true);
    } else {
      handleMarkHoliday(slotInfo.start);
    }
  };

  const handleConfirmMarkHoliday = () => {
    if (selectedDate) {
      handleMarkHoliday(selectedDate);
    }
    setShowConfirm(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.title.startsWith('Day') ? '#f54242' : '#42f554';
    return {
      style: {
        backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
      />
      {hoveredDate && (
        <Tooltip
          title={
            events.some(event => event.start.toDateString() === hoveredDate.toDateString())
              ? 'Click to Unmark Holiday'
              : 'Click to Mark as Holiday'
          }
          open={true}
        >
          <div></div>
        </Tooltip>
      )}
      <Dialog open={showConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Mark Working Day as Holiday</DialogTitle>
        <DialogContent>
          Are you sure you want to mark this working day as a holiday?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmMarkHoliday} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HolidayCalendar;
