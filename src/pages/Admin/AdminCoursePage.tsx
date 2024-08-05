import React, { useState, useEffect } from 'react';
import BatchSelector from '../../components/Admin/CourseView/BatchSelector';
import DayList from '../../components/Admin/CourseView/DayList';
import CourseDisplay from '../../components/Admin/CourseView/CourseDisplay';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledContainer = styled(Container)({
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const Header = styled(Typography)({
  marginBottom: '10px',
  textAlign: 'center',
});

const AdminCoursePage: React.FC = () => {
  const [coursesData, setCoursesData] = useState<Record<string, any>>({});
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [courses, setCourses] = useState<{ title: string }[]>([]);

  // Fetch data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/AdminCourse.json'); // Adjust the path if needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoursesData(data);
        // Set default batch and day
        const defaultBatch = Object.keys(data)[0];
        setSelectedBatch(defaultBatch);
        setSelectedDay(Object.keys(data[defaultBatch])[0]);
        setCourses(data[defaultBatch][Object.keys(data[defaultBatch])[0]] || []);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const handleBatchChange = (batch: string) => {
    setSelectedBatch(batch);
    setSelectedDay(Object.keys(coursesData[batch])[0]); // Set default day
    setCourses(coursesData[batch][Object.keys(coursesData[batch])[0]] || []); // Set default courses
  };

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    if (selectedBatch) {
      setCourses(coursesData[selectedBatch][day] || []);
    }
  };

  const batches = Object.keys(coursesData);
  const days = selectedBatch ? Object.keys(coursesData[selectedBatch]) : [];

  return (
    <StyledContainer>
      {/* <Header variant="h4">Course Administration</Header> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <BatchSelector
              batches={batches}
              selectedBatch={selectedBatch}
              onBatchChange={handleBatchChange}
            />
            {selectedBatch && (
              <>
                <Typography variant="h6" style={{ marginTop: '10px' ,color:'#8518FF'}}>
                  Select Day
                </Typography>
                <DayList
                  days={days}
                  selectedDay={selectedDay}
                  onDayClick={handleDayClick}
                />
              </>
            )}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            {selectedBatch && (
              <>
                <Typography variant="h6" style={{color:'#8518FF'}}>Courses for {selectedDay}</Typography>
                <CourseDisplay courses={courses} />
              </>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AdminCoursePage;
