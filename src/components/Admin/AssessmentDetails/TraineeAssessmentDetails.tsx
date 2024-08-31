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
  DialogActions,
  Checkbox,
  FormControlLabel,
  Skeleton,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

interface Assessment {
  assessmentName: string;
}

interface TraineeAssessment {
  traineeName: string;
  traineeScore: number;
  traineeStatus: string;
  assessmentName: string;
}

const AssessmentDetails: React.FC<{ batchId: number }> = ({ batchId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [traineeAssessments, setTraineeAssessments] = useState<
    TraineeAssessment[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/ilpex/assessments/details?batchId=15"
        );
        const fetchedAssessments = response.data.data;
        setAssessments(fetchedAssessments);

        if (fetchedAssessments.length > 0) {
          const latestAssessmentName = fetchedAssessments[0].assessmentName;
          setSelectedAssessment(latestAssessmentName);
          fetchTraineeAssessments(latestAssessmentName);
        }
      } catch (error) {
        console.error("Error fetching assessments data:", error);
        setError("Failed to fetch assessments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [batchId]);

  const fetchTraineeAssessments = async (assessmentName: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/ilpex/trainee-assessments"
      );
      const filteredData = response.data.data.filter(
        (assessment: TraineeAssessment) =>
          assessment.assessmentName === assessmentName
      );
      setTraineeAssessments(filteredData);
    } catch (error) {
      console.error("Error fetching trainee assessments data:", error);
      setError("Failed to fetch trainee assessments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssessmentChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const assessmentName = event.target.value as string;
    setSelectedAssessment(assessmentName);
    setError(null);
    fetchTraineeAssessments(assessmentName);
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

  const applyFilters = () => {
    handleFilterClose();
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAssessments = React.useMemo(() => {
    let sortableAssessments = [...traineeAssessments];
    if (sortConfig.key) {
      sortableAssessments.sort((a, b) => {
        if (
          a[sortConfig.key as keyof TraineeAssessment] <
          b[sortConfig.key as keyof TraineeAssessment]
        ) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof TraineeAssessment] >
          b[sortConfig.key as keyof TraineeAssessment]
        ) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssessments;
  }, [traineeAssessments, sortConfig]);

  const filteredAssessments = sortedAssessments
    .filter((trainee) =>
      trainee.traineeName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((trainee) => {
      if (selectedScores.length === 0) return true;
      if (selectedScores.includes("100") && trainee.traineeScore === 100)
        return true;
      if (
        selectedScores.includes("90-100") &&
        trainee.traineeScore >= 90 &&
        trainee.traineeScore < 100
      )
        return true;
      if (
        selectedScores.includes("80-90") &&
        trainee.traineeScore >= 80 &&
        trainee.traineeScore < 90
      )
        return true;
      if (selectedScores.includes("below 80") && trainee.traineeScore < 80)
        return true;
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
                sx={{ color: "#8061C3" }}
              >
                Select Assessment
              </InputLabel>
              <Select
                label="Select Assessment"
                value={selectedAssessment}
                onChange={handleAssessmentChange}
                inputProps={{
                  id: "assessment-select",
                }}
              >
                {assessments.map((assessment, index) => (
                  <MenuItem key={index} value={assessment.assessmentName}>
                    {assessment.assessmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              gap: "20px",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={handleFilterOpen}
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
            <TextField
              placeholder="Search Trainee"
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              sx={{
                "& .MuiInputBase-root": {
                  padding: "4px 8px",
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8061C3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#A281EA",
                  "&.Mui-focused": {
                    color: "#8061C3",
                  },
                },
                mr: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        {loading ? (
          <Box sx={{ mt: 2 }}>
            <Skeleton
              variant="rectangular"
              height={50}
              animation="wave"
              sx={{
                backgroundColor: "#d3d3d3", // Light grey color
              }}
            />
            <Skeleton
              variant="rectangular"
              height={50}
              animation="wave"
              sx={{
                mt: 1,
                backgroundColor: "#d3d3d3", // Light grey color
              }}
            />
            <Skeleton
              variant="rectangular"
              height={50}
              animation="wave"
              sx={{
                mt: 1,
                backgroundColor: "#d3d3d3",
              }}
            />
          </Box>
        ) : filteredAssessments.length === 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" align="center" sx={{ color: "#DB5461" }}>
              Nothing to show
            </Typography>
            {/* First Row */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
            </Box>
            {/* Second Row */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
              <Skeleton
                variant="rectangular"
                height={50}
                width="30%"
                animation="wave"
                sx={{ backgroundColor: "#d3d3d3", mx: 1 }} // Light grey color
              />
            </Box>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      onClick={() => handleSort("traineeName")}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#4A4A4A",
                        fontSize: "14px",
                      }}
                    >
                      Trainee Name
                      <SwapVertIcon
                        fontSize="small"
                        sx={{ ml: 1, color: "#4A4A4A" }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      onClick={() => handleSort("traineeScore")}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#4A4A4A",
                        fontSize: "14px",
                      }}
                    >
                      Score
                      <SwapVertIcon
                        fontSize="small"
                        sx={{ ml: 1, color: "#4A4A4A" }}
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      onClick={() => handleSort("traineeStatus")}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#4A4A4A",
                        fontSize: "14px",
                      }}
                    >
                      Status
                      <SwapVertIcon
                        fontSize="small"
                        sx={{ ml: 1, color: "#4A4A4A" }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAssessments.map((trainee, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#F9F6F7" : "#F9F9F9",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                      borderBottom: "1px solid #E0E0E0",
                    }}
                  >
                    <TableCell sx={{ padding: "12px" }}>
                      {trainee.traineeName}
                    </TableCell>
                    <TableCell sx={{ padding: "12px" }}>
                      {trainee.traineeScore}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px",
                        color:
                          trainee.traineeStatus === "Completed"
                            ? "#5B8C5A"
                            : trainee.traineeStatus === "Pending"
                            ? "#DB5461"
                            : "#4A4A4A",
                        fontWeight: "bold",
                      }}
                    >
                      {trainee.traineeStatus}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {/* Filter Dialog */}
      <Dialog open={openFilter} onClose={handleFilterClose}>
        <DialogTitle sx={{ color: "#5B8C5A" }}>
          Filter Trainee Assessments
        </DialogTitle>
        <DialogContent>
          <Typography>By Score</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScores.includes("100")}
                onChange={() => handleScoreChange("100")}
              />
            }
            label="100"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScores.includes("90-100")}
                onChange={() => handleScoreChange("90-100")}
              />
            }
            label="90-100"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScores.includes("80-90")}
                onChange={() => handleScoreChange("80-90")}
              />
            }
            label="80-90"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedScores.includes("below 80")}
                onChange={() => handleScoreChange("below 80")}
              />
            }
            label="Below 80"
          />
          <Typography>By Status</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStatuses.includes("completed")}
                onChange={() => handleStatusChange("completed")}
              />
            }
            label="Completed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStatuses.includes("pending")}
                onChange={() => handleStatusChange("pending")}
              />
            }
            label="pending"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClose} sx={{ color: "#DB5461" }}>
            Cancel
          </Button>
          <Button onClick={applyFilters} sx={{ color: "#5B8C5A" }}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AssessmentDetails;
