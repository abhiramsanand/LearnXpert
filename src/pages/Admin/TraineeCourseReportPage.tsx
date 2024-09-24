import React, { useState, useEffect } from 'react';
import TraineeCourseReport from '../../components/Admin/TraineeCourseReport/TraineeCourseReport';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import { Box, Typography } from '@mui/material';

const TraineeCourseReportPage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(3); // Default batch ID
  const [loading, setLoading] = useState(true);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate a 1-second loading time
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
        sx={{
          backgroundColor: "#F1EDEE",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <BatchSelect
        selectedBatch={selectedBatch}
        onBatchSelect={handleBatchSelect}
      />
      <TraineeCourseReport batchId={selectedBatch} />
    </div>
  );
};

export default TraineeCourseReportPage;
