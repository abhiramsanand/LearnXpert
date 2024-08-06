import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Button } from '@mui/material';
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
      label: 'Batch 1',
      data: [10, 20, 30],
      backgroundColor: 'purple',
    },
    {
      label: 'Batch 2',
      data: [15, 25, 20],
      backgroundColor: 'purple',
    },
    {
      label: 'Batch 3',
      data: [5, 30, 15],
      backgroundColor: 'purple',
    },
    {
      label: 'Batch 4',
      data: [12, 32, 18],
      backgroundColor: 'purple',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Trainees Progress Tracker',
    },
  },
};

interface ProgressTrackerProps {
  selectedBatch: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ selectedBatch }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} p={4} borderRadius={2} boxShadow={3}>
      <Box mt={4} width="100%">
        <Bar
          options={options}
          data={{
            labels: data.labels,
            datasets: [data.datasets[selectedBatch - 1]],
          }}
        />
      </Box>
      <Box mt={2} textAlign="right" width="100%">
        <Typography variant="body1" color="textSecondary">
          Behind 5%
        </Typography>
        <Typography variant="body1" color="textSecondary">
          On-Track 80%
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Ahead 15%
        </Typography>
      </Box>
      <Box mt={2} width="100%">
        <Button variant="text" sx={{ color: 'purple' }}>
          List Trainees
        </Button>
      </Box>
    </Box>
  );
};

export default ProgressTracker;
