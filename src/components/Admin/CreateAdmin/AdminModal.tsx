import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminTable from './AdminTable';
import { Admin } from './Admin'; // Import the shared Admin interface

interface AdminModalProps {
  open: boolean;
  admins: Admin[]; // Use the unified Admin type
  onClose: () => void;
  onDeleteAdmin: (adminId: number) => void; // Changed to adminId
}

const AdminModal: React.FC<AdminModalProps> = ({ open, admins, onClose, onDeleteAdmin }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Admin List
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <AdminTable admins={admins} onDeleteClick={onDeleteAdmin} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
