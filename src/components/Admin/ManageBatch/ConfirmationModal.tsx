import React, { useState } from "react";
import { Modal, Box, Typography, Button, CircularProgress } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string; // Added title prop
  message: string; // Added message prop
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {title} {/* Use title prop */}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          {message} {/* Use message prop */}
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
