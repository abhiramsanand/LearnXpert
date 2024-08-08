import { Box, Typography } from "@mui/material";
import BatchSelect from "../../components/Admin/Homepage/BatchSelect";
import ProgressTracker from "../../components/Admin/Homepage/ProgressTracker";
import { useState } from "react";
import HigherSpeed from "../../components/Admin/Homepage/HigherSpeed";
import DailyReportTrack from "../../components/Admin/Homepage/DailyReportTrack";
import PercipioAssessment from "../../components/Admin/Homepage/PercipioAssessment";

const AdminHomePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <BatchSelect
        selectedBatch={selectedBatch}
        onBatchSelect={setSelectedBatch}
      />
      <Typography sx={{ fontSize: "17px", color: "#8518FF", mt: "10px" }}>
        BATCH’S SCHEDULED TRAINING DAY - 10
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="20px"
        marginTop="10px"
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
      </Box>
    </Box>
  );
};

export default AdminHomePage;
