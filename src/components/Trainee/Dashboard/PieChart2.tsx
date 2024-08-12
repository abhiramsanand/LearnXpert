/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement);

const PieChart2: React.FC<{ data: any; options: any }> = ({
  data,
  options,
}) => {
  return (
    <Box
      sx={{
        height: "150px",
        width: "100%",
        ml: 6,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        p: 4,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pie data={data} options={options} />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography sx={{ fontSize: "8px", color: "#737373" }}>
          Average Percipio <br /> Assessment Score
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "black" }}>90%</Typography>
      </Box>
    </Box>
  );
};

export default PieChart2;
