import React from 'react';
import { Box, TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';

interface ProgramStatusFormProps {
  batchDetails: {
    program: string;
    status: boolean;
    batchName: string;
    startDate: string;
    noOfTrainees: number;
    endDate: string;
  };
}

const ProgramStatusForm: React.FC<ProgramStatusFormProps> = ({ batchDetails }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mb: 2 }}>
      <TextField
        select
        label="Program"
        value={batchDetails.program}
        fullWidth
        sx={{ height: '30px' }}
      >
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="BA">BA</MenuItem>
      </TextField>
      <FormControlLabel
        control={<Switch checked={batchDetails.status} size="small" />}
        label="Active"
        sx={{ alignSelf: 'center' }}
      />
      <TextField
        label="Batch Name"
        value={batchDetails.batchName}
        fullWidth
        sx={{ height: '30px' }}
      />
      <TextField
        label="Start Date"
        value={batchDetails.startDate}
        fullWidth
        sx={{ height: '30px' }}
      />
      <TextField
        label="No of Trainees"
        value={batchDetails.noOfTrainees}
        fullWidth
        sx={{ height: '30px' }}
      />
      <TextField
        label="End Date"
        value={batchDetails.endDate}
        fullWidth
        sx={{ height: '30px' }}
      />
    </Box>
  );
};

export default ProgramStatusForm;
