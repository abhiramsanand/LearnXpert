import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './CourseContainer.module.css'; // Import the CSS module

interface Course {
  title: string;
  completed: number;
  hours: number;
}

interface DayAccordionProps {
  day: string;
  isLocked: boolean;
  isSelected: boolean;
  onToggle: () => void;
  totalProgress: number;
  totalHours: number;
  courses: Course[];
  isDetailsVisible: boolean;
}

const DayAccordion: React.FC<DayAccordionProps> = ({
  day,
  isLocked,
  isSelected,
  onToggle,
  totalProgress,
  totalHours,
  courses,
  isDetailsVisible,
}) => {
  // Determine if the day should be locked based on the progress or isLocked status
  const shouldLockDay = isLocked || totalProgress === 0;

  return (
    <Accordion
      expanded={isSelected}
      onChange={onToggle}
      disabled={shouldLockDay}
      className={styles.accordionItem}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          backgroundColor: shouldLockDay ? '#F0F0F0' : '#F3E8FF', 
          border: '1px solid #D1B2FF', 
          borderRadius: '8px', 
          padding: '12px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
            {day}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, marginLeft: '16px', marginRight: '16px' }}>
          <LinearProgress
            variant="determinate"
            value={totalProgress}
            sx={{ 
              height: '8px', 
              borderRadius: '4px', 
              backgroundColor: '#F0F0F0', 
              '& .MuiLinearProgress-bar': { 
                backgroundColor: '#8518FF' 
              } 
            }}
          />
          <Typography variant="body2" sx={{ marginTop: '4px', fontSize: '12px', color: '#8518FF', fontWeight: 'bold', textAlign: 'center' }}>
            {totalProgress}%
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '12px', color: '#333' }}>
          {totalHours} Hours
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isDetailsVisible && (
          <CourseDetails courses={courses} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default DayAccordion;
