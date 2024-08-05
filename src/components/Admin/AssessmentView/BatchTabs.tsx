import React from 'react';
import { Tab, Tabs } from '@mui/material';

interface Batch {
  batch: string;
}

interface BatchTabsProps {
  batches: Batch[];
  selectedIndex: number;
  onTabChange: (newIndex: number) => void;
}

const BatchTabs: React.FC<BatchTabsProps> = ({ batches, selectedIndex, onTabChange }) => {
  return (
    <Tabs
      value={selectedIndex}
      onChange={(event, newValue) => onTabChange(newValue)}
      aria-label="batch tabs"
      variant="scrollable"
      scrollButtons="auto"
    >
      {batches.map((batch, index) => (
        <Tab key={batch.batch} label={batch.batch} />
      ))}
    </Tabs>
  );
};

export default BatchTabs;
