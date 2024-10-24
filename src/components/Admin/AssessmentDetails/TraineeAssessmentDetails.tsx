/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { SelectChangeEvent } from '@mui/material';

interface Assessment {
  assessmentName: string;
}

interface TraineeAssessment {
  traineeName: string;
  traineeScore: number | string; // Changed to number or string to handle "N/A"
  traineeStatus: string;
  assessmentName: string;
}

interface Trainee {
  traineeName: string;
}

const AssessmentDetails: React.FC<{ batchId: number }> = ({ batchId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [, setTraineeAssessments] = useState<TraineeAssessment[]>([]);
  const [allTrainees, setAllTrainees] = useState<Trainee[]>([]);
  const [mergedTraineeAssessments, setMergedTraineeAssessments] = useState<
    TraineeAssessment[]
  >([]);
  const [, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedScores, setSelectedScores] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [traineesResponse, assessmentsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/trainees/batch/${batchId}`),
          axios.get(
            `http://localhost:8080/api/v1/ilpex/assessments/details?batchId=${batchId}`
          ),
        ]);

        const allTraineesData = traineesResponse.data;
        setAllTrainees(allTraineesData);

        const fetchedAssessments = assessmentsResponse.data.data;
        setAssessments(fetchedAssessments);

        if (fetchedAssessments.length > 0) {
          const latestAssessmentName = fetchedAssessments[0].assessmentName;
          setSelectedAssessment(latestAssessmentName);
          await fetchTraineeAssessments(latestAssessmentName, allTraineesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [batchId]);

  const fetchTraineeAssessments = async (
    assessmentName: string,
    allTrainees: Trainee[]
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/ilpex/trainee-assessments"
      );
      const completedAssessments = response.data.data.filter(
        (assessment: TraineeAssessment) =>
          assessment.assessmentName === assessmentName
      );

      // Merge with all trainees to ensure all are listed
      const mergedData = allTrainees.map((trainee) => {
        const matchingAssessment = completedAssessments.find(
          (assessment: { traineeName: string }) =>
            assessment.traineeName === trainee.traineeName
        );

        return matchingAssessment
          ? matchingAssessment
          : {
              traineeName: trainee.traineeName,
              traineeScore: "N/A",
              traineeStatus: "Pending",
              assessmentName: assessmentName,
            };
      });

      setTraineeAssessments(completedAssessments);
      setMergedTraineeAssessments(mergedData);
    } catch (error) {
      console.error("Error fetching trainee assessments data:", error);
      setError("Failed to fetch trainee assessments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentChange = (event: SelectChangeEvent<string>) => {
    const assessmentName = event.target.value as string;
    setSelectedAssessment(assessmentName);
    setError(null);
    fetchTraineeAssessments(assessmentName, allTrainees);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterOpen = () => setOpenFilter(true);
  const handleFilterClose = () => setOpenFilter(false);

  const handleScoreChange = (scoreRange: string) => {
    setSelectedScores((prevScores) =>
      prevScores.includes(scoreRange)
        ? prevScores.filter((s) => s !== scoreRange)
        : [...prevScores, scoreRange]
    );
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAssessments = React.useMemo(() => {
    let sortableAssessments = [...mergedTraineeAssessments];

    if (sortConfig.key) {
      sortableAssessments.sort((a, b) => {
        const aValue =
          sortConfig.key === "traineeScore" &&
          a[sortConfig.key as keyof TraineeAssessment] === "N/A"
            ? 0
            : a[sortConfig.key as keyof TraineeAssessment];
        const bValue =
          sortConfig.key === "traineeScore" &&
          b[sortConfig.key as keyof TraineeAssessment] === "N/A"
            ? 0
            : b[sortConfig.key as keyof TraineeAssessment];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableAssessments;
  }, [mergedTraineeAssessments, sortConfig]);

  const filteredAssessments = sortedAssessments
    .filter((trainee) =>
      trainee.traineeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((trainee) => {
      if (selectedScores.length === 0) return true;
      const score =
        typeof trainee.traineeScore === "number" ? trainee.traineeScore : 0;
      if (selectedScores.includes("100") && score === 100) return true;
      if (selectedScores.includes("90-100") && score >= 90 && score < 100)
        return true;
      if (selectedScores.includes("80-90") && score >= 80 && score < 90)
        return true;
      if (selectedScores.includes("below 80") && score < 80) return true;
      return false;
    })
    .filter((trainee) => {
      if (selectedStatuses.length === 0) return true;
      return selectedStatuses.includes(trainee.traineeStatus.toLowerCase());
    });

  return (
    <Container>
      <Box>
        {error && (
          <Typography sx={{ color: "error.main", mb: 2 }}>{error}</Typography>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl
              size="small"
              variant="outlined"
              sx={{
                width: "200px",
                textAlign: "left",
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
            >
              <InputLabel
                shrink
                htmlFor="assessment-select"
                sx={{
                  color: "#8061C3",
                  "&.Mui-focused": {
                    color: "#8061C3",
                  },
                  position: "absolute",
                  backgroundColor: "#F1EDEE", // Match the background color to avoid visual overlap
                }}
              >
                Select Assessment
              </InputLabel>
              <Select
                id="assessment-select"
                value={selectedAssessment}
                onChange={handleAssessmentChange}
                inputProps={{
                  id: "assessment-select",
                }}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "10px 14px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000", // Default border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#000000", // Hover border color
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8061C3", // Focus border color
                  },
                }}
              >
                {assessments.map((assessment) => (
                  <MenuItem
                    key={assessment.assessmentName}
                    value={assessment.assessmentName}
                  >
                    {assessment.assessmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
                value={searchTerm}
                onChange={handleSearch}
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
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={handleFilterOpen}
                sx={{
                  color: "#8061C3",
                  borderColor: "#8061C3",
                  "&:hover": {
                    backgroundColor: "#8061C3",
                    color: "white",
                  },
                }}
              >
                Filter
              </Button>
            </Box>
            <Link to="/Admin-AssessmentCreation">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#8061C3",
                  "&:hover": {
                    backgroundColor: "#6A529D",
                  },
                }}
              >
                Create Assessment
              </Button>
            </Link>
          </Box>
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
                {["traineeName", "traineeScore", "traineeStatus"].map(
                  (field) => (
                    <TableCell
                      key={field}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#F1EDEE",
                        fontSize: "14px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort(field)}
                      >
                        {field === "traineeName"
                          ? "Trainee Name"
                          : field === "traineeScore"
                          ? "Trainee Score"
                          : "Trainee Status"}
                        <SwapVertIcon fontSize="small" />
                      </Box>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssessments.map((trainee, index) => (
                <TableRow
                  key={trainee.traineeName}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#f9f9f9",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "13px",
                      backgroundColor: "inherit",
                    }}
                  >
                    {trainee.traineeName}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "13px",
                      backgroundColor: "inherit",
                    }}
                  >
                    {trainee.traineeScore === "N/A"
                      ? "N/A"
                      : trainee.traineeScore}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "13px",
                      backgroundColor: "inherit",
                    }}
                  >
                    {trainee.traineeStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Filter Dialog */}
      <Dialog open={openFilter} onClose={handleFilterClose}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Score Range:</Typography>
          {["100", "90-100", "80-90", "below 80"].map((range) => (
            <FormControlLabel
              key={range}
              control={
                <Checkbox
                  checked={selectedScores.includes(range)}
                  onChange={() => handleScoreChange(range)}
                  name={range}
                />
              }
              label={range}
            />
          ))}

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Status:
          </Typography>
          {["completed", "pending"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={selectedStatuses.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  name={status}
                />
              }
              label={status}
            />
          ))}
        </DialogContent>
        <Button
          onClick={handleFilterClose}
          sx={{ justifyContent: "right", mr: 2, mb: 1, olor: "#5B8C5A" }}
        >
          Done
        </Button>
      </Dialog>
    </Container>
  );
};

export default AssessmentDetails;
