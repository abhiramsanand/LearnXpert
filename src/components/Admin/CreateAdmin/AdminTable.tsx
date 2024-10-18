/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";

interface Admin {
  id: number;
  name: string;
}

interface AdminTableProps {
  admins: Admin[]; // Use the unified Admin type
  onDeleteClick: (adminId: number) => void; // Make sure this prop is correctly typed
}

const AdminTable: React.FC<AdminTableProps> = ({ admins, onDeleteClick }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [] = useState<"asc" | "desc">("asc");

  const handleDeleteClick = (admin: Admin) => {
    setSelectedAdmin(admin);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAdmin) {
      try {
        await axios.delete(
          `http://localhost:8080/api/v1/users/delete/${selectedAdmin.id}`
        );
        onDeleteClick(selectedAdmin.id);
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
      setOpenDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const handleSortClick = () => {
    // Sorting logic here
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: "12px" }}>
        <Typography
          align="center"
          sx={{
            color: "#8061C3",
            mb: 2,
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          List of Admins
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ width: "100%", maxHeight: "calc(100vh)", overflowY: "auto", mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center" sx={{ padding: "8px", fontWeight: "bold" }}>#</TableCell>
              <TableCell align="center" sx={{ padding: "8px", fontWeight: "bold" }}>
                Name
                <IconButton onClick={handleSortClick} sx={{ color: "#8061C3" }}>
                  <SwapVertIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow key={admin.id} sx={{ backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#f9f9f9" }}>
                <TableCell align="center" sx={{ padding: "8px" }}>{index + 1}</TableCell>
                <TableCell align="center" sx={{ padding: "8px" }}>{admin.name}</TableCell>
                <TableCell align="center" sx={{ padding: "8px" }}>
                  <IconButton onClick={() => handleDeleteClick(admin)} sx={{ color: "#d32f2f" }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {admins.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ padding: "16px" }}>
                  <Typography variant="body1" color="textSecondary">No admins found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this admin?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminTable;
