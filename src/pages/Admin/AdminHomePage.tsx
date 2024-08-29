import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings"; // Import Settings Icon
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ProgressTracker from "../../components/Admin/Homepage/ProgressTracker";
import DailyReportTrack from "../../components/Admin/Homepage/DailyReportTrack";
import PercipioAssessment from "../../components/Admin/Homepage/PercipioAssessment";
import ILPexAssessment from "../../components/Admin/Homepage/ILPexAssessment";
import AcceleratedTraineesTrack from "../../components/Admin/Homepage/AcceleratedTrainees";

// Assuming batch details are stored in JSON at this URL
const BATCH_DETAILS_URL = "http://localhost:8080/api/v1/batches";

const AdminHomePage = () => {
  const [batchDetails, setBatchDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await fetch(BATCH_DETAILS_URL);
        const data = await response.json();

        // Assuming you want to display the first batch from the data
        const batch = data[0]; // Adjust this if you want to fetch a specific batch

        setBatchDetails(batch);
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
    <Box display="flex" flexDirection="column" alignItems="center" position="relative">
      {/* Batch Details Box */}
      <Box
        position="absolute"
        top="0px"
        left="0px"
        sx={{
          borderRadius: "5px",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {batchDetails ? (
          <>
            <Typography sx={{ mr: 3 }}>{batchDetails.batchName}</Typography>
            <Typography sx={{ mr: 3 }}>Current Day: {batchDetails.dayNumber}</Typography>
            <Typography>Number of Trainees: {batchDetails.totalTrainees}</Typography>
          </>
        ) : (
          <Typography>No batch details available.</Typography>
        )}
      </Box>

      {/* Settings Icon with Label */}
      <Link to="/Admin-ManageBatch/15" style={{ textDecoration: "none" }}>
        <Box
          position="absolute"
          top="0px"
          right="0px"
          display="flex"
          alignItems="center"
          zIndex={10}
        >
          <IconButton aria-label="Manage Batch" sx={{ marginRight: "5px", color: "#8061C3" }}>
            <SettingsIcon />
          </IconButton>
          <Typography sx={{ color: "#8061C3", fontWeight: "bold" }}>Manage Batch</Typography>
        </Box>
      </Link>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        mt="30px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="20px"
          marginTop="20px"
        >
          <ProgressTracker />
          <DailyReportTrack />
          <AcceleratedTraineesTrack />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginTop="10px"
          gap="30px"
        >
          <PercipioAssessment selectedBatch={null} />
          <ILPexAssessment selectedBatch={null} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomePage;
