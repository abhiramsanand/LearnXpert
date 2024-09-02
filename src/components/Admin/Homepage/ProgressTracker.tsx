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
import TraineeModal from "./Modals/ProgressModal"; // Import the modal component

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
      const storedData = localStorage.getItem("traineeProgressData");
      const currentTime = new Date().getTime();

      if (storedData) {
        const { data, timestamp } = JSON.parse(storedData);
        if (currentTime - timestamp < 3600000) { // 1 hour in milliseconds
          setBatchDayNumber(data.batchDayNumber);
          setProgressData(data.progress);
          setTrainees(data.trainees);
          setLoading(false);
          return;
        }
      }

      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/ilpex/traineeprogress/trainee/last-accessed-day-number"
        );
        const traineesData = await response.json();

        if (traineesData.length === 0) {
          console.error("No trainee data available");
          setLoading(false);
          return;
        }

        const batchDayNumber = traineesData[0].batchDayNumber;
        setBatchDayNumber(batchDayNumber);

        let behind = 0;
        let onTrack = 0;
        let ahead = 0;

        for (const trainee of traineesData) {
          const { traineeDayNumber } = trainee;

          if (traineeDayNumber < batchDayNumber) {
            behind++;
          } else if (traineeDayNumber === batchDayNumber) {
            onTrack++;
          } else {
            ahead++;
          }
        }

        const progress = { behind, onTrack, ahead };
        setProgressData(progress);
        setTrainees(traineesData);
        
        localStorage.setItem(
          "traineeProgressData",
          JSON.stringify({
            data: { progress, trainees: traineesData, batchDayNumber },
            timestamp: currentTime,
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
        trainees={trainees} // Pass all trainees to the modal
      />
    </Box>
  );
};

export default ProgressTracker;
