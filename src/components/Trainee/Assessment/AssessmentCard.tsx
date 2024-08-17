import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
 
interface AssessmentCardProps {
  title: string;
  description: string;
  date?: string;
  dateLabel?: string; // Added this prop for date label (either "Date of Submission" or "Due Date")
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
  return (
    <StyledCard>
      <IconWrapper>
        <LibraryBooksIcon fontSize="large" />
      </IconWrapper>
      <StyledCardContent>
        <StyledTypography variant="h6">{title}</StyledTypography>
        <StyledTypography variant="body2">{description}</StyledTypography>
        {date && <StyledTypography variant="body2">{dateLabel}: {date}</StyledTypography>}
        {score !== undefined && <StyledTypography variant="body2">Score: {score}</StyledTypography>}
      </StyledCardContent>
    </StyledCard>
  );
};
 
export default AssessmentCard;