import React from 'react';
import { Box, styled, Typography } from '@mui/material';

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

const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '80%',
  borderRadius: '50px',
  boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.3)`,
}));

const TabContainer = styled(Box)(({ theme, isSelected }: { isSelected: boolean }) => ({
  borderRadius: '50px',
  width: '25%',
  height: '50px',
  backgroundColor: isSelected ? '#8518FF' : theme.palette.background.default,
  color: isSelected ? 'white' : '#8518FF',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bolder',
  '&:hover': {
    backgroundColor: '#F3E8FF',
    color: 'black',
  },
}));

const BatchSelect: React.FC<BatchSelectProps> = ({ selectedBatch, onBatchSelect }) => {
  return (
    <TabsContainer>
      {batches.map((batch) => (
        <TabContainer
          key={batch.id}
          isSelected={selectedBatch === batch.id}
          onClick={() => onBatchSelect(batch.id)}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">{batch.name}</Typography>
            <Typography variant="body2">{batch.status}</Typography>
          </Box>
        </TabContainer>
      ))}
    </TabsContainer>
  );
};

export default BatchSelect;
