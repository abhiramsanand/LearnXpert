// src/components/SuccessModal.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

interface SuccessModalProps {
    open: boolean;
    onClose: () => void;
    message: string | null;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessModal;
