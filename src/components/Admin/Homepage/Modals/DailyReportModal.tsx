import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/material/styles";

// Custom styles for the modal
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    backgroundColor: "#8061C3",
    color: theme.palette.primary.contrastText,
    position: "relative",
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#F3F0F9",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#8061C3",
      borderRadius: "4px",
    },
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#8061C3",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F3F0F9",
  },
}));

interface Trainee {
  traineeName: string;
  totalDailyReports: number;
  totalCourses: number;
}

interface DailyReportModalProps {
  open: boolean;
  handleClose: () => void;
  trainees: Trainee[];
}

const DailyReportModal: React.FC<DailyReportModalProps> = ({
  open,
  handleClose,
  trainees,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Trainee>("traineeName");

  const handleRequestSort = (property: keyof Trainee) => {
    if (property === "totalCourses") return; // Prevent sorting on "totalCourses"
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTrainees = trainees.slice().sort((a, b) => {
    if (orderBy === "totalCourses") return 0; // Skip sorting on "totalCourses"
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <CustomDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <CustomDialogTitle>
        Trainee Daily Reports
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
                  active={orderBy === "traineeName"}
                  direction={orderBy === "traineeName" ? order : "asc"}
                  onClick={() => handleRequestSort("traineeName")}
                  IconComponent={() => <SwapVertIcon />} // Custom icon
                >
                  Trainee Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "totalDailyReports"}
                  direction={orderBy === "totalDailyReports" ? order : "asc"}
                  onClick={() => handleRequestSort("totalDailyReports")}
                  IconComponent={() => <SwapVertIcon />} // Custom icon
                >
                  Total Daily Reports
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                Total Courses
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrainees.map((trainee, index) => (
              <StyledTableRow key={index}>
                <TableCell>{trainee.traineeName}</TableCell>
                <TableCell>{trainee.totalDailyReports}</TableCell>
                <TableCell>{trainee.totalCourses}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </CustomDialog>
  );
};

export default DailyReportModal;
