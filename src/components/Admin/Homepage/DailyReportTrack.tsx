import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import ReportModal from "./Modals/DailyReportModal"; // Import the modal component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DailyReportTrack: React.FC = () => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [traineesData, setTraineesData] = useState<any[]>([]);

  useEffect(() => {
    const cacheKey = "dailyReportTrack_allBatches";
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 0 * 60 * 60 * 1000; // 1 hour

      if (now - parseInt(cachedTimestamp) < oneHour) {
        const { percentage, data } = JSON.parse(cachedData);
        setSpeedPercentage(percentage);
        setTraineesData(data);
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    fetch("http://localhost:8080/api/trainees/reports?batchId=15")
      .then((response) => response.json())
      .then((traineeData) => {
        const totalTrainees = traineeData.length;
        let laggingCount = 0;

        traineeData.forEach((trainee: any) => {
          if (trainee.totalDailyReports < trainee.totalCourses) {
            laggingCount += 1;
          }
        });

        const percentage = (laggingCount / totalTrainees) * 100;
        setSpeedPercentage(Math.round(percentage));
        setTraineesData(traineeData);

        // Cache the data
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ percentage: Math.round(percentage), data: traineeData })
        );
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trainee data:", error);
        setLoading(false);
      });
  }, []);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const data = {
    datasets: [
      {
        label: "Percentage of Trainees Behind",
        data: [speedPercentage, 100 - speedPercentage],
        backgroundColor: ["#5B8C5A", "#EDF3ED"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
        height="190px"
        width="40%"
        position="relative"
        gap="15px"
        sx={{
          overflow: "hidden",
          borderRadius: "5px",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleModalOpen} // Open modal on click
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            paddingX="100px"
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "200px",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(128, 97, 195, 0.3), transparent)",
                animation: "slide 1.5s infinite",
              }}
            />
            <style>
              {`
              @keyframes slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              `}
            </style>
          </Box>
        ) : (
          <>
            <Typography sx={{ color: "#8061C3", fontSize: "12px" }}>
              Pending Daily Reports
            </Typography>
            <Box width="250px" height="70%">
              <Doughnut data={data} options={options} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "20px", color: "black" }}>
                {speedPercentage}%
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Render the modal */}
      <ReportModal open={modalOpen} handleClose={handleModalClose} trainees={traineesData} />
    </>
  );
};

export default DailyReportTrack;
