/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import { TableRow as MUITableRow, TableRowProps } from "@mui/material"; // Import TableRow and TableRowProps

interface TraineeScoreModalProps {
  open: boolean;
  onClose: () => void;
  traineeData: { [traineeName: string]: number };
}

// Custom styles for the dialog
const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    backgroundColor: "#4A148C",
    color: theme.palette.primary.contrastText,
    position: "relative",
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    maxHeight: "calc(100vh - 250px)", // Adjusted to avoid overlap with footer
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "8px", // Customize scrollbar width
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E6E6FA", // Color for scrollbar thumb
      borderRadius: "4px", // Rounded corners for the thumb
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f0f0f0", // Background color for the track
    },
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "#4A148C",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.9rem",
  color: theme.palette.text.primary,
  padding: theme.spacing(1),
}));

const StyledTableRow = styled(MUITableRow)<TableRowProps>(() => ({ // Use TableRow here and pass TableRowProps
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#E6E6FA",
  },
}));

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: "10px",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const FilterLabel = styled(InputLabel)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const TableContainer = styled("div")(() => ({
  maxHeight: "300px", // Adjusted to ensure space for footer
  overflowY: "auto",
  paddingLeft: "20px",
  paddingRight: "20px",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#E6E6FA",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f0f0f0",
  },
}));

const Footer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: "#F5F5F5",
}));

const TraineeScoreModal: React.FC<TraineeScoreModalProps> = ({
  open,
  onClose,
  traineeData,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof { name: string; score: number }>("name");
  const [filterScore, setFilterScore] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleRequestSort = (
    property: keyof { name: string; score: number }
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterScore(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTrainees = Object.entries(traineeData)
    .map(([name, score]) => ({ name, score }))
    .filter((trainee) => {
      const matchesScoreFilter =
        filterScore === "All" ||
        (filterScore === "<60" && trainee.score < 60) ||
        (filterScore === "<80" && trainee.score < 80);

      const matchesSearch = trainee.name.toLowerCase().includes(searchTerm);

      return matchesScoreFilter && matchesSearch;
    });

  const sortedTrainees = filteredTrainees.sort((a, b) => {
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
      <CustomDialogTitle>Percipio Assessment Scores</CustomDialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FilterContainer>
            <FilterLabel>Filter by Score:</FilterLabel>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filterScore}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Filter by Score" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="<60">Less than 60</MenuItem>
                <MenuItem value="<80">Less than 80</MenuItem>
              </Select>
            </FormControl>
          </FilterContainer>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              marginRight: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000000", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#000000", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8061C3", // Focus border color
                },
              },
            }}
          />
        </Box>
        <TableContainer>
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
        </TableContainer>
      </DialogContent>
      <Footer>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            color: "white",
            backgroundColor: "#4A148C",
            "&:hover": {
              backgroundColor: "#6A1B9A",
            },
          }}
        >
          Close
        </Button>
      </Footer>
    </CustomDialog>
  );
};

export default TraineeScoreModal;
