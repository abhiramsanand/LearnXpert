import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Button, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface HigherSpeedProps {
  selectedBatch: number;
}

const HigherSpeed: React.FC<HigherSpeedProps> = ({ selectedBatch }) => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedBatch) {
      const cacheKey = `higherSpeed_${selectedBatch}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        const fiveMinutes = 60 * 60 * 1000;

        if (now - parseInt(cachedTimestamp) < fiveMinutes) {
          setSpeedPercentage(parseInt(cachedData));
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      fetch(`http://localhost:8080/api/v1/accelerated?batchId=${selectedBatch}`)
        .then((response) => response.json())
        .then((data) => {
          const roundedPercentage = Math.round(data.percentage);
          setSpeedPercentage(roundedPercentage);
          localStorage.setItem(cacheKey, roundedPercentage.toString());
          localStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching percentage data:", error);
          setLoading(false);
        });
    }
  }, [selectedBatch]);

  const data = {
    datasets: [
      {
        label: "Percentage",
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
      width="27%"
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
              width: "100%",
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
          <Box width="100%" height="70%">
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
              Accelerated Trainees
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
            <Button
              variant="text"
              sx={{
                color: "#8061C3",
                fontSize: "10px",
                textDecoration: "underline",
                mt: 1,
              }}
            >
              List Trainees
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HigherSpeed;
