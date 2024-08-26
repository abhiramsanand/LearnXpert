import React, { useRef } from 'react';
import { Box, styled } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// Define the interface for batch and props
interface Batch {
  batchName: string;
  isActive: boolean;
}

interface BatchTabsProps {
  batches: Batch[];
  selectedIndex: number;
  onTabChange: (newIndex: number) => void;
}

// Create a container for the tabs with scrollable overflow
const TabsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  overflowX: 'auto', // Enable horizontal scrolling
  whiteSpace: 'nowrap', // Prevent wrapping to next line
  position: 'relative', // For positioning arrows
  padding: '0 60px', // Space for arrows
}));

// Create a styled tab container with background when selected
const TabContainer = styled(Box)(({ theme, isSelected }: { isSelected: boolean }) => ({
  display: 'inline-flex',
  flexDirection: 'column', // Stack the content vertically
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  width: '150px', // Fixed width for each tab
  height: '60px', // Increase height to accommodate status
  margin: '4px',
  backgroundColor: isSelected ? '#8518FF' : theme.palette.background.default,
  color: isSelected ? 'white' : '#8518FF',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  fontWeight: 'bolder',
  textAlign: 'center', // Center align text
}));

// Create a styled status text with dynamic color
const StatusText = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  fontSize: '9px',
  color: isActive ? 'green' : 'grey', // Green for active, grey for completed
}));

// Styled arrow button
const ArrowButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  boxShadow: `0px 4px 8px rgba(240, 240, 240, 0.6)`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const BatchTabs: React.FC<BatchTabsProps> = ({ batches, selectedIndex, onTabChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150, // Adjust scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box position="relative" width="100%">
      <ArrowButton
        style={{ left: 0 }}
        onClick={() => scroll('left')}
      >
        <ArrowLeftIcon />
      </ArrowButton>
      <TabsContainer ref={containerRef}>
        {batches.map((batch, index) => (
          <TabContainer
            key={batch.batchName}
            isSelected={selectedIndex === index}
            onClick={() => onTabChange(index)}
          >
            {batch.batchName}
            <StatusText isActive={batch.isActive}>
              {batch.isActive ? 'Active' : 'Completed'}
            </StatusText>
          </TabContainer>
        ))}
      </TabsContainer>
      <ArrowButton
        style={{ right: 0 }}
        onClick={() => scroll('right')}
      >
        <ArrowRightIcon />
      </ArrowButton>
    </Box>
  );
};

export default BatchTabs;
