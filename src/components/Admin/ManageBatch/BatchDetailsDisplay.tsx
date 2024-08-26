import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { BatchDetails } from '../ManageBatch/BatchDetails';

interface BatchDetailsDisplayProps {
  batchDetails: BatchDetails;
}

const BatchDetailsDisplay: React.FC<BatchDetailsDisplayProps> = ({ batchDetails }) => {
  return (
    <Box sx={{ padding: '10px', maxHeight: '100vh', overflow: 'auto' ,marginTop:'2px'}}>
      {/* <Typography variant="h6" gutterBottom sx={{ fontSize: '24px', marginBottom: '16px' }}>
        Manage Batch: {batchDetails.batchName}
      </Typography> */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Program Name:</strong> {batchDetails.programName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Batch Name:</strong> {batchDetails.batchName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>Start Date:</strong> {new Date(batchDetails.startDate).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1"><strong>End Date:</strong> {new Date(batchDetails.endDate).toLocaleDateString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Active:</strong> 
            {batchDetails.active ? (
              <CheckCircleIcon sx={{ color: 'green', fontSize: 24, marginLeft: '8px' }} />
            ) : (
              <CancelIcon sx={{ color: 'red', fontSize: 24, marginLeft: '8px' }} />
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Number of Trainees:</strong> {batchDetails.numberOfTrainees}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BatchDetailsDisplay;
