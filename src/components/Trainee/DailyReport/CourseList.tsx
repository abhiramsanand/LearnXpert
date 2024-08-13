import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Course {
  name: string;
  duration: string;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  if (!Array.isArray(courses)) {
    return <Typography>No courses available</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      {courses.map((course, index) => (
        <Paper
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          
            mb: 2,
            p: 2,
          }}
        >
            <Box>
            <Typography>{course.name}</Typography>
            </Box>
          <Box>
          <Typography>{course.duration}</Typography>
          </Box>
          
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default CourseList;
