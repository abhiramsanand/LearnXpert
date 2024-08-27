import React from "react";
import { Box, Typography, TextField, Button, Badge } from "@mui/material";
import DateSelector from "./DateSelector";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

interface HeaderSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  handleOpenPendingModal: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  onDateChange,
  handleOpenPendingModal,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewWholeReport = () => {
    navigate("../Trainee-Wholereport"); // Redirect to WholeReport page
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" sx={{ mt: 1 }} gutterBottom>
          Daily Report
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "200px",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 20,
              border: "2px solid #8061C3",
              height: "30px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <DateSelector selectedDate={selectedDate} onDateChange={onDateChange} />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#8061C3",
            textTransform: "none",
            height: "40px",
            borderRadius: "20px",
          }}
          onClick={handleViewWholeReport} // Attach the click handler
        >
          View Whole Report
        </Button>

        <Badge badgeContent={0} color="error">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8061C3",
              textTransform: "none",
              height: "40px",
              borderRadius: "20px",
            }}
            onClick={handleOpenPendingModal}
          >
            Pending Submissions
          </Button>
        </Badge>
      </Box>
    </>
  );
};

export default HeaderSection;
