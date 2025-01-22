/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import ReportModalComponent from "./ReportModalComponent";
import { Report } from "./DailyReportContainer"; 

// Define Course type to avoid using 'any'
interface Course {
  courseId: number;
  courseName: string;
  timeTaken: number; 
  id: number; 
}

interface CoursesListProps {
  courses: Course[];
  handleOpenReportModal: (
    courseId: number,
    courseName: string,
    dailyReportId: number
  ) => void;
  handleOpenReportViewModal: (report: Report) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, handleOpenReportModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const formatTimeTaken = (time: number) => {
    if (time === null || time === undefined) return "No Data";

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : ""}${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  };

  const handleViewReport = async (dailyReportId: number, _courseId: number) => {
    try {
      const response = await axios.get(
        `https://ilpex-backend.onrender.com/api/v1/dailyreport/editDetails?dailyReportId=${dailyReportId}`
      );
      console.log("Fetched report data:", response.data);
  
      const reportData = response.data;
  
      setSelectedReport({
        day: reportData.day || "", 
        course: reportData.courseName || "",
        timeTaken: formatTimeTaken(reportData.timeTaken),
        status: reportData.status || "", 
        keyLearnings: reportData.keylearnings || "", 
        planForTomorrow: reportData.planfortomorrow || "", 
      });
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching report details:", error);
    }
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReport(null);
  };

  return (
    <>
      <Grid container spacing={0.5}>
        {courses.length === 0 ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100px">
              <Typography variant="body1">No courses available for this date</Typography>
            </Box>
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid item xs={12} key={course.courseId}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    p: "0 8px",
                    minHeight: "0",
                    "&:last-child": { paddingBottom: 0 },
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ lineHeight: 1 }}>
                        {course.courseName}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "center" }}>
                      <Typography variant="body2">
                        {formatTimeTaken(course.timeTaken)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        onClick={() => handleOpenReportModal(course.courseId, course.courseName, course.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        disabled={!course.timeTaken}
                        onClick={() => handleViewReport(course.id, course.courseId)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {selectedReport && (
        <ReportModalComponent
          open={openModal}
          onClose={handleCloseModal}
          report={selectedReport}
          onPrevious={() => {}}
          onNext={() => {}}
        />
      )}
    </>
  );
};

export default CoursesList;
