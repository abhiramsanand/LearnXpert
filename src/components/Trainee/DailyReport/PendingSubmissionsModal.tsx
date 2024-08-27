import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PendingData from "./PendingData.json"; 

interface PendingSubmissionsModalProps {
  open: boolean;
  handleClose: () => void;
}

const PendingSubmissionsModal: React.FC<PendingSubmissionsModalProps> = ({ open, handleClose }) => {
  const [pendingCourses, setPendingCourses] = useState(PendingData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Set the number of items per page

  useEffect(() => {
    setPendingCourses(PendingData);
  }, []);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedData = pendingCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px",
          bgcolor: "#f2eff9", // Background color similar to the screenshot
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            position: "relative",
          }}
        >
          <Typography variant="h5" sx={{ color: "#5f4b8b", fontWeight: "bold", fontSize: "24px" }}> {/* Adjusted font size and color to match the screenshot */}
            Pending Submissions
          </Typography>
          <IconButton 
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: -20,
              top: -20,
              color: "red", // Red color for the close button
            }}
          >
            <CloseIcon sx={{ fontSize: 32 }} /> {/* Adjusted font size of the close icon */}
          </IconButton>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: "none", backgroundColor: "transparent" }}>
          <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#5f4b8b", backgroundColor: "#e0c3fc", borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", textAlign: "center" }}>Course</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#5f4b8b", backgroundColor: "#e0c3fc", borderTopRightRadius: "8px", borderBottomRightRadius: "8px", textAlign: "center" }}>
                  Day
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((course, index) => (
                <TableRow key={index} sx={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)", height: "60px" }}> {/* Adjusted row height */}
                  <TableCell sx={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px", textAlign: "center" }}>{course.name}</TableCell>
                  <TableCell sx={{ borderTopRightRadius: "8px", borderBottomRightRadius: "8px", textAlign: "center" }}>{course.day}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(pendingCourses.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#5f4b8b", // Change the color of the pagination items
              },
              "& .Mui-selected": {
                backgroundColor: "#8061C3", // Active page color
                color: "#ffffff",
              },
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PendingSubmissionsModal;
