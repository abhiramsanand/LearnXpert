import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

interface BatchSelectProps {
  selectedBatch: number;
  onBatchSelect: (batchId: number) => void;
}

interface Batch {
  id: number;
  batchName: string;
  isActive: boolean;
}

const BatchSelect: React.FC<BatchSelectProps> = ({ selectedBatch, onBatchSelect }) => {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:8080/api/v1/batches') 
      .then((response) => response.json())
      .then((data) => {
        setBatches(data);
      })
      .catch((error) => {
        console.error('Error fetching batch data:', error);
      });
  }, []);

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
        mt: '-10px',
      }}
    >
      {batches.map((batch) => (
        <Button
          key={batch.id}
          onClick={() => onBatchSelect(batch.id)}
          sx={{
            backgroundColor: selectedBatch === batch.id ? '#8061C3' : 'white',
            color: selectedBatch === batch.id ? 'white' : '#8061C3',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ fontSize: '12px' }}>
              {batch.batchName}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '6px' }}>
              {batch.isActive ? 'Active' : 'Complete'}
            </Typography>
          </Box>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default BatchSelect;
