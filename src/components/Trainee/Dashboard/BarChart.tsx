import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, TextField, Typography } from "@mui/material";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart: React.FC = () => {
  const data = {
    labels: ["C1", "C2", "C3", "C4", "C5", "C6", "C7"],
    datasets: [
      {
        backgroundColor: "#BFAFE0",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderRadius: 30,
      },
      {
        backgroundColor: "rgba(128, 97, 195, 1)",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderRadius: 30,
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Box
      sx={{
        height: "300px",
        width: "100%",
        boxShadow: "0px 4px 8px rgba(128, 97, 195, 0.25)",
        borderRadius: "8px",
        p: 4,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography sx={{ fontSize: "15px", mr: 4 }}>
          <span style={{ color: "#BFAFE0" }}>
            Actual Watch Time
          </span>{" "}
          VS{" "}
          <span style={{ color: "rgba(128, 97, 195, 1)" }}>
            Trainee Watch Time
          </span>
        </Typography>

        <TextField
          id="date"
          label="Select Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            width: "150px",
            "& .MuiInputBase-root": {
              height: "20px",
              fontSize: "10px",
            },
            "& .MuiFormLabel-root": {
              fontSize: "10px",
            },
          }}
        />
      </Box>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;
