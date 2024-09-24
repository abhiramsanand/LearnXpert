import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BatchSelect from "../../shared components/Admin/BatchSelect";
import CourseContainer from "../../components/Admin/CourseView/CourseContainer";
import { Add } from "@mui/icons-material";

// Assume batch details URL or relevant API endpoint
const BATCH_DETAILS_URL = "http://localhost:8080/api/v1/batches";

const AdminCoursePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(3);
  const [loading, setLoading] = useState(true);
  const [batchDetails, setBatchDetails] = useState<any>(null);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await fetch(BATCH_DETAILS_URL);
        const data = await response.json();
        setBatchDetails(data[0]); // Example for setting batch details
      } catch (error) {
        console.error("Error fetching batch details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchDetails();
  }, []);

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Box mb={2} display="flex" justifyContent="space-between" width="100%">
        <BatchSelect
          selectedBatch={selectedBatch || 0}
          onBatchSelect={handleBatchSelect}
        />
        <Typography
          align="center"
          sx={{
            color: "#8061C3",
            mb: 2,
            ml: "-3",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          COURSES
        </Typography>
        <Link to="/Admin-CourseCreation">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#8061C3",
              "&:hover": {
                backgroundColor: "#6A529D",
              },
            }}
          >
            Add Course
          </Button>
        </Link>
      </Box>
      <CourseContainer selectedBatch={selectedBatch} />
    </Box>
  );
};

export default AdminCoursePage;
