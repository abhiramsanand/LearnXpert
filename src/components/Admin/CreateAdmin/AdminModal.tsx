// src/components/Admin/CreateAdmin/AdminModal.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent,  IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminTable from './AdminTable';

interface Admin {
  username: string;
  email: string;
}

interface AdminModalProps {
  open: boolean;
  admins: Admin[];
  onClose: () => void;
  onDeleteAdmin: (index: number) => void;
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
        <AdminTable admins={admins} onDeleteAdmin={onDeleteAdmin} />
      </DialogContent>
     
    </Dialog>
  );
};

export default AdminModal;
