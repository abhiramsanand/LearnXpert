import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import SortByComponent from "../../components/Admin/DailyReport/SortByComponent";
import ReportsTableComponent from "../../components/Admin/DailyReport/ReportTable";
import BackButtonComponent from "../../components/Admin/DailyReport/BackButtonComponent";
import axios from "axios";

interface Report {
  day: string;
  course: string;
  timeTaken: string;
  status: string;
  dailyReportId: number;
  keyLearnings: string;
  planForTomorrow: string;
}

const AdminReportPage: React.FC = () => {
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const batchId = 3;
        const traineeId = localStorage.getItem("traineeId");

        if (!traineeId) {
          console.error("No traineeId found in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/courses/WholeReport/${traineeId}/batch/${batchId}`
        );

        const reports: Report[] = response.data.map((course: any) => ({
          day: new Date(course.courseDate).toISOString().slice(0, 10), // Updated line
          course: course.courseName,
          timeTaken: course.timeTaken.toString(),
          dailyReportId: course.dailyReportId,
          status: course.timeTaken > 0 ? "completed" : "pending", // Updated line
          keyLearnings: course.keyLearnings || "",
          planForTomorrow: course.planForTomorrow || "",
        }));

        setFilteredReports(reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSortChange = (sortBy: keyof Report) => {
    const sortedReports = [...filteredReports].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
    setFilteredReports(sortedReports);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 1, display: "flex", alignItems: "center", mt: "20px" }}>
        <BackButtonComponent />
        <Box sx={{ ml: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
          >
            Daily Report
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, ml: "auto", mt: 1 }}>
          <SortByComponent
            onSortChange={handleSortChange}
            sx={{ width: 50, height: 40 }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <ReportsTableComponent reports={filteredReports} />
      </Box>
    </Container>
  );
};

export default AdminReportPage;
