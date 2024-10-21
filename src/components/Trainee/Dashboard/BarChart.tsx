/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState<any>({
    labels: ["C1", "C2", "C3", "C4", "C5", "C6", "C7"], // Default labels
    datasets: [
      {
        label: "Actual Watch Time",
        backgroundColor: "#DB5461",
        data: [],
        borderRadius: 30,
        barThickness: 20,
      },
      {
        label: "Trainee Watch Time",
        backgroundColor: "#5B8C5A",
        data: [],
        borderRadius: 30,
        barThickness: 20,
      },
    ],
  });

  const [courseNames, setCourseNames] = useState<string[]>([]); // To store course names for tooltips

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  useEffect(() => {
    const fetchData = async () => {
      const traineeId = localStorage.getItem("traineeId");
      const courseDate = `${selectedDate} 00:00:00`;
      const url = `https://ilpex-backend.onrender.com/api/v1/ilpex/traineeprogress/actualVsEstimateDuration?courseDate=${courseDate}&traineeId=${traineeId}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        const labels = result.map((_: any, index: number) => `C${index + 1}`); // C1, C2, etc.
        const courseNames = result.map((item: any) => item.courseName); // Full course names

        // Convert seconds to hours with one decimal place
        const traineeData = result.map((item: any) =>
          (item.duration / 3600).toFixed(1)
        );
        const actualData = result.map((item: any) =>
          (item.estimatedDuration / 3600).toFixed(1)
        );

        setCourseNames(courseNames); // Store course names for tooltips

        setData({
          labels,
          datasets: [
            {
              label: "Expected Watch Time",
              backgroundColor: "#DB5461",
              data: actualData,
              borderRadius: 30,
              barThickness: 20,
            },
            {
              label: "Trainee Watch Time",
              backgroundColor: "#5B8C5A",
              data: traineeData,
              borderRadius: 30,
              barThickness: 20,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

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
        ticks: {
          callback: function (value: any) {
            return `${value}h`; // Format y-axis labels to show hours
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Specify a valid position value
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            return courseNames[index]; // Display courseName on hover
          },
          label: (tooltipItem: any) => {
            return `${tooltipItem.raw}h`; // Show hours in tooltip
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
          Expected Watch Time VS Trainee Watch Time
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
