import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, Button } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AcceleratedTraineesTrack: React.FC = () => {
  const [speedData, setSpeedData] = useState<{ [key: string]: number }>({
    "1x": 0,
    "1.25x": 0,
    "1.5x": 0,
    "2x": 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cacheKey = `acceleratedTraineesTrack_allBatches`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 0 * 60 * 1000;

      if (now - parseInt(cachedTimestamp) < oneHour) {
        setSpeedData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    fetch("/AcceleratedTrainees.json")
      .then((response) => response.json())
      .then((traineeData) => {
        const speedCounts = {
          "1x": 0,
          "1.25x": 0,
          "1.5x": 0,
          "2x": 0,
        };

        traineeData.forEach((trainee: any) => {
          const { totalCourseDuration, traineeWatchTime } = trainee;
          const watchTimeRatio = totalCourseDuration / traineeWatchTime;

          if (watchTimeRatio >= 1 && watchTimeRatio < 1.2) speedCounts["1x"] += 1;
          else if (watchTimeRatio >= 1.2 && watchTimeRatio < 1.35) speedCounts["1.25x"] += 1;
          else if (watchTimeRatio >= 1.35 && watchTimeRatio < 1.75) speedCounts["1.5x"] += 1;
          else if (watchTimeRatio >= 1.75) speedCounts["2x"] += 1;
        });

        const totalTrainees = traineeData.length;

        setSpeedData({
          "1x": (speedCounts["1x"] / totalTrainees) * 100,
          "1.25x": (speedCounts["1.25x"] / totalTrainees) * 100,
          "1.5x": (speedCounts["1.5x"] / totalTrainees) * 100,
          "2x": (speedCounts["2x"] / totalTrainees) * 100,
        });

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(speedData));
        localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accelerated trainee data:", error);
        setLoading(false);
      });
  }, []);

  const data = {
    labels: ["1x", "1.25x", "1.5x", "2x"],
    datasets: [
      {
        label: "Percentage of Trainees by Speed",
        data: Object.values(speedData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
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

  const colorLabels = [
    { label: "1x", color: "#FF6384" },
    { label: "1.25x", color: "#36A2EB" },
    { label: "1.5x", color: "#FFCE56" },
    { label: "2x", color: "#4BC0C0" },
  ];

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.2)"
      height="190px"
      width="80%" // Adjusted width here
      position="relative"
      sx={{
        overflow: "hidden",
        borderRadius: "5px",
        transition: "transform 0.3s ease-in-out",
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
          width="100%"
          sx={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100px",
              height: "100%",
              background: `linear-gradient(90deg, transparent, rgba(128, 97, 195, 0.3), transparent)`,
              animation: "slide 1.5s infinite",
            }}
          />
          <style>
            {`
              @keyframes slide {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
            `}
          </style>
        </Box>
      ) : (
        <>
          <Box
            width="40%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography sx={{ fontSize: "7px", color: "#000000" }}>
              Trainees Watching at Accelerated Speeds
            </Typography>
            <Typography sx={{ fontSize: "15px", color: "black" }}>
              {Math.round(speedData["1x"])}% - 1x
              <br />
              {Math.round(speedData["1.25x"])}% - 1.25x
              <br />
              {Math.round(speedData["1.5x"])}% - 1.5x
              <br />
              {Math.round(speedData["2x"])}% - 2x
            </Typography>
          </Box>
          <Box
            width="30%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Doughnut data={data} options={options} />
          </Box>
          <Box
            width="30%"
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="center"
            paddingRight="10px"
          >
            {colorLabels.map(({ label, color }) => (
              <Box key={label} display="flex" alignItems="center" mb={1}>
                <Box
                  width="15px"
                  height="15px"
                  bgcolor={color}
                  borderRadius="50%"
                  mr={1}
                />
                <Typography sx={{ fontSize: "12px", color: "#000000" }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default AcceleratedTraineesTrack;
