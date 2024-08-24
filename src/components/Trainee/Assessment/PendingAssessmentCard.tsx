import React from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface PendingAssessmentCardProps {
  onClick: () => void;
  isSelected: boolean; // Add isSelected prop
}

const StyledCard = styled(Card)(({ isSelected }: { isSelected: boolean }) => ({
  marginBottom: '24px',
  marginTop: '20px',
  height:'12%',
  borderLeft: isSelected ? '10px solid #8061C3' : '5px solid transparent', // Change color and add border
}));

const PendingAssessmentCard: React.FC<PendingAssessmentCardProps> = ({ onClick, isSelected }) => {
  return (
    <StyledCard onClick={onClick} isSelected={isSelected}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">Pending Assessments</Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default PendingAssessmentCard;
