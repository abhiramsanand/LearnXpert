/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Box, styled } from '@mui/material';

// Define the interface for batch and props
interface Batch {
  batch: string;
}

interface BatchTabsProps {
  batches: Batch[];
  selectedIndex: number;
  onTabChange: (newIndex: number) => void;
}

// Create a container for the tabs
const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
//   justifyContent: 'space-between',
  gap:'5%',
  width: '80%',
  flexWrap: 'wrap',
  marginLeft:'10%',
  borderRadius: '20px', 
    boxShadow: `0px 4px 8px rgba(240, 240, 240, 0.6)`,
}));

// Create a styled tab container with background when selected
const TabContainer = styled(Box)(({ theme, isSelected }: { isSelected: boolean }) => ({
  borderRadius: '20px', // Make the background square
  width: '20%', // Adjust the width as needed
  height: '40px', // Adjust the height as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: isSelected ? '#8518FF' : theme.palette.background.default, 
  color :isSelected ? 'white' : '#8518FF',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight:'bolder',
  '&:hover': {
    backgroundColor:  '#F3E8FF'  ,
    color:'black'
    
  },
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
        </TabContainer>
      ))}
    </TabsContainer>
  );
};

export default BatchTabs;
