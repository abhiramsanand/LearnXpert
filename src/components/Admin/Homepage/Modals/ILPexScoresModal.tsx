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

interface TraineeScoreModalProps {
  open: boolean;
  onClose: () => void;
  traineeScores: Record<string, number>;
}

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

const TraineeScoreModal: React.FC<TraineeScoreModalProps> = ({
  open,
  onClose,
  traineeScores,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof { name: string; score: number }>("name");

  const handleRequestSort = (property: keyof { name: string; score: number }) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedTrainees = Object.entries(traineeScores)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => {
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
        Trainee Assessment Scores
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white" }}
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
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                  IconComponent={() => <SwapVertIcon />}
                >
                  Trainee Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel
                  active={orderBy === "score"}
                  direction={orderBy === "score" ? order : "asc"}
                  onClick={() => handleRequestSort("score")}
                  IconComponent={() => <SwapVertIcon />}
                >
                  Average Score
                </TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTrainees.map((trainee, index) => (
              <StyledTableRow key={index}>
                <TableCell>{trainee.name}</TableCell>
                <TableCell>{trainee.score.toFixed(2)}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </CustomDialog>
  );
};

export default TraineeScoreModal;
