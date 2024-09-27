import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import dayjs from "dayjs"; // Import dayjs or another date formatting library
 
interface AssessmentCardProps {
  title: string;
  description: string;
  date?: string;
  dateLabel?: string;
  score?: number;
  correctAnswers?: number;  // Add correctAnswers
  incorrectAnswers?: number;
  
  onClick: () => void;
}
 
const StyledCard = styled(Card)({
  height: "120px",
  display: "flex",
  alignItems: "center",
  padding: "10px",
});
 
const IconWrapper = styled("div")({
  marginRight: "10px",
});
 
const StyledCardContent = styled(CardContent)({
  padding: "6px",
  "&:last-child": {
    paddingBottom: "8px",
  },
});
 
const StyledTypography = styled(Typography)({
  fontSize: "14px",
});
 
const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  description,
  date,
  dateLabel,
  score,
  correctAnswers,  // Destructure correctAnswers
  incorrectAnswers,
  onClick,
}) => {
  const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : ''; // Format the date to 'YYYY-MM-DD'
 
  return (
    <StyledCard>
      <CardActionArea onClick={onClick}>
        <IconWrapper>
          <LibraryBooksIcon fontSize="large" sx={{ color: "#8061C3" }} />
        </IconWrapper>
        <StyledCardContent>
          <StyledTypography variant="h6">{title}</StyledTypography>
          <StyledTypography variant="body2">{description}</StyledTypography>
          {formattedDate && (
            <StyledTypography variant="body2">
              {dateLabel}: {formattedDate}
            </StyledTypography>
          )}
          {score !== undefined && (
            <StyledTypography variant="body2">Score: {score}</StyledTypography>
          )}
           {correctAnswers !== undefined && incorrectAnswers !== undefined && (
            <StyledTypography variant="body2">
              Correct: {correctAnswers} | Incorrect: {incorrectAnswers}
            </StyledTypography>
          )}
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};
 
export default AssessmentCard;