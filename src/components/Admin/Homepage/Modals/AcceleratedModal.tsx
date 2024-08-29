import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { styled } from '@mui/material/styles';

// Define custom styles for the modal
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: '#8061C3',
    color: theme.palette.primary.contrastText,
    position: 'relative',
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: 'calc(100vh - 200px)', // Limit height for scrollable content
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#F3F0F9',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#8061C3',
      borderRadius: '4px',
    },
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#8061C3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem', // Increased font size
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#FFFFFF",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#F3F0F9",
  },
}));

interface Trainee {
  username: string;
  speed: string;
}

interface AcceleratedTraineesModalProps {
  open: boolean;
  onClose: () => void;
  traineeDetails: Trainee[];
}

const speedPriority: Record<string, number> = {
  '1x': 1,
  '1.25x': 2,
  '1.5x': 3,
  '2x': 4
};

const AcceleratedTraineesModal: React.FC<AcceleratedTraineesModalProps> = ({ open, onClose, traineeDetails }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Trainee>('username');

  const handleRequestSort = (property: keyof Trainee) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTrainees = traineeDetails.slice().sort((a, b) => {
    if (orderBy === 'speed') {
      return (order === 'asc' ? 1 : -1) * (speedPriority[a.speed] - speedPriority[b.speed]);
    } else {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });

  return (
    <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CustomDialogTitle>
        Accelerated Trainees
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "#DB5461" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomDialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'username'}
                  direction={orderBy === 'username' ? order : 'asc'}
                  onClick={() => handleRequestSort('username')}
                  IconComponent={() => <SwapVertIcon />} // Custom icon
                >
                  Trainee Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === 'speed'}
                  direction={orderBy === 'speed' ? order : 'asc'}
                  onClick={() => handleRequestSort('speed')}
                  IconComponent={() => <SwapVertIcon />} // Custom icon
                >
                  Viewing Speed
                </TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrainees.map((trainee, index) => (
              <StyledTableRow key={index}>
                <TableCell>{trainee.username}</TableCell>
                <TableCell sx={{ color: trainee.speed === '2x' || trainee.speed === '1.5x' ? '#DB5461' : 'inherit' }}>
                  {trainee.speed}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </CustomDialog>
  );
};

export default AcceleratedTraineesModal;
