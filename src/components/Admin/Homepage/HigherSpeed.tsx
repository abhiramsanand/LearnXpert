/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Button, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface HigherSpeedProps {
  selectedBatch: number;
}

const HigherSpeed: React.FC<HigherSpeedProps> = ({ selectedBatch }) => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(70);

  useEffect(() => {
    const batchData: Record<number, number> = {
      1: 70,
      2: 60,
      3: 50,
      4: 40,
    };
    setSpeedPercentage(batchData[selectedBatch] || 70);
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
    >
      <Box width="100%" height="70%">
        <Doughnut data={data} options={options} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "7px", color: "#000000" }}>
          Trainee Days Completed
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "black" }}>{speedPercentage}%</Typography>
      </Box>
      <Box width="100%" height="0%" display="flex" justifyContent="flex-end">
        <Button
          variant="text"
          sx={{
            color: "#8061C3",
            fontSize: "10px",
            textDecoration: "underline",
            mt: 1
          }}
        >
          List Trainees
        </Button>
      </Box>
    </Box>
  );
};

export default HigherSpeed;
