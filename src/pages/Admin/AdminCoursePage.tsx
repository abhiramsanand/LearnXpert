import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import CourseContainer from '../../components/Admin/CourseView/CourseContainer';

const AdminCoursePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(15);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      p={2}
      position="relative" // Ensures positioning of the button is relative to this container
    >
      <Box mb={2} display="flex" justifyContent="center" width="100%">
        <BatchSelect selectedBatch={selectedBatch || 0} onBatchSelect={handleBatchSelect} />
      </Box>
      <Button
        component={Link}
        to="/Admin-CourseCreation"
        variant="contained"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1, // Ensures the button is above other content
          padding: '6px 12px', // Smaller padding for a smaller button
          fontSize: '0.875rem', // Smaller font size
          borderRadius: '4px', // Slightly rounded corners
          backgroundColor: '#8061C3',
          '&:hover': {
            backgroundColor: '#8061C3', // Darker shade for hover effect
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Adds shadow on hover
          },
        }}
      >
        Add Course
      </Button>
      <CourseContainer selectedBatch={selectedBatch} />
    </Box>
  );
};

export default AdminCoursePage;
