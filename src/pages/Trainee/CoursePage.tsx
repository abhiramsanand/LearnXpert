import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import CourseContainer from "../../components/Trainee/Course/CourseContainer";

const CoursePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const traineeId = parseInt(localStorage.getItem("traineeId") || "0", 10);

  useEffect(() => {
    // Simulate data fetching or component preparation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer
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
          ILPex{" "}
          <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mt: "15px",
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        PROGRESS
      </Typography>
      <CourseContainer traineeId={traineeId} />
    </div>
  );
};

export default CoursePage;
