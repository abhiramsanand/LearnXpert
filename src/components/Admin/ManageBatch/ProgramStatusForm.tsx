import React from 'react';
import BatchDetailsDisplay from './BatchDetailsDisplay'; // Adjust the import path as needed
import { BatchDetails } from '../ManageBatch/BatchDetails';
import { Box } from '@mui/material';

interface ProgramStatusFormProps {
  batchDetails: BatchDetails; // Expecting non-null BatchDetails object
}

const ProgramStatusForm: React.FC<ProgramStatusFormProps> = ({ batchDetails }) => {
  return (
    <Box sx={{ marginTop: '5px' }}>
      <BatchDetailsDisplay batchDetails={batchDetails} />
    </Box>
  );
};

export default ProgramStatusForm;
