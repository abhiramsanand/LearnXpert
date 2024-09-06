import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

interface TraineeCourseReportData {
  traineeName: string;
  totalDuration: string;
  estimatedDuration: string;
  totalCourses: number;
  lastDayNumber: number;
}

interface TraineeCourseReportProps {
  batchId: number;
}

const TraineeCourseReport: React.FC<TraineeCourseReportProps> = ({
  batchId,
}) => {
  const theme = useTheme();
  const [reportData, setReportData] = useState<TraineeCourseReportData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedField, setSortedField] = useState<
    keyof TraineeCourseReportData | null
  >(null);

  const fetchReportData = useCallback(async () => {
    try {
      // Fetch the total course duration
      const totalDurationResponse = await fetch(
        `http://localhost:8080/api/courses/total-duration/${batchId}`
      );
      const totalDurationData = await totalDurationResponse.json();

      // Fetch the course duration per trainee
      const courseDurationResponse = await fetch(
        `http://localhost:8080/api/v1/ilpex/traineeprogress/course-duration?batchId=${batchId}`
      );
      const courseDurationData = await courseDurationResponse.json();

      // Fetch the total days completed per batch
      const totalDaysCompletedResponse = await fetch(
        `http://localhost:8080/api/courses/total-course-days-completed/${batchId}`
      );
      const totalDaysCompletedData = await totalDaysCompletedResponse.json();

      // Fetch trainee's last day completed
      const lastDayCompletedResponse = await fetch(
        `http://localhost:8080/api/trainees/batch/15/currentday`
      );
      const lastDayCompletedData = await lastDayCompletedResponse.json();

      // Combine data and map each trainee's last day completed
      const combinedData: TraineeCourseReportData[] = courseDurationData.map(
        (course: any) => {
          const lastDayNumber =
            lastDayCompletedData.find(
              (data: any) => data.traineeName === course.traineeName
            )?.lastDayNumber || 0;

          return {
            traineeName: course.traineeName,
            totalDuration: formatMinutesToHours(
              totalDurationData.totalDurationMinutes
            ),
            estimatedDuration: formatSecondsToHours(course.totalCourseDuration),
            totalCourses: totalDaysCompletedData.totalCourseDaysCompleted,
            lastDayNumber: lastDayNumber,
          };
        }
      );

      setReportData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [batchId]);

  useEffect(() => {
    fetchReportData();
  }, [batchId, fetchReportData]);

  const handleSort = (field: keyof TraineeCourseReportData) => {
    if (field === "totalDuration" || field === "totalCourses") return;

    const newSortOrder =
      sortedField === field && sortOrder === "asc" ? "desc" : "asc";

    const sortedData = [...reportData].sort((a, b) => {
      let aValue: number | string = a[field];
      let bValue: number | string = b[field];

      if (field === "estimatedDuration") {
        // Convert time duration to total minutes for comparison
        const aMinutes = timeToMinutes(aValue as string);
        const bMinutes = timeToMinutes(bValue as string);
        aValue = aMinutes;
        bValue = bMinutes;
      }

      if (aValue < bValue) return newSortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setReportData(sortedData);
    setSortOrder(newSortOrder);
    setSortedField(field);
  };

  // Function to convert time duration string (e.g., "8h 28m") to total minutes
  const timeToMinutes = (time: string): number => {
    const [hoursPart, minutesPart] = time.split(" ");
    const hours = parseInt(hoursPart.replace("h", ""), 10) || 0;
    const minutes = parseInt(minutesPart.replace("m", ""), 10) || 0;
    return hours * 60 + minutes;
  };

  const filteredData = useMemo(
    () =>
      reportData.filter((item) =>
        item.traineeName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, reportData]
  );

  const getTextStyle = (totalCourses: number, lastDayNumber: number) => {
    const difference = totalCourses - lastDayNumber;
    if (difference > 4) {
      return {
        backgroundColor: "#DB5461",
        color: "#fff",
        padding: "2px",
        borderRadius: "2px",
        width: "13%",
      };
    } else if (difference > 0) {
      return {
        backgroundColor: "#E5A9A9",
        color: "#000",
        padding: "2px",
        borderRadius: "2px",
        width: "13%",
      };
    } else {
      return { backgroundColor: "transparent", color: "#000" };
    }
  };

  const formatMinutesToHours = (minutes: number): string => {
    if (isNaN(minutes)) return "0h 0m";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatSecondsToHours = (seconds: number): string => {
    if (isNaN(seconds)) return "0h 0m";
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          mt: "-40px",
          gap: "180px",
        }}
      >
        <Typography
          sx={{
            color: "#8061C3",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          BATCH REPORTS
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search by trainee name..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              padding: "4px 8px",
              width: "100%",
              height: "30px",
              backgroundColor: "#f0f0f0",
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

      <TableContainer
        component={Paper}
        sx={{
          marginTop: "15px",
          maxHeight: "calc(100vh - 190px)",
          overflowY: "auto",
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
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#F1EDEE",
              zIndex: theme.zIndex.appBar, // Ensure it's above the table body
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("traineeName")}
              >
                <Box display="flex" alignItems="center" gap="4px">
                  Trainee Name
                  <SwapVertIcon fontSize="small" />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                }}
              >
                Total Course Duration
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("estimatedDuration")}
              >
                <Box display="flex" alignItems="center" gap="4px">
                  Total Trainee Watchtime
                  <SwapVertIcon fontSize="small" />
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                }}
              >
                Total days
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#F1EDEE",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("lastDayNumber")}
              >
                <Box display="flex" alignItems="center" gap="4px">
                  Days Completed
                  <SwapVertIcon fontSize="small" />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.traineeName}>
                <TableCell>{row.traineeName}</TableCell>
                <TableCell>{row.totalDuration}</TableCell>
                <TableCell>{row.estimatedDuration}</TableCell>
                <TableCell>{row.totalCourses}</TableCell>
                <TableCell>
                  <Typography
                    sx={getTextStyle(row.totalCourses, row.lastDayNumber)}
                  >
                    {row.lastDayNumber}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TraineeCourseReport;
