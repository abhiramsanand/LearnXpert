import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Trainees Progress Tracker',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
    y: {
      grid: {
        display: true,
        borderColor: '#000000',
      },
      ticks: {
        display: true,
      },
    },
  },
  barThickness: 20,
};

interface ProgressTrackerProps {
  selectedBatch: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ selectedBatch }) => {
  const [progressData, setProgressData] = useState({ behind: 0, onTrack: 0, ahead: 0 });

  useEffect(() => {
    // Fetch data from the API based on the selected batch
    fetch(`http://localhost:8080/api/v1/ilpex/traineeprogress/status?batchId=${selectedBatch}`)
      .then(response => response.json())
      .then(data => {
        setProgressData(data);
      })
      .catch(error => {
        console.error('Error fetching progress data:', error);
      });
  }, [selectedBatch]);

  const data = {
    labels: ['Behind', 'Ontrack', 'Ahead'],
    datasets: [
      {
        data: [progressData.behind, progressData.onTrack, progressData.ahead],
        backgroundColor: '#8061C3',
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow={3}
      height="190px"
      alignContent="center"
    >
      <Box width="100%" height="90%" sx={{ px: '45px' }}>
        <Bar options={options} data={data} />
      </Box>
      <Box
        width="100%"
        height="10%"
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="text"
          sx={{
            color: '#8061C3',
            fontSize: '10px',
            textDecoration: 'underline',
          }}
        >
          List Trainees
        </Button>
      </Box>
    </Box>
  );
};

export default ProgressTracker;
