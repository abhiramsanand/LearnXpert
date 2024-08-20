import React, { useState } from 'react';
import { Box } from '@mui/material';
import BatchSelect from '../../shared components/Admin/BatchSelect';
import AssessmentsTable from '../../components/Admin/AssessmentView/AssessmentTable';

const AssessmentsPage: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  return (
    <Box>
      <BatchSelect selectedBatch={selectedBatch} onBatchSelect={setSelectedBatch} />
      {selectedBatch !== 0 && <AssessmentsTable batchId={selectedBatch} />}
    </Box>
  );
};

export default AssessmentsPage;
