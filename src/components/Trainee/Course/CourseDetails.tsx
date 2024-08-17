import React from 'react';
import { Box, Typography, Grid, LinearProgress } from '@mui/material';
import styles from './CourseContainer.module.css';

interface Course {
  title: string;
  completed: number;
  hours: number;
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
              <Box sx={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    flex: 1,
                    position: 'relative',
                    height: '8px',
                    borderRadius: '4px',
                    border: '1px solid #A54BFF',
                    backgroundColor: '#F0F0F0',
                    maxWidth: '200px',
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={course.completed}
                    sx={{ height: '100%', borderRadius: '4px', '& .MuiLinearProgress-bar': { backgroundColor: '#8518FF' } }}
                  />
                </Box>
                <Typography variant="body2" sx={{ marginLeft: '12px', fontSize: '12px' }}>
                  {course.completed}%
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetails;
