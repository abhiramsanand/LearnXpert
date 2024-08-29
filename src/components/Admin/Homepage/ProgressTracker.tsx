import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TraineeModal from "./ProgressModal";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Trainees Progress Tracker",
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
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    fetch("/ProgressData.json")
      .then((response) => response.json())
      .then((data) => {
        const trainees = data; // data should be an array of trainee objects

        if (trainees.length === 0) {
          console.error("No trainee data available");
          setLoading(false);
          return;
        }

        // Use the batchDayNumber from the first trainee
        const batchDayNumber = trainees[0].batchDayNumber; 
        
        let behind = 0;
        let onTrack = 0;
        let ahead = 0;

        for (const trainee of trainees) {
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dummy data:", error);
        setLoading(false);
      });
  }, []);

  const data = {
    labels: ["Behind", "On Track", "Ahead"],
    datasets: [
      {
        data: [progressData.behind, progressData.onTrack, progressData.ahead],
        backgroundColor: "#8061C3",
      },
    ],
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.2)"
      height="190px"
      alignContent="center"
      sx={{
        borderRadius: "5px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
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
          <Box width="100%" height="90%" sx={{ px: "45px" }}>
            <Bar options={options} data={data} />
          </Box>
          <Box
            width="100%"
            height="10%"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
          </Box>
        </>
      )}

      {/* Trainee Modal */}
      <TraineeModal
        open={openModal}
        onClose={handleCloseModal}
        selectedBatch={0}      
      />
    </Box>
  );
};

export default ProgressTracker;
