import React from 'react';
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

const data = {
  labels: ['Behind', 'Ontrack', 'Ahead'],
  datasets: [
    {
      data: [10, 20, 40],
      backgroundColor: '#8518FF',
    },
    {
      data: [15, 25, 20],
      backgroundColor: '#8518FF',
    },
    {
      data: [5, 40, 15],
      backgroundColor: '#8518FF',
    },
    {
      data: [12, 32, 18],
      backgroundColor: '#8518FF',
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
        borderColor: '#e0e0e0', 
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
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      boxShadow={3}
      height="170px"
    >
      <Box width="100%" height="90%">
        <Bar
          options={options}
          data={{
            labels: data.labels,
            datasets: [data.datasets[selectedBatch - 1]],
          }}
        />
      </Box>
      <Box width="100%" height="10%" display="flex" justifyContent="flex-end">
        <Button variant="text" sx={{ color: '#8518FF', fontSize: '10px', textDecoration: 'underline' }}>
          List Trainees
        </Button>
      </Box>
    </Box>
  );
};

export default ProgressTracker;
