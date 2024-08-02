import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import DayBox from './DayBox';
import TraineeHeader from '../../../constants/TraineeHeader';

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
  padding: '10px 15px',
  textAlign: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '16px',
  },
});

const Footer = styled(Box)({
  backgroundColor: '#8518FF',
  color: '#fff',
  padding: '10px 15px',
  textAlign: 'center',
  fontSize: '14px',
  '@media (max-width: 600px)': {
    fontSize: '12px',
  },
});

// Centered and full-width container
const OuterContainer = styled(Box)({
  border: '2px solid #8518FF',
  borderRadius: '8px',
  padding: '15px',
  margin: '15px auto',
  display: 'flex',
  flexDirection: 'row',
  height: 'calc(100vh - 100px)', // Adjust height based on header/footer height
  width: '100%',
  maxWidth: '1000px', // Reduced maximum width
  overflow: 'hidden', // Prevent scrolling
  '@media (max-width: 900px)': {
    flexDirection: 'column',
    height: 'auto', // Allow height to adjust automatically
  },
});

// Container for the day list with custom scrollbar
const DayListContainer = styled(Box)({
  flex: '1',
  overflowY: 'auto', // Allow scrolling if content overflows
  paddingRight: '5px',
  marginRight: '10px',
  borderRight: '1px solid #ddd',
  border: '1px solid #D1B2FF',
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
  '@media (max-width: 900px)': {
    marginRight: '0',
    borderRight: 'none',
    borderBottom: '1px solid #D1B2FF',
  },
});

// Container for the course grid
const CourseGridContainer = styled(Box)({
  flex: '2',
  paddingLeft: '15px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Ensure it takes full height of its parent
  overflow: 'hidden', // Prevent scrolling
  '@media (max-width: 900px)': {
    paddingLeft: '0',
  },
});

// Box for each course with light purple background
const CourseBox = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '12px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '8px',
  width: 'calc(100% - 16px)', // Adjust width to fit within container
  boxSizing: 'border-box',
  backgroundColor: 'white',
  overflow: 'hidden' // Ensure no overflow
});

// ProgressBar container with fixed width
const ProgressContainer = styled(Box)({
  flex: 1,
  position: 'relative',
  height: '8px',
  borderRadius: '4px',
  border: '1px solid #A54BFF',
  backgroundColor: '#F0F0F0',
  marginLeft: '12px',
  width: '100%',
  maxWidth: '200px', // Reduced maximum width
  '@media (max-width: 600px)': {
    maxWidth: '120px',
  },
});

const ProgressBar = styled(LinearProgress)({
  height: '100%',
  borderRadius: '4px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#8518FF',
  },
});

const ProgressText = styled(Typography)({
  marginLeft: '12px',
  color: '#8518FF',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    fontSize: '12px',
  },
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
      <TraineeHeader title={'Courses'} />
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
            <Grid container spacing={1}>
              {selectedDayData.courses.map((course, index) => (
                <Grid item xs={12} key={index}>
                  <CourseBox>
                    <Typography variant="h6" style={{ flexShrink: 0, marginRight: '12px', fontSize: '12px' }}>{course.title}</Typography>
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
