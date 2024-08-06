import React from 'react';
import { Box, styled } from '@mui/material';

// Define the interface for batch and props
interface Batch {
  batch: string;
  status: string; // Add status to the Batch interface
}

interface BatchTabsProps {
  batches: Batch[];
  selectedIndex: number;
  onTabChange: (newIndex: number) => void;
}

// Create a container for the tabs
const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '5%',
  width: '80%',
  flexWrap: 'wrap',
  marginLeft: '10%',
  borderRadius: '20px',
  boxShadow: `0px 4px 8px rgba(240, 240, 240, 0.6)`,
}));

// Create a styled tab container with background when selected
const TabContainer = styled(Box)(({ theme, isSelected }: { isSelected: boolean }) => ({
  borderRadius: '20px',
  width: '20%', // Adjust the width as needed
  height: '60px', // Increase height to accommodate status
  margin: '4px',
  display: 'flex',
  flexDirection: 'column', // Stack the content vertically
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isSelected ? '#8518FF' : theme.palette.background.default,
  color: isSelected ? 'white' : '#8518FF',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bolder',
  textAlign: 'center', // Center align text
}));

// Create a styled status text with dynamic color
const StatusText = styled(Box)<{ status: string }>(({ status }) => ({
  fontSize: '9px',
  color: status === 'completed'
    ? 'lightgrey'
    : status === 'ongoing'
    ? 'green'
    : 'black', // Default color if status is neither completed nor ongoing
}));

const BatchTabs: React.FC<BatchTabsProps> = ({ batches, selectedIndex, onTabChange }) => {
  return (
    <TabsContainer>
      {batches.map((batch, index) => (
        <TabContainer
          key={batch.batch}
          isSelected={selectedIndex === index}
          onClick={() => onTabChange(index)}
        >
          {batch.batch}
          <StatusText status={batch.status}>{batch.status}</StatusText> {/* Display status below batch name */}
        </TabContainer>
      ))}
    </TabsContainer>
  );
};

export default BatchTabs;
