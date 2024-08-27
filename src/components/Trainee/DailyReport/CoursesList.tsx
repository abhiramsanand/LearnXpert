import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import DailyReportModal from "./DailyReportModal"; // Make sure to import your modal
import ReportModalComponent from "./ReportModalComponent";

interface CoursesListProps {
  courses: any[];
  handleOpenReportModal: (courseId: number, courseName: string) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, handleOpenReportModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const formatTimeTaken = (time: number) => {
    if (time === null || time === undefined) return "No Data";

    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''}${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  const handleViewReport = async (dailyReportId: number,courseId:number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/dailyreport/editDetails?dailyReportId=${dailyReportId}`);
      const reportData = response.data;
  
      // Debugging log
      console.log("Fetched report data:", reportData);
  
      setSelectedReport({ ...reportData, courseId });
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching report details:", error);
  
      // Further debugging
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      }
    }
  };
  
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReport(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  p: 1,
                  height: "auto",
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
                    <IconButton onClick={() => handleOpenReportModal(course.courseId, course.courseName,course.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton disabled={!course.timeTaken} onClick={() => handleViewReport(course.id,course.courseId)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedReport && (
        <ReportModalComponent
          open={openModal}
          onClose={handleCloseModal}
          report={{
            course: selectedReport.courseName,
            timeTaken: formatTimeTaken(selectedReport.timeTaken),
            keyLearnings: selectedReport.keylearnings,
            planForTomorrow: selectedReport.planfortomorrow,
            status: "", // Add other necessary fields if available
            day: "", // Add other necessary fields if available
          }}
          onPrevious={() => {}} // Implement if needed
          onNext={() => {}} // Implement if needed
        />
      )}
    </>
  );
};

export default CoursesList;
