import React, { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { BatchDetails } from '../ManageBatch/BatchDetails';

interface BatchDetailsDisplayProps {
  batchDetails: BatchDetails;
  onUpdate: (updatedDetails: BatchDetails) => void;
}

const BatchDetailsDisplay: React.FC<BatchDetailsDisplayProps> = ({ batchDetails, onUpdate }) => {
  const [editableBatchDetails, setEditableBatchDetails] = useState<BatchDetails>(batchDetails);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableBatchDetails({
      ...editableBatchDetails,
      [name]: value
    });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableBatchDetails({
      ...editableBatchDetails,
      [name]: new Date(value)
    });
  };

  const handleBlur = () => {
    onUpdate(editableBatchDetails);
  };

  return (
    <Box sx={{ padding: '10px', maxHeight: '100vh', overflow: 'auto', marginTop: '2px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Program Name"
            name="programName"
            value={editableBatchDetails.programName}
            fullWidth
            variant="outlined"
            margin="normal"
            InputProps={{ readOnly: true }} // Make the field read-only
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Batch Name"
            name="batchName"
            value={editableBatchDetails.batchName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={new Date(editableBatchDetails.startDate).toISOString().split('T')[0]}
            onChange={handleDateChange}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={new Date(editableBatchDetails.endDate).toISOString().split('T')[0]}
            onChange={handleDateChange}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Active:</strong>
            {editableBatchDetails.active ? (
              <CheckCircleIcon sx={{ color: 'green', fontSize: 24, marginLeft: '8px' }} />
            ) : (
              <CancelIcon sx={{ color: 'red', fontSize: 24, marginLeft: '8px' }} />
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            <strong>Number of Trainees:</strong> {editableBatchDetails.numberOfTrainees}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BatchDetailsDisplay;
