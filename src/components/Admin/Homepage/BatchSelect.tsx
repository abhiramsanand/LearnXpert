import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

interface BatchSelectProps {
  selectedBatch: number;
  onBatchSelect: (batchId: number) => void;
}

const batches = [
  { id: 1, name: 'Batch 1', status: 'Completed' },
  { id: 2, name: 'Batch 2', status: 'Completed' },
  { id: 3, name: 'Batch 3', status: 'Completed' },
  { id: 4, name: 'Batch 4', status: 'Completed' },
];

const BatchSelect: React.FC<BatchSelectProps> = ({ selectedBatch, onBatchSelect }) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{
        borderRadius: '50px', 
        overflow: 'hidden', 
        '& .MuiButtonGroup-grouped': {
          borderRadius: '50px', 
          border: 'none', 
          px: '60px',
          '&:not(:last-of-type)': {
            borderRight: '1px solid #fff', 
          },
          '&:hover': {
            backgroundColor: 'lightgray', 
          },
        },
        ml: '-70px',
        mt: '-10px'
      }}
    >
      {batches.map((batch) => (
        <Button
          key={batch.id}
          onClick={() => onBatchSelect(batch.id)}
          sx={{
            backgroundColor: selectedBatch === batch.id ? '#8518FF' : 'white',
            color: selectedBatch === batch.id ? 'white' : '#8518FF',
          }}
        >
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography variant="h6" sx={{fontSize: '12px'}}>{batch.name}</Typography>
          <Typography variant="body2" sx={{fontSize: '6px'}}>{batch.status}</Typography>
          </Box>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BatchSelect;
