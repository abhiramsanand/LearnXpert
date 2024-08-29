import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import styles from './CalenderComponent.module.css';
import 'react-calendar/dist/Calendar.css';

// Define the interface for the date with day number
interface DateWithDayNumber {
  date: string;
  dayNumber: number;
}

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [markedHoliday, setMarkedHoliday] = useState<Date | null>(null);
  const [datesWithDayNumbers, setDatesWithDayNumbers] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch the dates and day numbers from the API
    const fetchDates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/courses/dates/dayNumber');
        const data: DateWithDayNumber[] = response.data;
        // Convert the fetched data into a format suitable for rendering
        const datesMap: Record<string, number> = {};
        data.forEach(item => {
          const dateKey = new Date(item.date).toISOString().split('T')[0];
          datesMap[dateKey] = item.dayNumber;
        });
        setDatesWithDayNumbers(datesMap);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDates();
  }, []);

  const handleDateClick = async (value: Date) => {
    // Mark the selected date as a holiday
    try {
      const dateString = value.toISOString().split('T')[0];
      await axios.post('http://localhost:8080/api/v1/courses/mark-holiday', { holidayDate: dateString });
      setMarkedHoliday(value);
      alert('Holiday marked and course dates updated successfully.');
    } catch (error) {
      console.error('Error marking holiday:', error);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          const dayNumber = datesWithDayNumbers[dateString];
          return (
            <div className={styles.calendarDayContent}>
              {dayNumber ? <span className={styles.dayNumber}>{dayNumber}</span> : null}
            </div>
          );
        }}
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          return datesWithDayNumbers[dateString] ? styles.calendarDayWithDayNumber : '';
        }}
      />
      {markedHoliday && <p>Holiday marked on: {markedHoliday.toDateString()}</p>}
    </div>
  );
};

export default CalendarComponent;
