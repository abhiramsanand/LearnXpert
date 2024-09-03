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
        label: "Actual Watch Time",
        backgroundColor: "#DB5461",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderRadius: 30,
        barThickness: 20, // Reduced bar thickness
      },
      {
        label: "Trainee Watch Time",
        backgroundColor: "#5B8C5A",
        data: [28, 48, 40, 19, 86, 27, 90],
        borderRadius: 30,
        barThickness: 20, // Reduced bar thickness
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
        display: true, // Display legend
        position: "top", // Position legend at the top
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: "230px",
        width: "770px",
        mt: 1,
        boxShadow: "0px 4px 8px rgba(128, 97, 195, 0.25)",
        borderRadius: "8px",
        p: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "15px" }}>
          Actual Watch Time VS Trainee Watch Time
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
