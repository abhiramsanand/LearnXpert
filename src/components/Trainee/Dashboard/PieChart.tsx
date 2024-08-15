/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement);

const PieChart: React.FC<{ data: any; options: any }> = ({ data, options }) => {
  return (
    <Box
      sx={{
        height: "150px",
        width: "100%",
        boxShadow: "0px 4px 8px rgba(128, 97, 195, 0.25)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: '10px',
        px: '25px'
      }}
    >
      <Pie data={data} options={options} />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: 'center',
          mt: 3
        }}
      >
        <Typography sx={{ fontSize: "7px", color: "#737373" }}>
          Trainee Days Completed
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "black" }}>72%</Typography>
      </Box>
    </Box>
  );
};

export default PieChart;
