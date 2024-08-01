// src/Component/Course/CourseComponent.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import DayBox from './DayBox'; // Import the default export

// Define a basic theme with custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#8518FF', // Main color
    },
    secondary: {
      main: '#A54BFF', // Lighter shade
    },
  },
});

// Header and Footer components
const Header = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
});

const Footer = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 20px',
  textAlign: 'center',
  fontSize: '16px',
});

// Centered and full-width container
const OuterContainer = styled(Box)({
  border: '2px solid #8518FF',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px auto', // Center horizontally with auto margin
  display: 'flex',
  flexDirection: 'row',
  minHeight: '600px',
  width: '100%', // Take full width
  maxWidth: '1200px', // Optional: Set a max-width to keep it from stretching too wide
});

// Container for the day list with custom scrollbar
const DayListContainer = styled(Box)({
  flex: '1',
  overflowY: 'auto',
  maxHeight: '600px', // Fixed height with scrolling
  paddingRight: '10px', // Space for scrollbar
  marginRight: '20px', // Space between DayListContainer and CourseGridContainer
  borderRight: '1px solid #ddd',
  border: '1px solid #D1B2FF', // Light purple border color
  borderRadius: '8px', // Rounded corners
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#A54BFF', // Color of the scrollbar thumb
    borderRadius: '8px', // Rounded corners of the thumb
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F0F0F0', // Color of the scrollbar track
    borderRadius: '8px', // Rounded corners of the track
  },
});

// Container for the course grid
const CourseGridContainer = styled(Box)({
  flex: '2',
  paddingLeft: '20px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Ensure it takes the full height of OuterContainer
});

// Box for each course with light purple background
const CourseBox = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '10px',
  width: '100%', // Ensure it fits within the container
  boxSizing: 'border-box', // Ensure padding and border are included in width
  backgroundColor: 'white', // Light purple background color
});

// ProgressBar container with fixed width
const ProgressContainer = styled(Box)({
  flex: 1,
  position: 'relative',
  height: '10px',
  borderRadius: '4px',
  border: '1px solid #A54BFF', // Border color for the progress bar
  backgroundColor: '#F0F0F0', // Background color of the progress bar
  marginLeft: '16px', // Space between progress bar and text
  width: '100%', // Make sure it fits within the CourseBox
  maxWidth: '250px', // Optional: set a max-width to prevent overflow
});

const ProgressBar = styled(LinearProgress)({
  height: '100%',
  borderRadius: '4px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#8518FF', // Fill color of the progress bar
  },
});

const ProgressText = styled(Typography)({
  marginLeft: '16px', // Space between progress bar and text
  color: '#8518FF',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
});

interface Course {
  title: string;
  completed: number;
}

interface DayData {
  time: string;
  courses: Course[];
}

interface DaysData {
  [key: string]: DayData;
}

const CourseContainer: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Day 1');
  const [daysData, setDaysData] = useState<DaysData | null>(null);

  useEffect(() => {
    // Fetch the JSON data from public directory
    fetch('/courselist.json')
      .then((response) => response.json())
      .then((data) => setDaysData(data.Days))
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, []);

  const days = daysData ? Object.keys(daysData) : [];

  const selectedDayData = selectedDay && daysData ? daysData[selectedDay] : { time: '', courses: [] };

  const isDayLocked = (dayIndex: number): boolean => {
    if (dayIndex === 0) return false; // The first day is never locked
    const previousDay = `Day ${dayIndex}`;
    const previousDayData = daysData ? daysData[previousDay] : null;
    if (!previousDayData) return true;
    return previousDayData.courses.some((course) => course.completed < 100);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header>Course Management</Header>
      <OuterContainer>
        <DayListContainer>
          {days.map((day, index) => (
            <DayBox
              key={day}
              dayName={day}
              time={daysData[day].time}
              onClick={() => !isDayLocked(index) && setSelectedDay(day)}
              lock={isDayLocked(index)} // Pass the lock prop to DayBox
            />
          ))}
        </DayListContainer>
        <CourseGridContainer>
          {selectedDay ? (
            <Grid container spacing={2}>
              {selectedDayData.courses.map((course, index) => (
                <Grid item xs={12} key={index}>
                  <CourseBox>
                    <Typography variant="h6" style={{ flexShrink: 0, marginRight: '16px' }}>{course.title}</Typography>
                    <Box style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                      <ProgressContainer>
                        <ProgressBar variant="determinate" value={course.completed} />
                      </ProgressContainer>
                      <ProgressText variant="body2">{course.completed}%</ProgressText>
                    </Box>
                  </CourseBox>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6">Select a day to see courses</Typography>
          )}
        </CourseGridContainer>
      </OuterContainer>
      <Footer>© 2024 Your Company Name</Footer>
    </ThemeProvider>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <CourseContainer />
  </ErrorBoundary>
);

export default App;
