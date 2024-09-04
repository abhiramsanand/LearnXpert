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

  // Function to convert various "h m s" formats to minutes
  const convertToSeconds = (duration: string) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // Regular expression to extract hours, minutes, and seconds
    const durationRegex = /(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/;
    const match = duration.match(durationRegex);

    if (match) {
      hours = parseInt(match[1] || "0", 10);
      minutes = parseInt(match[2] || "0", 10);
      seconds = parseInt(match[3] || "0", 10);
    }

    // Calculate total seconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  };

  useEffect(() => {
    const fetchData = async () => {
      const traineeId = localStorage.getItem("traineeId");
      const courseDate = selectedDate; // Use the selectedDate directly in the API endpoint
      const url = `http://localhost:8080/api/courses/coursesWithProgress?batchId=15&traineeId=${traineeId}&courseDate=${courseDate}`;

      try {
        const response = await fetch(url);
        const result = await response.json();

        const labels = result.map((_, index: number) => `C${index + 1}`); // C1, C2, etc.
        const courseNames = result.map((item: any) => item.courseName); // Full course names
        const traineeData = result.map((item: any) => item.duration); // Trainee watch time (in minutes)
        const actualData = result.map((item: any) =>
          convertToSeconds(item.courseDuration)
        ); // Convert courseDuration to minutes

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
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
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
