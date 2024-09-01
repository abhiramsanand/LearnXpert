import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import Report from "../../components/Admin/DailyReport/Report";

const DailyReportViewPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the time as needed for loading

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      {/* Heading */}
      <Box sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <Typography
          align="center"
          sx={{
            color: "#8061C3",
            mb: 2,
            mt: "-35px",
            ml: "-3",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          DAILY REPORTS
        </Typography>
      </Box>

      <Box>
        <Report />
      </Box>
    </Container>
  );
};

export default DailyReportViewPage;
