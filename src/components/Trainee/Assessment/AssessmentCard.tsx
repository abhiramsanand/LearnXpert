import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { styled } from "@mui/system";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

interface AssessmentCardProps {
  title: string;
  description: string;
  date?: string;
  dateLabel?: string;
  score?: number;
  onClick: () => void; // Add onClick prop
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
  onClick,
}) => {
  return (
    <StyledCard>
      <CardActionArea onClick={onClick}>
        <IconWrapper>
          <LibraryBooksIcon fontSize="large" sx={{ color: "#8061C3" }} />
        </IconWrapper>
        <StyledCardContent>
          <StyledTypography variant="h6">{title}</StyledTypography>
          <StyledTypography variant="body2">{description}</StyledTypography>
          {date && (
            <StyledTypography variant="body2">
              {dateLabel}: {date}
            </StyledTypography>
          )}
          {score !== undefined && (
            <StyledTypography variant="body2">Score: {score}</StyledTypography>
          )}
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default AssessmentCard;
