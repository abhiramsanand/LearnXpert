import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DaysComplete: React.FC = () => {
  const [percentageCompleted, setPercentageCompleted] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cacheKey = "dayscomplete";
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
    const traineeId = localStorage.getItem("traineeId"); // Retrieve traineeId from local storage

    if (!traineeId) {
      console.error("Trainee ID not found in local storage");
      return;
    }

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 0 * 60 * 60 * 1000; // 1 hour

      if (now - parseInt(cachedTimestamp) < oneHour) {
        const { percentageCompleted } = JSON.parse(cachedData);
        setPercentageCompleted(percentageCompleted); // Use cached percentage
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    const url = `http://localhost:8080/api/v1/ilpex/traineeprogress/currentdaynumber/${traineeId}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const totalDays = 22;
        const lastDayNumber = data.lastDayNumber;
        const percentage = Math.round((lastDayNumber / totalDays) * 100);
        setPercentageCompleted(percentage);

        // Cache the data
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ percentageCompleted: percentage })
        );
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assessment progress data:", error);
        setLoading(false);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: "Training Days Completed",
        data: [percentageCompleted, 100 - percentageCompleted],
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
              background:
                "linear-gradient(90deg, transparent, rgba(128, 97, 195, 0.3), transparent)",
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
            Percentage of Training Completed
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
              {percentageCompleted}%
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DaysComplete;
