import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AssessmentScoreTrackILPex: React.FC = () => {
  const [averageScore, setAverageScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cacheKey = "IlpexassessmentScoreTrack";
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    const traineeId = localStorage.getItem("traineeId");
    if (!traineeId) {
      console.error("No traineeId found in localStorage");
      setLoading(false);
      return;
    }

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 0 * 60 * 1000; // 1 hour

      if (now - parseInt(cachedTimestamp) < oneHour) {
        const { averageScore } = JSON.parse(cachedData);
        setAverageScore(Math.round(averageScore)); // Round to nearest integer
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    fetch(`https://ilpex-backend.onrender.com/api/v1/trainees/${traineeId}/average-score`)
      .then((response) => response.json())
      .then((data) => {
        const roundedScore = Math.round(data.averageScore); // Round to nearest integer
        setAverageScore(roundedScore);

        // Cache the data
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ averageScore: roundedScore })
        );
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assessment score data:", error);
        setLoading(false);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: "Average Assessment Score",
        data: [averageScore, 100 - averageScore],
        backgroundColor: ["#5B8C5A", "#EDF3ED"],
        borderColor: ["rgba(128, 97, 195, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
        height="120px"
        width="30%"
        position="relative"
        gap="15px"
        sx={{
          overflow: "hidden",
          borderRadius: "5px",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            paddingX="100px"
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "200px",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(128, 97, 195, 0.3), transparent)",
                animation: "slide 1.5s infinite",
              }}
            />
            <style>
              {`
              @keyframes slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              `}
            </style>
          </Box>
        ) : (
          <>
            <Typography sx={{ color: "#8061C3", fontSize: "12px" }}>
              Average ILPex Assessment Score
            </Typography>
            <Box width="250px" height="70%" mt={-1}>
              <Doughnut data={data} options={options} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                {averageScore}%
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AssessmentScoreTrackILPex;
