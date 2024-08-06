import { Box } from "@mui/material";
import BatchSelect from "../../components/Admin/Homepage/BatchSelect";
import ProgressTracker from "../../components/Admin/Homepage/ProgressTracker";
import { useState } from "react";
import HigherSpeed from "../../components/Admin/Homepage/HigherSpeed";
import DailyReportTrack from "../../components/Admin/Homepage/DailyReportTrack";

const AdminHomePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <BatchSelect
        selectedBatch={selectedBatch}
        onBatchSelect={setSelectedBatch}
      />
      <Box display="flex" flexDirection="row" alignItems="center">
        <ProgressTracker selectedBatch={selectedBatch} />
        <HigherSpeed selectedBatch={selectedBatch} />
        <DailyReportTrack selectedBatch={selectedBatch} />
      </Box>
    </Box>
  );
};

export default AdminHomePage;
