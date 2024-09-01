import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Paper,
  TextField,
  InputAdornment,
  Container,
  Button,
  Modal,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useNavigate } from "react-router-dom";

interface Trainee {
  traineeName: string;
  totalCourses: number;
  totalDailyReports: number;
}

const TraineeReport: React.FC = () => {
  const navigate = useNavigate();
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [filterCriteria, setFilterCriteria] = useState<string>("all");

  useEffect(() => {
    const fetchTraineeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/trainees/reports?batchId=15"
        );
        setTrainees(response.data);
      } catch (error) {
        console.error("Error fetching trainee data:", error);
      }
    };
    fetchTraineeData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = () => {
    setFilterModalOpen(false);
  };

  const filteredTrainees = trainees
    .filter((trainee) => {
      const pendingReports = trainee.totalCourses - trainee.totalDailyReports;
      if (filterCriteria === "0") return pendingReports === 0;
      if (filterCriteria === "1-10")
        return pendingReports > 0 && pendingReports <= 10;
      if (filterCriteria === "more than 10") return pendingReports > 10;
      return true; // "All" option or default
    })
    .filter((trainee) =>
      trainee.traineeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        if (
          a[sortConfig.key as keyof Trainee] <
          b[sortConfig.key as keyof Trainee]
        ) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof Trainee] >
          b[sortConfig.key as keyof Trainee]
        ) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search Trainee"
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            "& .MuiInputBase-root": {
              padding: "4px 8px",
              backgroundColor: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8061C3",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setFilterModalOpen(true)}
          sx={{
            borderRadius: "20px",
            color: "#5B8C5A",
            borderColor: "#5B8C5A",
            "&:hover": {
              borderColor: "#8061C3",
            },
            "&.Mui-focused": {
              borderColor: "#8061C3",
            },
          }}
        >
          Filter
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "calc(100vh - 270px)",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: "#F1EDEE",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8061C3",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("traineeName")}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Trainee Name <SwapVertIcon fontSize="small" sx={{ ml: 1 }} />
                </Box>
              </TableCell>
              <TableCell>Total Courses</TableCell>
              <TableCell onClick={() => handleSort("totalDailyReports")}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Total Daily Reports{" "}
                  <SwapVertIcon fontSize="small" sx={{ ml: 1 }} />
                </Box>
              </TableCell>
              <TableCell onClick={() => handleSort("pendingReports")}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  Pending Daily Reports{" "}
                  <SwapVertIcon fontSize="small" sx={{ ml: 1 }} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrainees.map((trainee, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#f9f9f9",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
                onClick={() => navigate("/Admin-WholeReport")} // Use navigate for routing
              >
                <TableCell>{trainee.traineeName}</TableCell>
                <TableCell>{trainee.totalCourses}</TableCell>
                <TableCell>{trainee.totalDailyReports}</TableCell>
                <TableCell>
                  {trainee.totalCourses - trainee.totalDailyReports}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Filter Modal */}
      <Modal open={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            backgroundColor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filter by Pending Reports
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="0 Pending Reports"
              />
              <FormControlLabel
                value="1-10"
                control={<Radio />}
                label="1-10 Pending Reports"
              />
              <FormControlLabel
                value="more than 10"
                control={<Radio />}
                label="More than 10 Pending Reports"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleFilter}>Apply</Button>
            <Button onClick={() => setFilterModalOpen(false)} sx={{ ml: 1 }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default TraineeReport;
