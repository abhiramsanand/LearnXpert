
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import styles from './CourseContainer.module.css';

interface Course {
  title: string;
}

interface CourseDetailsProps {
  courses: Course[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courses }) => {
  return (
    <Box className={styles.courseDetailsContainer}>
      <Typography variant="h6">Courses</Typography>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', backgroundColor: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                {course.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetails;
