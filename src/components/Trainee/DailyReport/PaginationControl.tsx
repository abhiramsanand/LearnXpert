import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationControlProps {
  page: number;
  totalPages: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ page, totalPages, handlePageChange }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            background: "#8061C3",
            color: "white",
            fontSize: "0.75rem", // Smaller font size
            minWidth: "30px",    // Smaller width for each item
            height: "30px",      // Smaller height for each item
            margin: "0 2px",     // Less space between items
            borderRadius: "50%", // Make pagination items rounder
          },
          "& .Mui-selected": {
            background: "#5a40a3", // Slightly different shade for the selected item
          },
        }}
      />
    </Box>
  );
};

export default PaginationControl;
