/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import HeaderSection from "./HeaderSection";
import CoursesList from "./CoursesList";
import PaginationControl from "./PaginationControl";
import DailyReportModal from "./DailyReportModal";
import PendingSubmissionsModal from "./PendingSubmissionsModal";
import ReportModalComponent from "./ReportModalComponent";

// Define types for CourseDetails and Report
interface Course {
  courseId: number;
  courseName: string;
  timeTaken: number; // Assuming timeTaken is a number representing minutes
  id: number; // dailyReportId or unique identifier for the course report
}

interface CourseDetails {
  courseId: number;
  courseName: string;
  // Add other properties if necessary
}

export interface Report { // Export the Report type for consistent use across components
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  keyLearnings: string;
  planForTomorrow: string;
}

const DailyReportContainer: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]); // Fix: changed from string[] to Course[]
  const [searchTerm, setSearchTerm] = useState("");
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openPendingModal, setOpenPendingModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [traineeId, setTraineeId] = useState<number | null>(null); // Fetch traineeId from local storage
  const coursesPerPage = 5;

  // State for holding course details for the modal
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);

  useEffect(() => {
    // Fetch traineeId from local storage
    const storedTraineeId = localStorage.getItem("traineeId");
    if (storedTraineeId) {
      setTraineeId(Number(storedTraineeId));
    }
  }, []);

  useEffect(() => {
    if (traineeId) {
      const fetchCourses = async () => {
        try {
          const batchResponse = await fetch("https://ilpex-backend.onrender.com/api/v1/batches");
          const batches = await batchResponse.json();

          // Find the active batch
          const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
          if (!activeBatch) {
            console.error("No active batch found");
            return;
          }

          const dateStr = formatDateToApiFormat(selectedDate);
          const response = await fetch(
            `https://ilpex-backend.onrender.com/api/v1/dailyreport/courseDetails?courseDate=${dateStr}&batchId=${activeBatch.id}&traineeId=${traineeId}`
          );
          const data = await response.json();

          // Assuming the API returns an array of objects matching the `Course` interface
          const mappedCourses: Course[] = data.map((course: any) => ({
            courseId: course.courseId,
            courseName: course.courseName,
            timeTaken: course.timeTaken,
            id: course.id, // Ensure this is correct based on your API response
          }));

          setCourses(mappedCourses); // Fix: Map data correctly to Course[]
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [selectedDate, traineeId]);

  const handleOpenReportModal = async (
    courseId: number,
    courseName: string,
    dailyReportId: number
  ) => {
    try {
      const response = await fetch(
        `https://ilpex-backend.onrender.com/api/v1/dailyreport/editDetails?dailyReportId=${dailyReportId}`
      );
      const data = await response.json();
      console.log("Fetched course details:", data);
      setCourseDetails({ ...data, courseId, courseName });
      setOpenReportModal(true);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleCloseReportModal = () => {
    setOpenReportModal(false);
    setCourseDetails(null);
  };

  const handleOpenPendingModal = () => setOpenPendingModal(true);
  const handleClosePendingModal = () => setOpenPendingModal(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Pagination logic
  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // State for handling the ReportModalComponent
  const [openReportViewModal, setOpenReportViewModal] = useState(false);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);

  const handleOpenReportViewModal = (report: Report) => {
    setCurrentReport({
      ...report,
      day: report.day || "",
      course: report.course || "",
      timeTaken: report.timeTaken || "",
      status: report.status || "",
      keyLearnings: report.keyLearnings || "",
      planForTomorrow: report.planForTomorrow || "",
    });
    setOpenReportViewModal(true);
  };

  const handleCloseReportViewModal = () => {
    setOpenReportViewModal(false);
    setCurrentReport(null);
  };

  const handlePreviousReport = () => {
    // Logic to navigate to the previous report
  };

  const handleNextReport = () => {
    // Logic to navigate to the next report
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Container sx={{ overflowY: "auto", maxHeight: "80vh" }}>
        <HeaderSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          handleOpenPendingModal={handleOpenPendingModal}
        />
        <Paper
          sx={{
            backgroundColor: "#f2eff9",
            padding: 2,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <CoursesList
            courses={currentCourses}
            handleOpenReportModal={handleOpenReportModal}
            handleOpenReportViewModal={handleOpenReportViewModal} // Pass down the function
          />
          <PaginationControl
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Container>

      <DailyReportModal
        open={openReportModal}
        handleClose={handleCloseReportModal}
        courseName={courseDetails?.courseName || ""}
        courseDetails={courseDetails}
        setCourseDetails={setCourseDetails}
        traineeId={traineeId ?? 0} // Provide fallback value if traineeId is null
        courseId={courseDetails?.courseId || 0}
      />

      <PendingSubmissionsModal
        open={openPendingModal}
        handleClose={handleClosePendingModal}
      />

      {currentReport && (
        <ReportModalComponent
          open={openReportViewModal}
          onClose={handleCloseReportViewModal}
          report={currentReport}
          onPrevious={handlePreviousReport}
          onNext={handleNextReport}
        />
      )}
    </Box>
  );
};

export default DailyReportContainer;

function formatDateToApiFormat(date: Date | null) {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T00:00:00`;
}
