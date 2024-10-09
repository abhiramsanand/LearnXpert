import React, { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import HeaderSection from "./HeaderSection";
import CoursesList from "./CoursesList";
import PaginationControl from "./PaginationControl";
import DailyReportModal from "./DailyReportModal";
import PendingSubmissionsModal from "./PendingSubmissionsModal";
import ReportModalComponent from "./ReportModalComponent";

const DailyReportContainer: React.FC = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openPendingModal, setOpenPendingModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [batchId, setBatchId] = useState<number | null>(null); // No longer hardcoded
  const [traineeId, setTraineeId] = useState<number | null>(null); // Fetch traineeId from local storage
  const coursesPerPage = 3;

  // State for holding course details for the modal
  const [courseDetails, setCourseDetails] = useState<string | null>(null);

  // Fetch the active batch ID
  useEffect(() => {
    const fetchActiveBatch = async () => {
      try {
        const batchResponse = await fetch("http://localhost:8080/api/v1/batches");
        const batches = await batchResponse.json();
        const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
        if (activeBatch) {
          setBatchId(activeBatch.batchId); // Set the active batch ID
        } else {
          console.error("No active batch found");
        }
      } catch (error) {
        console.error("Error fetching active batch:", error);
      }
    };

    fetchActiveBatch();
  }, []);

  useEffect(() => {
    // Fetch traineeId from local storage
    const storedTraineeId = localStorage.getItem("traineeId");
    if (storedTraineeId) {
      setTraineeId(Number(storedTraineeId));
    }
  }, []);

  useEffect(() => {
    if (traineeId && batchId !== null) {
      const fetchCourses = async () => {
        try {
          const dateStr = formatDateToApiFormat(selectedDate);
          const response = await fetch(
            `http://localhost:8080/api/v1/dailyreport/courseDetails?courseDate=${dateStr}&batchId=${batchId}&traineeId=${traineeId}`
          );
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [selectedDate, batchId, traineeId]);

  const handleOpenReportModal = async (
    courseId: number,
    courseName: string,
    dailyReportId: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/dailyreport/editDetails?dailyReportId=${dailyReportId}`
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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
    setCurrentReport(report);
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
        traineeId={traineeId}
        courseId={courseDetails?.courseId || 0}
      />

      <PendingSubmissionsModal
        open={openPendingModal}
        handleClose={handleClosePendingModal}
      />

      {/* ReportModalComponent */}
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
