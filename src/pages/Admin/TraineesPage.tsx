import React, { useState, useEffect } from "react";
import BatchSelect from "../../shared components/Admin/BatchSelect";
import TraineeTable from "../../components/Admin/AdminTrainees/TraineeTable";
import { Box, Container, Typography } from "@mui/material";

const TraineesPage: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for API requests)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false when the page is ready
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
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
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4, mt: 2 }}>
        <BatchSelect
          selectedBatch={selectedBatch}
          onBatchSelect={handleBatchSelect}
        />
      </Box>
      <TraineeTable selectedBatch={selectedBatch} />
    </Container>
  );
};

export default TraineesPage;
