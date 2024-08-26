import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseDetails from './CourseDetails';
import styles from './CourseContainer.module.css'; // Import the CSS module

interface CourseData {
  courseName: string;
  dayNumber: number;
  batchName: string;
  courseDuration: string; // Assuming duration is in a format like "1h 30m" or "90m"
}

interface CourseContainerProps {
  selectedBatch: number | null;
}

const CourseContainer: React.FC<CourseContainerProps> = ({ selectedBatch }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [daysData, setDaysData] = useState<Record<number, { totalDuration: number, sessions: { title: string }[] }> | null>(null);

  useEffect(() => {
    if (selectedBatch !== null) {
      fetch(`http://localhost:8080/api/courses/batch/${selectedBatch}`)
        .then((response) => response.json())
        .then((data: CourseData[]) => {
          console.log('Fetched data:', data); // Log the data to verify structure

          // Transform the data
          const transformedData = data.reduce((acc, item) => {
            const durationInMinutes = parseDuration(item.courseDuration);
            if (!acc[item.dayNumber]) {
              acc[item.dayNumber] = {
                totalDuration: 0,
                sessions: []
              };
            }
            acc[item.dayNumber].totalDuration += durationInMinutes;
            acc[item.dayNumber].sessions.push({ title: item.courseName });
            return acc;
          }, {} as Record<number, { totalDuration: number, sessions: { title: string }[] }>);

          setDaysData(transformedData);
        })
        .catch((error) => console.error('Error fetching the API data:', error));
    }
  }, [selectedBatch]);

  const parseDuration = (duration: string): number => {
    // Function to convert duration string (e.g., "1h 30m") to minutes
    const timeParts = duration.split(' ');
    let totalMinutes = 0;
    timeParts.forEach(part => {
      if (part.includes('h')) {
        totalMinutes += parseInt(part.replace('h', '')) * 60;
      } else if (part.includes('m')) {
        totalMinutes += parseInt(part.replace('m', ''));
      }
    });
    return totalMinutes;
  };

  const formatDuration = (totalMinutes: number): string => {
    // Function to format minutes as "h m" (e.g., "1h 30m")
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const days = daysData ? Object.keys(daysData).map(Number) : [];

  return (
    <Box className={styles.outerContainer}>
      {selectedBatch !== null && (
        <Box className={styles.scrollableDaysContainer}>
          {days.map((day) => (
            <Accordion
              key={day}
              expanded={selectedDay === day}
              onChange={() => setSelectedDay(selectedDay === day ? null : day)}
              className={styles.accordionItem}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: 'white', border: '1px solid #D1B2FF', borderRadius: '8px', padding: '0' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{`Day ${day}`}</Typography>
                  <Typography variant="body2" sx={{ fontSize: '16px', fontWeight: 'bold', marginRight: '7%' }}>
                    {daysData[day]?.totalDuration ? formatDuration(daysData[day].totalDuration) : 'No Duration'}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {selectedDay === day && daysData ? (
                  <CourseDetails courses={daysData[day].sessions} />
                ) : (
                  <Typography variant="h6">Select a day to see course details</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CourseContainer;
