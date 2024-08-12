import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (filter: string) => {
    setFilter(filter);
    handleClose();
    // Optionally handle the filter selection logic here
    console.log('Selected filter:', filter);
  };

  return (
    <div>
      <IconButton
        aria-label="filter"
        size="large"
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect('dateOfSubmission')}>
          Date of Submission
        </MenuItem>
        <MenuItem onClick={() => handleSelect('dueDate')}>
          Due Date
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Filter;
