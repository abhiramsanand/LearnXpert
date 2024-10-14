/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import SortByComponent from "../../components/Admin/DailyReport/SortByComponent";
import ReportsTableComponent from "../../components/Admin/DailyReport/ReportTable";
import BackButtonComponent from "../../components/Admin/DailyReport/BackButtonComponent";
import axios from "axios";
import { Report } from '../../shared components/Types'; // Importing the Report type

const AdminReportPage: React.FC = () => {
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const traineeId = localStorage.getItem("traineeId");
        const batchResponse = await fetch("http://localhost:8080/api/v1/batches");
        const batches = await batchResponse.json();

        // Find the active batch
        const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
        if (!activeBatch) {
          console.error("No active batch found");
          return;
        }
        if (!traineeId) {
          console.error("No traineeId found in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/courses/WholeReport/${traineeId}/batch/${activeBatch.id}`
        );

        const reports: Report[] = response.data.map((course: any) => ({
          day: new Date(course.courseDate).toISOString().slice(0, 10), // Convert to ISO string
          course: course.courseName,
          timeTaken: course.timeTaken.toString(),
          dailyReportId: course.dailyReportId,
          status: course.timeTaken > 0 ? "completed" : "pending", // Conditionally set status
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
    const sortedReports = [...filteredReports].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue); // String comparison
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return aValue - bValue; // Numeric comparison
      }

      return 0; // Default return if types are mixed or uncomparable
    });

    setFilteredReports(sortedReports);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
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
          <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            Whole Report
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, ml: "auto", mt: 1 }}>
          <SortByComponent
            onSortChange={handleSortChange} // Pass the correct sorting function
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
