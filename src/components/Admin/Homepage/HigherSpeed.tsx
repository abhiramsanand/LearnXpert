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
      setLoading(true); // Set loading to true when starting to fetch data
      fetch(`http://localhost:8080/api/v1/accelerated?batchId=${selectedBatch}`)
        .then((response) => response.json())
        .then((data) => {
          // Round the percentage value to the nearest integer
          const roundedPercentage = Math.round(data.percentage);
          setSpeedPercentage(roundedPercentage);
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching percentage data:", error);
          setLoading(false); // Set loading to false in case of error
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
      boxShadow={3}
      height="190px"
      width="27%"
      position="relative"
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          paddingX="60px"
        >
          <Box
            sx={{
              width: "50px",
              height: "50px",
              border: "5px solid #8061C3",
              borderRadius: "50%",
              borderTopColor: "transparent",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
              @keyframes spin {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
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
