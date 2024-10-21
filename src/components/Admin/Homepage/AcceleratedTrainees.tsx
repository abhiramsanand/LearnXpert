/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import AcceleratedTraineesModal from "./Modals/AcceleratedModal"; // Import the modal component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LocalTrainee {
  username: string;
  speed: string;
}

const AcceleratedTraineesTrack: React.FC = () => {
  const [speedData, setSpeedData] = useState<{ [key: string]: number }>({
    "1x": 0,
    "1.25x": 0,
    "1.5x": 0,
    "2x": 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [traineeDetails, setTraineeDetails] = useState<LocalTrainee[]>([]);

  useEffect(() => {
    const cacheKey = `acceleratedTraineesTrack_allBatches`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const now = new Date().getTime();
      const oneHour = 1 * 60 * 60 * 1000; // 1 hour

      if (now - parseInt(cachedTimestamp) < oneHour) {
        setSpeedData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch all batches
        const batchResponse = await fetch("https://ilpex-backend.onrender.com/api/v1/batches");
        const batches = await batchResponse.json();

        // Find the active batch
        const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
        if (!activeBatch) {
          console.error("No active batch found");
          return;
        }

        // Fetch trainee progress data for the active batch
        const traineeResponse = await fetch(
          `https://ilpex-backend.onrender.com/api/v1/ilpex/traineeprogress/duration?batchId=${activeBatch.id}`
        );
        const traineeData = await traineeResponse.json();

        const speedCounts = {
          "1x": 0,
          "1.25x": 0,
          "1.5x": 0,
          "2x": 0,
        };

        const details: LocalTrainee[] = traineeData.map((trainee: any) => {
          const { username, totalDuration, totalEstimatedDuration } = trainee;
          const watchTimeRatio = totalEstimatedDuration / totalDuration;

          let speed = "";
          if (watchTimeRatio <= 1.2) {
            speedCounts["1x"] += 1;
            speed = "1x";
          } else if (watchTimeRatio > 1.2 && watchTimeRatio < 1.35) {
            speedCounts["1.25x"] += 1;
            speed = "1.25x";
          } else if (watchTimeRatio >= 1.35 && watchTimeRatio < 1.75) {
            speedCounts["1.5x"] += 1;
            speed = "1.5x";
          } else if (watchTimeRatio > 1.75) {
            speedCounts["2x"] += 1;
            speed = "2x";
          }

          return { username, speed };
        });

        setTraineeDetails(details);
        setSpeedData(speedCounts); // Set counts instead of percentages

        // Cache the data
        localStorage.setItem(cacheKey, JSON.stringify(speedCounts));
        localStorage.setItem(
          `${cacheKey}_timestamp`,
          new Date().getTime().toString()
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accelerated trainee data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const data = {
    labels: ["1x", "1.25x", "1.5x", "2x"],
    datasets: [
      {
        label: "Number of Trainees by Speed",
        data: Object.values(speedData),
        backgroundColor: ["#5B8C5A", "#F4E4BA", "#E5A9A9", "#DB5461"],
        borderColor: ["rgba(128, 97, 195, 0.3)"],
        borderWidth: 1,
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
    cutout: "40%", // Adjust the cutout percentage for a more filled appearance
  };

  const colorLabels = [
    { label: "1x", color: "#5B8C5A" },
    { label: "1.25x", color: "#F4E4BA" },
    { label: "1.5x", color: "#E5A9A9" },
    { label: "2x", color: "#DB5461" },
  ];

  return (
    <>
      <Box
        onClick={handleOpenModal} // Handle click to open modal
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
        height="190px"
        width="80%"
        position="relative"
        sx={{
          overflow: "hidden",
          borderRadius: "5px",
          transition: "transform 0.3s ease-in-out",
          cursor: "pointer",
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
            width="100%"
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100px",
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
            <Typography sx={{ color: "#8061C3", fontSize: "12px" }}>
              Course Viewing Speeds
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box
                width="40%"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
              >
                <Typography sx={{ fontSize: "13px", color: "#8061C3" }}>
                  1x - ({speedData["1x"]})
                  <br />
                  1.25x - ({speedData["1.25x"]})
                  <br />
                  1.5x - ({speedData["1.5x"]})
                  <br />
                  2x - ({speedData["2x"]})
                </Typography>
              </Box>
              <Box
                width="30%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                <Doughnut data={data} options={options} />
              </Box>
              <Box
                width="30%"
                height="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                paddingRight="10px"
              >
                {colorLabels.map(({ label, color }) => (
                  <Box key={label} display="flex" mb={1} alignItems="center">
                    <Box
                      width="15px"
                      height="15px"
                      bgcolor={color}
                      borderRadius="50%"
                      mr={1} />
                    <Typography sx={{ fontSize: "12px", color: "#000000" }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>

      <AcceleratedTraineesModal
        open={modalOpen}
        onClose={handleCloseModal}
        traineeDetails={traineeDetails}
      />
    </>
  );
};

export default AcceleratedTraineesTrack;
