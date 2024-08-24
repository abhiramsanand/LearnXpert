import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

interface AssessmentCardProps {
  title: string;
  description: string;
  date?: string;
  dateLabel?: string; // Optional prop for date label
  score?: number;
}

const StyledCard = styled(Card)({
  height: '120px', // Adjust the height as needed
  display: 'flex',
  alignItems: 'center',
  padding: '10px', // Add some padding to the card
});

const IconWrapper = styled('div')({
  marginRight: '10px', // Space between icon and text
});

const StyledCardContent = styled(CardContent)({
  padding: '6px', // Reduce padding
  '&:last-child': {
    paddingBottom: '8px',
  },
});

const StyledTypography = styled(Typography)({
  fontSize: '14px', // Adjust text size
});

const AssessmentCard: React.FC<AssessmentCardProps> = ({ title, description, date, dateLabel, score }) => {
  // Extract just the date part if date is provided
  const formattedDate = date ? date.split('T')[0] : ''; // Extract only the date part

  return (
    <StyledCard>
      <IconWrapper>
        <LibraryBooksIcon fontSize="large" style={{ color: '#8061C3' }} />
      </IconWrapper>
      <StyledCardContent>
        <StyledTypography variant="h6" style={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</StyledTypography>
        <StyledTypography variant="body2">{description}</StyledTypography>
        {/* Conditionally display "Due By: " for pending assessments */}
        {formattedDate && (
          <StyledTypography variant="body2">
            {description === 'Pending' ? `Due By: ${formattedDate}` : formattedDate}
          </StyledTypography>
        )}
        {score !== undefined && <StyledTypography variant="body2">Score: {score}</StyledTypography>}
      </StyledCardContent>
    </StyledCard>
  );
};

export default AssessmentCard;
