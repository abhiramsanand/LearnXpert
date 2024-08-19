import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CourseDetails from './CourseDetails';

interface Session {
  title: string;
  duration: string;
}

interface DayAccordionProps {
  day: string;
  isSelected: boolean;
  onToggle: () => void;
  totalHours: string; // Total hours for the day
  sessions: Session[];
  isDetailsVisible: boolean;
}

const DayAccordion: React.FC<DayAccordionProps> = ({
  day,
  isSelected,
  onToggle,
  totalHours,
  sessions,
  isDetailsVisible,
}) => {
  return (
    <Accordion
      expanded={isSelected}
      onChange={onToggle}
      sx={{ marginBottom: '12px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: '#F3E8FF',
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
        <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          {totalHours}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isDetailsVisible && (
          <CourseDetails sessions={sessions} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default DayAccordion;
