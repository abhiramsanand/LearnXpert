import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Button } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface HigherSpeedProps {
  selectedBatch: number;
}

const DailyReportTrack: React.FC<HigherSpeedProps> = ({ selectedBatch }) => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(70);

  useEffect(() => {
    if (selectedBatch) {
      fetch(`http://localhost:8080/api/v1/reports?batchId=${selectedBatch}`)
        .then((response) => response.json())
        .then((data) => {
          setSpeedPercentage(data.percentage);
        })
        .catch((error) => {
          console.error('Error fetching percentage data:', error);
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
    cutout: '70%',
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
          Pending Daily Reports
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "black" }}>
          {speedPercentage}%
        </Typography>
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

export default DailyReportTrack;
