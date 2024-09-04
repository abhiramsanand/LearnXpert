import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

interface ReportModalComponentProps {
  open: boolean;
  onClose: () => void;
  report: Report;
  onPrevious: () => void;
  onNext: () => void;
}

const ReportModalComponent: React.FC<ReportModalComponentProps> = ({
  open,
  onClose,
  report,
  onPrevious,
  onNext,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 6,
          width: "90%",
          maxWidth: 800,
          p: 3,
          position: "relative",
          maxHeight: "85vh",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{ position: "absolute", top: 16, right: 16, color: "#DB5461" }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            color: "#8061C3",
            textTransform: "uppercase",
          }}
        >
          {report.course}
        </Typography>

        {/* Content Sections */}
        <Box sx={{ mt: 2 }}>
          {/* Key Learnings Section */}
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#8061C3",
              padding: 1,
              color: "white",
              textAlign: "center",
              borderRadius: 1,
              mb: 1,
            }}
          >
            Key Learnings
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#f7f7f7",
              padding: 2,
              borderRadius: 2,
              textAlign: "left",
              border: "1px solid #E0E0E0",
              fontSize: "1rem",
              mb: 3,
            }}
          >
            {report.keyLearnings}
          </Typography>

          {/* Plan for Tomorrow Section */}
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#8061C3",
              padding: 1,
              color: "white",
              textAlign: "center",
              borderRadius: 1,
              mb: 1,
            }}
          >
            Plan for Tomorrow
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#f7f7f7",
              padding: 2,
              borderRadius: 2,
              textAlign: "left",
              border: "1px solid #E0E0E0",
              fontSize: "1rem",
            }}
          >
            {report.planForTomorrow}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReportModalComponent;
