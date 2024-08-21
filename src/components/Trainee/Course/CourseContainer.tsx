import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  courseName: string;
  dayNumber: number;
  courseDuration: string;
  traineeDuration: number;
  completionPercentage: number;
}

interface DayData {
  courses: Course[];
  totalTime: number; // Added total time for each day
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

// Container for displaying course details
const CourseDetailsContainer = styled(Box)({
  padding: '12px',
  backgroundColor: 'white',
});

// Styled container for day summary
const DaySummaryContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  padding: '12px',
});

const ProgressContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginLeft: '16px',
  marginRight: '16px',
});

interface CourseContainerProps {
  traineeId: number; // Prop for trainee ID
}

const CourseContainer: React.FC<CourseContainerProps> = ({ traineeId }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [daysData, setDaysData] = useState<DaysData | null>(null);

  useEffect(() => {
    // Fetch the JSON data from the API based on traineeId
    fetch(`http://localhost:8080/api/v1/traineeprogress/courseprogress/${traineeId}`)
      .then((response) => response.json())
      .then((data) => {
        const processedData: DaysData = {};

        data.forEach((item: Course) => {
          const day = `Day ${item.dayNumber}`;

          if (!processedData[day]) {
            processedData[day] = { courses: [], totalTime: 0 };
          }

          // Round completionPercentage to 2 decimal points
          const roundedPercentage = parseFloat(item.completionPercentage.toFixed(2));

          processedData[day].courses.push({
            courseName: item.courseName,
            dayNumber: item.dayNumber,
            courseDuration: item.courseDuration,
            traineeDuration: item.traineeDuration,
            completionPercentage: roundedPercentage,
          });

          // Add total time for each day
          processedData[day].totalTime += parseFloat(item.courseDuration.split(' ')[0]); // Extract hours and sum up
        });

        setDaysData(processedData);
      })
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, [traineeId]); // Dependency on traineeId

  const days = daysData ? Object.keys(daysData) : [];

  const isDayLocked = (dayIndex: number): boolean => {
    if (dayIndex === 0) return false; // The first day is never locked
    const previousDay = `Day ${dayIndex}`;
    const previousDayData = daysData ? daysData[previousDay] : null;
    if (!previousDayData) return true;
    return previousDayData.courses.some((course) => course.completionPercentage < 100);
  };

  // Calculate total progress percentage for a given day
  const calculateTotalProgress = (day: string): number => {
    if (isDayLocked(days.indexOf(day))) return 0; // Return 0 if the day is locked

    const dayData = daysData ? daysData[day] : null;
    if (!dayData || dayData.courses.length === 0) return 0;

    const totalCompleted = dayData.courses.reduce((acc, course) => acc + course.completionPercentage, 0);
    const totalCourses = dayData.courses.length;
    return Math.round(totalCompleted / totalCourses);
  };

  // Calculate total hours for a given day
  const calculateTotalHours = (day: string): number => {
    if (isDayLocked(days.indexOf(day))) return 0; // Return 0 if the day is locked

    const dayData = daysData ? daysData[day] : null;
    if (!dayData) return 0;

    return dayData.totalTime; // Use totalTime from the data
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OuterContainer>
        <ScrollableDaysContainer>
          {days.map((day, index) => {
            const isLocked = isDayLocked(index);
            return (
              <Accordion
                key={day}
                expanded={selectedDay === day}
                onChange={() => !isLocked && setSelectedDay(selectedDay === day ? null : day)}
                disabled={isLocked}
                sx={{ marginBottom: '8px' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ backgroundColor: 'white', border: '1px solid #D1B2FF', borderRadius: '8px', padding: '0' }}
                >
                  <DaySummaryContainer>
                    <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{day}</Typography>
                    <ProgressContainer>
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center'}}>
                        <LinearProgress
                          variant="determinate"
                          value={calculateTotalProgress(day)}
                          sx={{ flex: 1, height: '8px', borderRadius: '4px', backgroundColor: '#F0F0F0', maxWidth: '20%', marginLeft: '40%', '& .MuiLinearProgress-bar': { backgroundColor: '#8518FF' } }}
                        />
                        <Typography variant="body2" sx={{ color: '#8518FF', fontWeight: 'bold', marginLeft: '20px' }}>
                          {calculateTotalProgress(day)}%
                        </Typography>
                      </Box>
                    </ProgressContainer>
                    <Typography variant="body2" sx={{ fontSize: '16px', fontWeight: 'bold', marginRight: '7%' }}>
                      {calculateTotalHours(day)} Hours
                    </Typography>
                  </DaySummaryContainer>
                </AccordionSummary>
                <AccordionDetails>
                  {selectedDay === day && daysData ? (
                    <CourseDetailsContainer>
                      <Grid container spacing={2}>
                        {daysData[day].courses.map((course, index) => (
                          <Grid item xs={12} key={index}>
                            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', backgroundColor: '#E6E6FA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>{course.courseName}</Typography>
                              <Box sx={{ flex: 1, marginLeft: '70%', display: 'flex', alignItems: 'center', }}>
                                <Box sx={{ flex: 1, position: 'relative', height: '8px', borderRadius: '4px', border: '1px solid #A54BFF', backgroundColor: '#F0F0F0', maxWidth: '200px' }}>
                                  <LinearProgress variant="determinate" value={course.completionPercentage} sx={{ height: '100%', borderRadius: '4px', '& .MuiLinearProgress-bar': { backgroundColor: '#8518FF' } }} />
                                </Box>
                                <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '8px' }}>
                                  {course.completionPercentage}%
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CourseDetailsContainer>
                  ) : null}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </ScrollableDaysContainer>
      </OuterContainer>
    </ThemeProvider>
  );
};

export default CourseContainer;
