import { Box } from "@mui/material";
import BatchSelect from "../../shared components/Admin/BatchSelect";
import ProgressTracker from "../../components/Admin/Homepage/ProgressTracker";
import { useState } from "react";
import HigherSpeed from "../../components/Admin/Homepage/HigherSpeed";
import DailyReportTrack from "../../components/Admin/Homepage/DailyReportTrack";
import PercipioAssessment from "../../components/Admin/Homepage/PercipioAssessment";
import ILPexAssessment from "../../components/Admin/Homepage/ILPexAssessment";

const AdminHomePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
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
