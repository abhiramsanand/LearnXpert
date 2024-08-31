import React from 'react';
import { Box, Typography, Grid, CardContent } from '@mui/material';

interface Course {
  title: string;
  courseDuration: string;
}

interface CourseDetailsProps {
  courses: Course[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courses }) => {
  return (
    <Box sx={{ padding: '16px', backgroundColor: 'rgba(128, 97, 195, 0.1)', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Box
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #8061C3',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: '15px',
                    color: '#5B8C5A',
                  }}
                >
                  {course.title} ({course.courseDuration})
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetails;
