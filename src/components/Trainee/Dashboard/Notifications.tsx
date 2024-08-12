import React, { useState } from "react";
import { Box, Typography, Modal, IconButton } from "@mui/material";
import { FaRegBell } from "react-icons/fa";

const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Notifications
          </Typography>
          <Typography sx={{ mt: 2 }}>You have no new notifications.</Typography>
        </Box>
      </Modal>
      <Box>
        <Typography onClick={handleOpen} sx={{ cursor: "pointer" }}>
          <IconButton color="inherit">
            <FaRegBell />
          </IconButton>
        </Typography>
      </Box>
    </>
  );
};

export default Notifications;
