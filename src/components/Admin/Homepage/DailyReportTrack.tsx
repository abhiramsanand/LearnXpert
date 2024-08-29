/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, Button } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DailyReportTrack: React.FC = () => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cacheKey = `dailyReportTrack_allBatches`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 0 * 60 * 1000;

      if (now - parseInt(cachedTimestamp) < oneHour) {
        const { percentage } = JSON.parse(cachedData);
        setSpeedPercentage(percentage);
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    fetch("/DailyReport.json") 
      .then((response) => response.json())
      .then((traineeData) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        const notSubmittedCount = traineeData.filter((trainee: any) => {
          return trainee.lastSubmittedDate !== yesterdayString;
        }).length;

        const totalTrainees = traineeData.length;

        const percentage = (notSubmittedCount / totalTrainees) * 100;

        setSpeedPercentage(Math.round(percentage));

        // Cache the data
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ percentage: Math.round(percentage) })
        );
        localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trainee data:", error);
        setLoading(false);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: "Percentage of Trainees Behind",
        data: [speedPercentage, 100 - speedPercentage],
        backgroundColor: ["#8061C3", "#F0EAFD"],
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
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.2)"
      height="190px"
      width="40%"
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
          paddingX="100px"
          sx={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "200px",
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
          <Box width="250px" height="70%">
            <Doughnut data={data} options={options} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "7px", color: "#000000" }}>
              Pending Daily Reports
            </Typography>
            <Typography sx={{ fontSize: "20px", color: "black" }}>
              {speedPercentage}%
            </Typography>
          </Box>
          <Box
            width="100%"
            height="0%"
            display="flex"
            justifyContent="flex-end"
          >
          </Box>
        </>
      )}
    </Box>
  );
};

export default DailyReportTrack;
