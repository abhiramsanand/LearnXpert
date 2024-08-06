import React, { useState } from 'react';
import { Button, ButtonGroup, Box, Typography } from '@mui/material';

const batches = [
  { id: 1, name: 'Batch 1', status: 'Completed' },
  { id: 2, name: 'Batch 2', status: 'Completed' },
  { id: 3, name: 'Batch 3', status: 'Completed' },
  { id: 4, name: 'Batch 4', status: 'Completed' },
];

const BatchSelect: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<number>(1);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ borderRadius: 50 }}>
        {batches.map((batch) => (
          <Button
            key={batch.id}
            onClick={() => setSelectedBatch(batch.id)}
            sx={{
              backgroundColor: selectedBatch === batch.id ? '#9D46FF' : 'white',
              color: selectedBatch === batch.id ? 'white' : '#9D46FF',
              borderRadius: batch.id === 1 ? '50px 0 0 50px' : batch.id === batches.length ? '0 50px 50px 0' : '0',
              '&:hover': {
                backgroundColor: selectedBatch === batch.id ? '#9D46FF' : '#F3E8FF',
              },
            }}
          >
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6" sx={{px: '70px', fontSize: '13px'}}>{batch.name}</Typography>
            <Typography variant="body2" sx={{fontSize: '8px'}}>{batch.status}</Typography>
            </Box>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default BatchSelect;
