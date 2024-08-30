/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/material/styles";

interface TraineeModalProps {
  open: boolean;
  onClose: () => void;
  batchDayNumber: number;
  traineesBehind: Array<{ traineeName: string; traineeDayNumber: number }>;
}

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

const CustomDialogTitle = styled(DialogTitle)(({}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#8061C3",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F3F0F9",
  },
}));

const TraineeModal: React.FC<TraineeModalProps> = ({
  open,
  onClose,
  batchDayNumber,
  traineesBehind,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof (typeof traineesBehind)[0]>("traineeName");

  const handleRequestSort = (property: keyof (typeof traineesBehind)[0]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTrainees = traineesBehind.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CustomDialogTitle>
        Trainees Behind
        <IconButton
          aria-label="close"
          onClick={(e) => {
            e.stopPropagation();
            onClose(); 
          }}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomDialogTitle>
      <DialogContent>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            mt: 2,
            color: "#8061C3",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Batch Day Number: {batchDayNumber}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "traineeName"}
                  direction={orderBy === "traineeName" ? order : "asc"}
                  onClick={() => handleRequestSort("traineeName")}
                  IconComponent={() => <SwapVertIcon />}
                >
                  Trainee Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "traineeDayNumber"}
                  direction={orderBy === "traineeDayNumber" ? order : "asc"}
                  onClick={() => handleRequestSort("traineeDayNumber")}
                  IconComponent={() => <SwapVertIcon />}
                >
                  Day Number
                </TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrainees.map((trainee, index) => (
              <StyledTableRow key={index}>
                <TableCell>{trainee.traineeName}</TableCell>
                <TableCell>{trainee.traineeDayNumber}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </CustomDialog>
  );
};

export default TraineeModal;
