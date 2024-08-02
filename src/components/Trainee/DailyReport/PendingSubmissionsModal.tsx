import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface PendingSubmission {
  course: string;
  day: string;
}

interface PendingSubmissionsModalProps {
  open: boolean;
  onClose: () => void;
  data?: PendingSubmission[];
}

const PendingSubmissionsModal: React.FC<PendingSubmissionsModalProps> = ({ open, onClose, data = [] }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Pending Submissions</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ backgroundColor: '#E6E6FA' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{row.day}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default PendingSubmissionsModal;
