import React, { useState } from "react";
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
  Avatar,
  TextField,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DateSelector from "./DateSelector";
import Data from "./data.json"; // Import the JSON data
import DailyReportModal from "./DailyReportModal"; // Import the daily report modal component
import PendingSubmissionsModal from "./PendingSubmissionsModal"; // Import the pending submissions modal component
import pendingSubmissions from "./PendingData.json";

const DailyReportContainer: React.FC = () => {
  const [courses, setCourses] = useState(Data); // Load data from JSON
  const [searchTerm, setSearchTerm] = useState("");
  const [openReportModal, setOpenReportModal] = useState(false); // State to control report modal visibility
  const [openPendingModal, setOpenPendingModal] = useState(false); // State to control pending submissions modal visibility
  const [page, setPage] = useState(1); // State for pagination
  const coursesPerPage = 4;

  const handleOpenReportModal = () => setOpenReportModal(true);
  const handleCloseReportModal = () => setOpenReportModal(false);

  const handleOpenPendingModal = () => setOpenPendingModal(true);
  const handleClosePendingModal = () => setOpenPendingModal(false);

  // Pagination logic
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Daily Report
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "200px", // Set a fixed width similar to DateSelector
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 20,
                border: '2px solid #8061C3',
                height: "30px"
              }
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <DateSelector />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8061C3",
              textTransform: "none",
              height: "40px", // Ensure the button height matches other elements
              borderRadius: "20px",
            }}
            onClick={handleOpenReportModal}
          >
            View Whole Report
          </Button>

          <Badge
            badgeContent={pendingSubmissions.length} // Number of pending submissions
            color="error"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8061C3",
                textTransform: "none",
                height: "40px", // Ensure the button height matches other elements
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
                    }}
                  >
                    <Grid container alignItems="center">
                      {/* Course Name on the Left */}
                      <Grid item xs={4}>
                        <Typography variant="body2">{course.name}</Typography>
                      </Grid>

                      {/* Duration Time Centered */}
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography variant="body2">
                          {course.duration || "No Data"}
                        </Typography>
                      </Grid>

                      {/* Edit and View Icons on the Right */}
                      <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <IconButton disabled={!course.duration}>
                            <EditIcon />
                          </IconButton>
                          <IconButton disabled={!course.duration}>
                            <VisibilityIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
  
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <IconButton onClick={handleOpenReportModal}>
                <Avatar sx={{ backgroundColor: "#8061C3" }}>+</Avatar>
              </IconButton>
            </Box>
  
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          </Box>
        </Container>
        <DailyReportModal open={openReportModal} handleClose={handleCloseReportModal} />
        <PendingSubmissionsModal open={openPendingModal} handleClose={handleClosePendingModal} />
      </Box>
    );
  };
  
  export default DailyReportContainer;
  
