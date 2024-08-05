import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const ListContainer = styled(List)({
  backgroundColor: '#F3E8FF', // Light purple background
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #8518FF', // Border color
  maxHeight: '280px', // Maximum height for scrolling
  overflowY: 'auto', // Enable scrolling within the container
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#8518FF', // Color of the scrollbar thumb
    borderRadius: '8px', // Round the corners of the scrollbar thumb
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F3E8FF', // Color of the scrollbar track
    borderRadius: '8px', // Round the corners of the scrollbar track
  },
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '4px',
  '&.Mui-selected': {
    backgroundColor: '#E1D4FF', // Slightly darker background on selection
  },
  '&:hover': {
    backgroundColor: '#E1D4FF', // Slightly darker background on hover
  },
}));

interface DayListProps {
  days: string[];
  selectedDay: string;
  onDayClick: (day: string) => void;
}

const DayList: React.FC<DayListProps> = ({ days, selectedDay, onDayClick }) => {
  return (
    <ListContainer>
      {days.map(day => (
        <StyledListItem
          key={day}
          button
          selected={day === selectedDay}
          onClick={() => onDayClick(day)}
        >
          <Typography>{day}</Typography>
        </StyledListItem>
      ))}
    </ListContainer>
  );
};

export default DayList;
