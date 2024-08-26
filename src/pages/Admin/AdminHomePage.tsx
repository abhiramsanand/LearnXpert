import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import BatchSelect from "../../shared components/Admin/BatchSelect";
import ProgressTracker from "../../components/Admin/Homepage/ProgressTracker";
import HigherSpeed from "../../components/Admin/Homepage/HigherSpeed";
import DailyReportTrack from "../../components/Admin/Homepage/DailyReportTrack";
import PercipioAssessment from "../../components/Admin/Homepage/PercipioAssessment";
import ILPexAssessment from "../../components/Admin/Homepage/ILPexAssessment";

const AdminHomePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for API requests)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false when the page is ready
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
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
    >
      <BatchSelect
        selectedBatch={selectedBatch}
        onBatchSelect={setSelectedBatch}
      />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="20px"
        marginTop="20px"
      >
        <ProgressTracker selectedBatch={selectedBatch} />
        <HigherSpeed selectedBatch={selectedBatch} />
        <DailyReportTrack selectedBatch={selectedBatch} />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="20px"
        marginTop="10px"
      >
        <PercipioAssessment selectedBatch={selectedBatch} />
        <ILPexAssessment selectedBatch={selectedBatch} />
      </Box>
    </Box>
  );
};

export default AdminHomePage;
