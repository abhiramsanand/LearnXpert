/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import styles from './CourseContainer.module.css'; // Import CSS module

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#8061C3',
    },
    secondary: {
      main: '#DB5461',
    },
  },
});

// Function to convert seconds to hours, minutes, and seconds
const secondsToHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Interfaces
interface Course {
  courseName: string;
  dayNumber: number;
  estimatedDuration: number; // Duration in seconds
  duration: number; // Duration in seconds
  percentageCompleted: number;
}

interface DayData {
  courses: Course[];
  totalTime: number; // Total estimated duration in seconds
}

interface DaysData {
  [key: string]: DayData;
}

interface CourseContainerProps {
  traineeId: number;
}

// Component
const CourseContainer: React.FC<CourseContainerProps> = ({ traineeId }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [daysData, setDaysData] = useState<DaysData | null>(null);

  useEffect(() => {
    fetch(`https://ilpex-backend.onrender.com/api/v1/ilpex/traineeprogress/${traineeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const processedData: DaysData = {};

        data.forEach((item: Course) => {
          const day = `Day ${item.dayNumber}`;

          if (!processedData[day]) {
            processedData[day] = { courses: [], totalTime: 0 };
          }

          const roundedPercentage = Math.min(Math.round(item.percentageCompleted), 100);

          processedData[day].courses.push({
            courseName: item.courseName,
            dayNumber: item.dayNumber,
            estimatedDuration: item.estimatedDuration,
            duration: item.duration,
            percentageCompleted: roundedPercentage,
          });

          processedData[day].totalTime += item.estimatedDuration;
        });

        setDaysData(processedData);
      })
      .catch((error) => console.error('Error fetching the JSON data:', error));
  }, [traineeId]);

  const days = daysData ? Object.keys(daysData) : [];

  const calculateTotalProgress = (day: string): number => {
    const dayData = daysData ? daysData[day] : null;
    if (!dayData || dayData.courses.length === 0) return 0;

    const totalCompleted = dayData.courses.reduce((acc, course) => acc + course.percentageCompleted, 0);
    const totalCourses = dayData.courses.length;
    return Math.round(totalCompleted / totalCourses);
  };

  const calculateTotalHours = (day: string): string => {
    const dayData = daysData ? daysData[day] : null;
    if (!dayData) return '0h 0m';

    return secondsToHoursMinutes(dayData.totalTime); // Convert seconds to hours and minutes
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={styles.outerContainer}>
        <Box className={styles.scrollableDaysContainer}>
          {days.map((day, _index) => (
            <Accordion
              key={day}
              expanded={selectedDay === day}
              onChange={() => setSelectedDay(selectedDay === day ? null : day)}
              sx={{
                marginBottom: '8px',
                borderRadius: '7px',
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#8061C3' }} />}
                sx={{
                  backgroundColor: 'rgba(128, 97, 195, 0.1)',
                  borderRadius: '7px',
                  padding: '0 10px',
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(128, 97, 195, 0.05)',
                  },
                }}
              >
                <Box className={styles.daySummaryContainer}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginRight: '10px',
                        color: '#8061C3',
                      }}
                    >
                      {day}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                      <LinearProgress
                        variant="determinate"
                        value={calculateTotalProgress(day)}
                        sx={{
                          flex: 1,
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: '#F0F0F0',
                          maxWidth: '20%',
                          marginLeft: '40%',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#5B8C5A',
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#5B8C5A',
                          fontWeight: 'bold',
                          marginLeft: '20px',
                        }}
                      >
                        {calculateTotalProgress(day)}%
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginRight: '16px',
                        color: '#8061C3',
                      }}
                    >
                      {calculateTotalHours(day)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: '#F8F8F8',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                {selectedDay === day && daysData ? (
                  <Box className={styles.courseDetailsContainer}>
                    <Grid container spacing={2}>
                      {daysData[day].courses.map((course, index) => (
                        <Grid item xs={12} key={index}>
                          <Box
                            className={styles.courseItemContainer}
                            sx={{
                              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                              transition: 'transform 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.02)',
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 'bold',
                                color: '#8061C3',
                                flex: 1,
                              }}
                            >
                              {course.courseName}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={course.percentageCompleted}
                              sx={{
                                width: '20%',
                                height: '8px',
                                borderRadius: '4px',
                                backgroundColor: '#F0F0F0',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#5B8C5A',
                                },
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: '12px',
                                color: '#5B8C5A',
                                marginLeft: '10px',
                                fontWeight: 'bold',
                              }}
                            >
                              {course.percentageCompleted}%
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ padding: '10px' }}>
                    No details available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CourseContainer;
