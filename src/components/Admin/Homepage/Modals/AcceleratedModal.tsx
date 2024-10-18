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
  styled,
  TextField,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

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
    overflow: "auto",
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

const StyledTableRow = styled(TableRow)(() => ({
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

interface LocalTrainee {
  username: string;
  speed: string;
}

interface AcceleratedTraineesModalProps {
  open: boolean;
  onClose: () => void;
  traineeDetails: LocalTrainee[];
}

const speedPriority: Record<string, number> = {
  "1x": 1,
  "1.25x": 2,
  "1.5x": 3,
  "2x": 4,
};

const AcceleratedTraineesModal: React.FC<AcceleratedTraineesModalProps> = ({
  open,
  onClose,
  traineeDetails,
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof LocalTrainee>("username");
  const [filterSpeed, setFilterSpeed] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleRequestSort = (property: keyof LocalTrainee) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterSpeed(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTrainees = traineeDetails
    .filter((trainee) =>
      trainee.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((trainee) =>
      filterSpeed === "All" ? true : trainee.speed === filterSpeed
    );

  const sortedTrainees = filteredTrainees.slice().sort((a, b) => {
    if (orderBy === "speed") {
      return (
        (order === "asc" ? 1 : -1) *
        (speedPriority[a.speed] - speedPriority[b.speed])
      );
    } else {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  return (
    <CustomDialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <CustomDialogTitle>
        Course Viewing Speeds
      </CustomDialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
        >
          <FilterContainer>
            <FilterLabel>Filter by Speed:</FilterLabel>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={filterSpeed}
                onChange={handleFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Filter by Speed" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="1x">1x</MenuItem>
                <MenuItem value="1.25x">1.25x</MenuItem>
                <MenuItem value="1.5x">1.5x</MenuItem>
                <MenuItem value="2x">2x</MenuItem>
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
              marginRight: "16px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000000",
                },
                "&:hover fieldset": {
                  borderColor: "#000000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8061C3",
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
                    active={orderBy === "username"}
                    direction={orderBy === "username" ? order : "asc"}
                    onClick={() => handleRequestSort("username")}
                    IconComponent={() => <SwapVertIcon />}
                  >
                    Trainee Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "speed"}
                    direction={orderBy === "speed" ? order : "asc"}
                    onClick={() => handleRequestSort("speed")}
                    IconComponent={() => <SwapVertIcon />}
                  >
                    Viewing Speed
                  </TableSortLabel>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTrainees.map((trainee, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{trainee.username}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        trainee.speed === "2x" || trainee.speed === "1.5x"
                          ? "#DB5461"
                          : "inherit",
                    }}
                  >
                    {trainee.speed}
                  </TableCell>
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

export default AcceleratedTraineesModal;
