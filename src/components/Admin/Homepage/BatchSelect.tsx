import React from 'react';
import { Button, ButtonGroup, Typography } from '@mui/material';

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
    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ borderRadius: 50 }}>
      {batches.map((batch) => (
        <Button
          key={batch.id}
          onClick={() => onBatchSelect(batch.id)}
          sx={{
            backgroundColor: selectedBatch === batch.id ? 'purple' : 'white',
            color: selectedBatch === batch.id ? 'white' : 'purple',
            borderRadius: batch.id === 1 ? '50px 0 0 50px' : batch.id === batches.length ? '0 50px 50px 0' : '0',
            '&:hover': {
              backgroundColor: selectedBatch === batch.id ? 'purple' : 'lightgray',
            },
          }}
        >
          <Typography variant="h6">{batch.name}</Typography>
          <Typography variant="body2">{batch.status}</Typography>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BatchSelect;
