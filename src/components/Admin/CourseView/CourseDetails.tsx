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
    <Box sx={{ padding: '16px', backgroundColor: 'rgba(91, 140, 90, 0.1)', borderRadius: '8px' }}>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Card
              sx={{
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#8061C3',
                    marginBottom: '8px',
                  }}
                >
                  {course.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetails;
