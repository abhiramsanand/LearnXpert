/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Card,
  CardContent,
  Grid,
  Pagination,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DateSelector from "./DateSelector";
import DailyReportModal from "./DailyReportModal";
import PendingSubmissionsModal from "./PendingSubmissionsModal";
 
const DailyReportContainer: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openPendingModal, setOpenPendingModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [batchId] = useState(15); // Assuming a batchId of 7
  const [traineeId] = useState(1307); // Assuming a traineeId of 1
  const coursesPerPage = 3;
 
  // State for holding course details for the modal
  const [courseDetails, setCourseDetails] = useState<any>(null);
 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const dateStr = formatDateToApiFormat(selectedDate); // Convert date to the required API format
        const response = await fetch(
          `http://localhost:8080/api/v1/dailyreport/courseDetails?courseDate=${dateStr}&batchId=${batchId}&traineeId=${traineeId}`
        );
        const data = await response.json();
        setCourses(data); // Assuming the API returns an array of courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
 
    fetchCourses();
  }, [selectedDate, batchId, traineeId]); // Fetch courses when the selected date, batchId, or traineeId changes
 
  const handleOpenReportModal = async (ReportId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/dailyreport/editDetails?dailyReportId=${ReportId}`);
      console.log("Selected Course ID:", ReportId);
      console.log("api :", `http://localhost:8080/api/v1/dailyreport/editDetails?dailyReportId=${ReportId}`);
      const data = await response.json();
      setCourseDetails(data); // Set the fetched course details
      setOpenReportModal(true);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
 
  const handleCloseReportModal = () => {
    setOpenReportModal(false);
    setCourseDetails(null); // Reset course details when modal is closed
  };
 
  const handleOpenPendingModal = () => setOpenPendingModal(true);
  const handleClosePendingModal = () => setOpenPendingModal(false);
 
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
 
  // Pagination logic
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);
 
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
 
  function formatDateToApiFormat(date: Date | null) {
    if (!date) return null; // Handle cases where the date is null or undefined
 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
 
    return `${year}-${month}-${day}T00:00:00`;
  }
 
  // Function to format time taken into hours and minutes
  const formatTimeTaken = (time: number) => {
    if (time === null || time === undefined) return "No Data";
 
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
 
    return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''}${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };
 
  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Container sx={{ overflowY: "auto", maxHeight: "80vh" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ mt: 1 }} gutterBottom>
            Daily Report
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "200px",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 20,
                border: "2px solid #8061C3",
                height: "30px",
              },
            }}
          />
        </Box>
 
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />
 
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8061C3",
              textTransform: "none",
              height: "40px",
              borderRadius: "20px",
            }}
          >
            View Whole Report
          </Button>
 
          <Badge badgeContent={0} color="error">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8061C3",
                textTransform: "none",
                height: "40px",
                borderRadius: "20px",
              }}
              onClick={handleOpenPendingModal}
            >
              Pending Submissions
            </Button>
          </Badge>
        </Box>
 
        <Box
          sx={{
            backgroundColor: "#f3e8ff",
            borderRadius: 2,
            p: 3,
            flexGrow: 1,
            overflow: "auto", // Enable scrolling for the inner box
          }}
        >
          <Grid container spacing={2}>
            {currentCourses.map((course, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ffffff",
                      p: 1,
                      height: "auto", // Set to auto to adjust based on content
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="body2">{course.courseName}</Typography>
                      </Grid>
 
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography variant="body2">
                          {formatTimeTaken(course.timeTaken)}
                        </Typography>
                      </Grid>
 
                      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={() => handleOpenReportModal(course.id)}> {/* Pass course ID */}
                          <EditIcon />
                        </IconButton>
                        <IconButton disabled={!course.timeTaken}>
                          <VisibilityIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
 
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  background: "#8061C3",
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>
      </Container>
      <DailyReportModal open={openReportModal} handleClose={handleCloseReportModal} courseDetails={courseDetails} /> {/* Pass course details */}
      <PendingSubmissionsModal open={openPendingModal} handleClose={handleClosePendingModal} />
    </Box>
  );
};
 
export default DailyReportContainer;