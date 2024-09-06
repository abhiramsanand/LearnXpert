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
  Typography,
  TextField,
  Box,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styled } from "@mui/material/styles";

interface TraineeModalProps {
  open: boolean;
  onClose: () => void;
  batchDayNumber: number;
  trainees: Array<{ traineeName: string; traineeDayNumber: number }>;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    backgroundColor: "#4A148C",
    color: theme.palette.primary.contrastText,
    position: "relative",
    padding: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    maxHeight: "calc(100vh - 250px)",
    overflowY: "auto",
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
  },
  "& .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.divider}`,
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

const StyledTableRow = styled(TableRow)(({}) => ({
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

const TableContainer = styled("div")(({ theme }) => ({
  maxHeight: "300px",
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

const TraineeModal: React.FC<TraineeModalProps> = ({
  open,
  onClose,
  batchDayNumber,
  trainees = [],
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof (typeof trainees)[0]>("traineeName");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleRequestSort = (property: keyof (typeof trainees)[0]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterStatus(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainees = trainees
    .filter((trainee) =>
      trainee.traineeName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((trainee) => {
      if (filterStatus === "Behind") {
        return trainee.traineeDayNumber < batchDayNumber;
      } else if (filterStatus === "Ahead") {
        return trainee.traineeDayNumber > batchDayNumber;
      } else if (filterStatus === "On Track") {
        return trainee.traineeDayNumber === batchDayNumber;
      }
      return true;
    });

  const sortedTrainees = filteredTrainees.slice().sort((a, b) => {
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
        <Typography variant="h6">Trainee Progress</Typography>
      </CustomDialogTitle>
      <DialogContent>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <FilterContainer>
            <FilterLabel>Filter by Status:</FilterLabel>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filterStatus}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Filter by Status" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Behind">Behind</MenuItem>
                <MenuItem value="On Track">On Track</MenuItem>
                <MenuItem value="Ahead">Ahead</MenuItem>
              </Select>
            </FormControl>
          </FilterContainer>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              marginRight: "16px", // Adjust the spacing between input and button
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
              mt: 1
            }}
          />
        </Box>
        <TableContainer>
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
        </TableContainer>
      </DialogContent>
      <Footer>
        <Button
          variant="contained"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
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

export default TraineeModal;
