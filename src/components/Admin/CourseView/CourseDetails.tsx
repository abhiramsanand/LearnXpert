import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

interface Course {
  title: string;
}

interface CourseDetailsProps {
  courses: Course[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courses }) => {
  return (
    <Box sx={{ padding: '16px', backgroundColor: '#FAFAFA' }}>
      <Typography variant="h6" sx={{ marginBottom: '12px', fontWeight: '600' }}>Courses</Typography>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#FFFFFF' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: '500' }}>{course.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetails;
