// src/pages/BatchListPage.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import BatchCard from '../../components/Admin/AdminBatchList/BatchCard';


interface Batch {
    name: string;
    traineeCount: number;
  }
const batches: Batch[] = [
  { name: 'Batch 1', traineeCount: 25 },
  { name: 'Batch 2', traineeCount: 30 },
  { name: 'Batch 3', traineeCount: 20 },
  { name: 'Batch 4', traineeCount: 15 },
];

const BatchListPage: React.FC = () => {
  return (
    <Container>
      <Box mt={4}>
        {batches.map((batch, index) => (
          <BatchCard key={index} batch={batch} />
        ))}
      </Box>
    </Container>
  );
};

export default BatchListPage;
