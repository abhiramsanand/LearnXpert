import React, { useEffect, useState } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; // Import horizontal icon
 
// Define the type for the batch data
interface Batch {
  name: string;
  traineeCount: number;
  type: string;
  status: 'Active' | 'Inactive'; // Add the status field
}
 
// BatchList component
const BatchList: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
 
  useEffect(() => {
    fetch('/BatchList.json')
      .then((response) => response.json())
      .then((data) => setBatches(data.batches))
      .catch((error) => console.error('Error fetching batches:', error));
  }, []);
 
  // Inner BatchCard component
  const BatchCard: React.FC<{ batch: Batch }> = ({ batch }) => (
    <ListItem
      component={Box}
      sx={{
        display: 'flex',
        flexDirection: 'row', // Ensure horizontal layout
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        marginBottom: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative', // For positioning child elements
      }}
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText
        primary={batch.name}
        secondary={`Trainees: ${batch.traineeCount} | Type: ${batch.type}`}
        primaryTypographyProps={{ variant: 'h6' }}
        secondaryTypographyProps={{ variant: 'body2' }}
        sx={{ flex: 1, ml: 2 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <IconButton edge="end" aria-label="more" sx={{marginRight:'10px'}}>
          <MoreHorizIcon />
        </IconButton>
        <Typography
          sx={{
            fontSize: 'body2',
            color: batch.status === 'Active' ? 'green' : 'red',
            mt: 1, // Margin top to separate status from the icon
          }}
        >
          {batch.status}
        </Typography>
      </Box>
    </ListItem>
  );
 
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '60%',
        margin: '0 auto', // Center horizontally
        padding: '16px',
        maxHeight: '450px', // Set a maximum height for the container
        overflowY: 'auto',  // Enable vertical scrolling
        '&::-webkit-scrollbar': {
          width: '8px',
          marginTop:'30px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          marginTop:'20px',
          marginBottom:'10px',
 
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
        // Optional: If you need additional space on the left
        paddingLeft: '16px',
      }}
    >
      {batches.map((batch, index) => (
        <BatchCard key={index} batch={batch} />
      ))}
    </Box>
  );
};
 
export default BatchList;