import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseDetails from './CourseDetails';
import styles from './CourseContainer.module.css';

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
  return (
    <Accordion
      expanded={isSelected}
      onChange={onToggle}
      disabled={isLocked}
      sx={{ marginBottom: '8px' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ backgroundColor: '#F3E8FF', border: '1px solid #D1B2FF', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
          {day}
        </Typography>
        <Box sx={{ flex: 1, marginLeft: '30px', marginRight: '30px' }}>
          <LinearProgress
            variant="determinate"
            value={totalProgress}
            sx={{ width:'20%',height: '8px', borderRadius: '4px', backgroundColor: '#F0F0F0',marginLeft:'30%',display:'flex', '& .MuiLinearProgress-bar': { backgroundColor: '#8518FF' } }}
          />
          <Typography variant="body2" sx={{ marginTop: '4px', fontSize: '12px', color: '#8518FF', fontWeight: 'bold', textAlign: 'center' }}>
            {totalProgress}%
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '12px' }}>
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
