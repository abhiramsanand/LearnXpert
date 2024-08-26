import React, { useState, useEffect, useRef } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'; 
import { useNavigate } from 'react-router-dom';

interface Batch {
  id: number;
  batchName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const BatchList: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/batches')
      .then((response) => response.json())
      .then((data) => setBatches(data))
      .catch((error) => console.error('Error fetching batches:', error));
  }, []);

  const scrollUp = () => {
    if (listRef.current) {
      listRef.current.scrollTop -= 100;
    }
  };

  const scrollDown = () => {
    if (listRef.current) {
      listRef.current.scrollTop += 100;
    }
  };

  const BatchCard: React.FC<{ batch: Batch }> = ({ batch }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = () => {
      navigate(`/Admin-ManageBatch/${batch.id}`);
      handleClose();
    };

    return (
      <ListItem
        component={Box}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: { xs: '8px', sm: '10px', md: '16px' },
          width: '100%',
          marginBottom: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          primary={`ILP 2023 ${batch.batchName}`}
          secondary={`Start: ${new Date(batch.startDate).toLocaleDateString()} | End: ${new Date(batch.endDate).toLocaleDateString()}`}
          primaryTypographyProps={{
            variant: 'h6',
            sx: { fontSize: { xs: '16px', sm: '18px', md: '20px' } }
          }}
          secondaryTypographyProps={{
            variant: 'body2',
            sx: { fontSize: { xs: '12px', sm: '14px', md: '16px' } }
          }}
          sx={{ flex: 1, ml: { xs: 1, sm: 2 } }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: batch.isActive ? 'green' : 'red',
              mr: 1,
            }}
          >
            {batch.isActive ? 'Active' : 'Inactive'}
          </Typography>
          <IconButton
            onClick={handleClick}
            sx={{
              padding: '8px',
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {batch.isActive ? (
              <>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Disable</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleClose} disabled>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Enable</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </ListItem>
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton
        onClick={scrollUp}
        sx={{
          position: 'fixed',
          top: '150px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          borderRadius: '50%',
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>

      <Box
        ref={listRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1px',
          width: 'calc(100% - 60px)',
          margin: '0 auto',
          paddingTop: 0,
          maxHeight: '350px',
          overflow: 'hidden',
          position: 'relative',
          paddingRight: '60px',
        }}
      >
        {batches.map((batch, index) => (
          <BatchCard key={index} batch={batch} />
        ))}
      </Box>

      <IconButton
        onClick={scrollDown}
        sx={{
          position: 'fixed',
          top: '450px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          borderRadius: '50%',
        }}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </Box>
  );
};

export default BatchList;
