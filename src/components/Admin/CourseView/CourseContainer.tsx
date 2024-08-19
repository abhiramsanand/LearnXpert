import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DayAccordion from './DayAccordian';

// Define a basic theme with custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#8061C3', // Main color
    },
    secondary: {
      main: '#8061C3', // Lighter shade
    },
  },
});

// Define types for course and day data
interface Course {
  title: string;
}

interface DayData {
  sessions: Course[];
  duration: string; // Changed to string to match JSON structure
}

interface DaysData {
  [key: string]: DayData;
}

// Container for the outer layout
const OuterContainer = styled(Box)({
  border: '2px solid #8061C3',
  borderRadius: '8px',
  padding: '15px',
  margin: '19px auto', // Add margin top to create space
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(90vh - 100px)', // Adjust height based on header/footer height
  width: '100%',
  maxWidth: '1000px',
  overflow: 'hidden',
});

// Container for scrolling days
const ScrollableDaysContainer = styled(Box)({
  flex: '1',
  overflowY: 'auto', // Enable vertical scrolling
  paddingRight: '5px',
  borderRight: '1px solid #ddd',
  borderRadius: '8px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#A54BFF',
    borderRadius: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F0F0F0',
    borderRadius: '8px',
  },
});

const CourseContainer = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [daysData, setDaysData] = useState<DaysData | null>(null);

  useEffect(() => {
    // Fetch the JSON data from public directory
    fetch('/courselist.json')
      .then((response) => response.json())
      .then((data) => setDaysData(data["ILP Dev batch-1"])) // Adjusted to specific batch for example
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, []);

  const days = daysData ? Object.keys(daysData) : [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OuterContainer>
        <ScrollableDaysContainer>
          {days.map((day) => (
            <DayAccordion
              key={day}
              day={day}
              isSelected={selectedDay === day}
              onToggle={() => setSelectedDay(selectedDay === day ? null : day)}
              totalHours={daysData ? daysData[day].duration : '0 hours'}
              courses={daysData ? daysData[day].sessions : []}
              isDetailsVisible={selectedDay === day}
            />
          ))}
        </ScrollableDaysContainer>
      </OuterContainer>
    </ThemeProvider>
  );
};

export default CourseContainer;
