// src/components/BatchCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Batch {
    name: string;
    traineeCount: number;
  }
interface BatchCardProps {
  batch: Batch;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  return (
    <Box mb={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {batch.name}
          </Typography>
          <Typography variant="body1">
            Number of Trainees: {batch.traineeCount}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BatchCard;
