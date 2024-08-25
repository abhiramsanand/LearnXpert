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
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (selectedBatch) {
      setLoading(true); // Set loading to true when starting to fetch data
      let interval: NodeJS.Timeout;

      fetch(`http://localhost:8080/api/v1/accelerated?batchId=${selectedBatch}`)
        .then((response) => response.json())
        .then((data) => {
          // Round the percentage value to the nearest integer
          const roundedPercentage = Math.round(data.percentage);
          setSpeedPercentage(roundedPercentage);
          setLoading(false); // Set loading to false once data is fetched
          setProgress(100); // Ensure progress reaches 100% at the end
          if (interval) clearInterval(interval);
        })
        .catch((error) => {
          console.error("Error fetching percentage data:", error);
          setLoading(false); // Set loading to false in case of error
          if (interval) clearInterval(interval);
        });

      // Simulate progress increment for the loader
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return Math.min(prev + 2, 100); // Increment progress
          }
          clearInterval(interval);
          return prev;
        });
      }, 30); // Adjust interval time for smoother/faster progress
    }
  }, [selectedBatch]);

  const data = {
    datasets: [
      {
        label: "Percentage",
        data: [speedPercentage, 100 - speedPercentage],
        backgroundColor: ["#8061C3", "#ffffff"],
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
      boxShadow={3}
      height="190px"
      width="27%"
      position="relative"
    >
      {loading ? (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            paddingX="60px"
            flexDirection="column"
          >
            <Typography
              sx={{
                fontSize: "15px",
                color: "#8061C3",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                position: "relative",
              }}
            >
              <span className="loading-dots">Loading</span>
            </Typography>
            <style>
              {`
                .loading-dots::after {
                  content: '...';
                  animation: dots 1.5s infinite step-start;
                }
                @keyframes dots {
                  0%, 20% {
                    opacity: 0;
                  }
                  20%, 40% {
                    opacity: 1;
                  }
                  40%, 60% {
                    opacity: 0;
                  }
                  60%, 80% {
                    opacity: 1;
                  }
                  80%, 100% {
                    opacity: 0;
                  }
                }
              `}
            </style>
            <Box
              width="100%"
              height="10px"
              marginTop="10px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "2px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#8061C3",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transition: "width 0.3s ease",
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
        </>
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
