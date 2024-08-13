import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterProps {
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (filter: string) => {
    onFilterChange(filter);
    handleClose();
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
