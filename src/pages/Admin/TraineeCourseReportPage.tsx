import React, { useState, useEffect } from 'react';
import TraineeCourseReport from '../../components/Admin/TraineeCourseReport/TraineeCourseReport';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import { Box, Typography } from '@mui/material';

const TraineeCourseReportPage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null); // Initially no batch selected
  const [loading, setLoading] = useState(true);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  useEffect(() => {
    const fetchActiveBatch = async () => {
      try {
        const batches = await fetch('http://localhost:8080/api/v1/batches'); // Fetch all batches
        const batchData = await batches.json();

        const activeBatch = batchData.find((batch: { isActive: boolean }) => batch.isActive);

        if (!activeBatch) {
          console.error('No active batch found');
          return;
        }

        setSelectedBatch(activeBatch.id); // Set selected batch to active batch ID
      } catch (error) {
        console.error('Error fetching active batch:', error);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };

    fetchActiveBatch();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
        sx={{
          backgroundColor: '#F1EDEE',
        }}
      >
        <Typography
          sx={{
            fontSize: '30px',
            color: '#8061C3',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            animation: 'flip 1s infinite',
            '@keyframes flip': {
              '0%': { transform: 'rotateX(0)' },
              '50%': { transform: 'rotateX(180deg)' },
              '100%': { transform: 'rotateX(360deg)' },
            },
          }}
        >
          ILPex <span style={{ fontSize: '8px', marginLeft: '-8px' }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <BatchSelect
        selectedBatch={selectedBatch ?? 0} 
        onBatchSelect={handleBatchSelect}
      />
      {selectedBatch && <TraineeCourseReport batchId={selectedBatch} />}
    </div>
  );
};

export default TraineeCourseReportPage;
