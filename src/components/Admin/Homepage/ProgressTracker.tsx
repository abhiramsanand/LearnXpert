import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TraineeModal from "./Modals/ProgressModal";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { display: true },
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
    y: {
      grid: { display: true, color: "#EEE7FF" },
      ticks: { display: true },
    },
  },
  barThickness: 20,
};

const ProgressTracker: React.FC = () => {
  const [progressData, setProgressData] = useState({
    behind: 0,
    onTrack: 0,
    ahead: 0,
  });
  const [trainees, setTrainees] = useState<
    Array<{ traineeName: string; traineeDayNumber: number }>
  >([]);
  const [batchDayNumber, setBatchDayNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all batches
        const batchResponse = await fetch("http://localhost:8080/api/v1/batches");
        const batchData = await batchResponse.json();
        
        // Find the active batch
        const activeBatch = batchData.find((batch: { isActive: boolean }) => batch.isActive);
        if (!activeBatch) {
          console.error("No active batch found");
          return;
        }

        setBatchDayNumber(activeBatch.dayNumber);  // Correctly set batchDayNumber from active batch

        // Fetch progress data for trainees in the active batch
        const traineeResponse = await fetch(`http://localhost:8080/api/trainees/batch/${activeBatch.id}/currentday`);
        const traineeData = await traineeResponse.json();

        let behind = 0;
        let onTrack = 0;
        let ahead = 0;

        for (const trainee of traineeData) {
          const { lastDayNumber } = trainee;

          if (lastDayNumber < activeBatch.dayNumber) {
            behind++;
          } else if (lastDayNumber === activeBatch.dayNumber) {
            onTrack++;
          } else {
            ahead++;
          }
        }

        const progress = { behind, onTrack, ahead };
        setProgressData(progress);
        setTrainees(
          traineeData.map((trainee: { traineeName: string; lastDayNumber: number }) => ({
            traineeName: trainee.traineeName,
            traineeDayNumber: trainee.lastDayNumber,
          }))
        );

        localStorage.setItem(
          "traineeProgressData",
          JSON.stringify({
            data: { progress, trainees: traineeData, batchDayNumber: activeBatch.dayNumber },
            timestamp: new Date().getTime(),
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Behind", "On Track", "Ahead"],
    datasets: [
      {
        data: [progressData.behind, progressData.onTrack, progressData.ahead],
        backgroundColor: ["#DB5461", "#F4E4BA", "#5B8C5A"],
        borderColor: ["rgba(128, 97, 195, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      onClick={() => setModalOpen(true)}
      display="flex"
      flexDirection="column"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
      height="190px"
      alignContent="center"
      sx={{
        borderRadius: "5px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          cursor: "pointer",
        },
      }}
    >
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          paddingX="200px"
          sx={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "35%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, rgba(128, 97, 195, 0.3), transparent)`,
              animation: "slide 1.5s infinite",
            }}
          />
          <style>
            {`
              @keyframes slide {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
            `}
          </style>
        </Box>
      ) : (
        <>
          <Typography sx={{ color: "#8061C3", fontSize: "12px", textAlign: "center", mt: 2 }}>
            Trainee Progress Tracker
          </Typography>
          <Box width="100%" height="90%" sx={{ px: "45px" }}>
            <Bar options={options} data={data} />
          </Box>
          <Box
            width="100%"
            height="10%"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          ></Box>
        </>
      )}
      <TraineeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        batchDayNumber={batchDayNumber}
        trainees={trainees}
      />
    </Box>
  );
};

export default ProgressTracker;
