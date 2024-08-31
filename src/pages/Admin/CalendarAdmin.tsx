import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Tooltip } from '@mui/material';
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
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses/dates/dayNumber');
      const holidays = response.data.map((item: { date: string; dayNumber: number }) => ({
        title: `Day ${item.dayNumber}`,
        start: new Date(item.date),
        end: new Date(item.date),
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

  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.title.startsWith('Day') ? '#f54242' : '#42f554'; // Customize colors
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

  const handleDateHover = (date: Date) => {
    setHoveredDate(date);
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
        onMouseOver={(event: React.MouseEvent, date: Date) => handleDateHover(date)}
        onSelectSlot={(slotInfo: { start: Date }) => {
          if (events.some(event => event.start.toDateString() === slotInfo.start.toDateString())) {
            handleUnmarkHoliday(slotInfo.start);
          } else {
            handleMarkHoliday(slotInfo.start);
          }
        }}
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
    </div>
  );
};

export default HolidayCalendar;
