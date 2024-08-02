import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LockIcon from '@mui/icons-material/Lock';

// Box for each day with light purple border
const StyledBox = styled(Box)({
  border: '1px solid #D1B2FF', // Light purple border color
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
  width: 'calc(100% - 40px)', // Responsive width with margins
  maxWidth: '250px', // Maximum width
  height: '60px',
  margin: '10px auto', // Centered alignment with margin
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});

const TimeText = styled(Typography)({
  marginLeft: '8px',
});

const LockIconWrapper = styled(Box)({
  color: 'black',
  '&:hover': {
    color: '#FF3C3C', // Darker red on hover
  },
});

interface DayBoxProps {
  dayName: string;
  time: string;
  onClick: () => void;
  lock?: boolean; // New prop to determine if lock icon should be shown
}

const DayBox: React.FC<DayBoxProps> = ({ dayName, time, onClick, lock }) => {
  return (
    <StyledBox onClick={onClick}>
      <Typography variant="h6" style={{ fontSize: '12px', fontWeight: 'bold' }}>{dayName}</Typography>
      <Box display="flex" alignItems="center">
        {lock && dayName !== 'Day 1' && <LockIconWrapper><LockIcon /></LockIconWrapper>}
        <TimeText variant="body2" style={{ fontSize: '12px' }}>{time}</TimeText>
      </Box>
    </StyledBox>
  );
};

export default DayBox;
