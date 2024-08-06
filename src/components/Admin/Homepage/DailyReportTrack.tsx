/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const batchData: Record<number, number> = {
      1: 80,
      2: 90,
      3: 50,
      4: 100,
    };
    setSpeedPercentage(batchData[selectedBatch] || 70);
  }, [selectedBatch]);

  const data = {
    labels: ['Daily Report'],
    datasets: [
      {
        label: 'Percentage',
        data: [speedPercentage, 100 - speedPercentage],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} p={4} borderRadius={2} boxShadow={3}>
      <Box mt={4} width="100%">
        <Doughnut data={data} options={options} />
      </Box>
      <Box mt={2} position="absolute">
        <Typography variant="h6">Daily Report</Typography>
        <Typography variant="h4" fontWeight="bold">{speedPercentage}%</Typography>
      </Box>
      <Box mt={2} width="100%" textAlign="right">
        <Button variant="text" sx={{ color: 'purple' }}>
          List Trainees
        </Button>
      </Box>
    </Box>
  );
};

export default DailyReportTrack;
