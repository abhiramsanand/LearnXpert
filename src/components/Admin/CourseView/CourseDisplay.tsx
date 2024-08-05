import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const CourseContainer = styled(Box)({
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
});

const CourseItem = styled(Typography)({
  marginBottom: '8px',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#F3E8FF',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundColor: '#e3e3e3',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
});

interface CourseDisplayProps {
  courses: { title: string }[];
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ courses }) => {
  return (
    <CourseContainer>
      {courses.length === 0 ? (
        <Typography>No courses available</Typography>
      ) : (
        courses.map((course, index) => (
          <CourseItem key={index}>
            {course.title}
          </CourseItem>
        ))
      )}
    </CourseContainer>
  );
};

export default CourseDisplay;
