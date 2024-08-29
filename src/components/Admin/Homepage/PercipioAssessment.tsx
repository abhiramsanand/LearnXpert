/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import TraineeModal from "./PercipioModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const PercipioAssessment: React.FC = () => {
  const [scoreData, setScoreData] = useState({
    below80: 0,
    between80and90: 0,
    between90and99: 0,
    exactly100: 0,
  });

  const [traineeData, setTraineeData] = useState({
    below80: [] as string[],
    between80and90: [] as string[],
    between90and99: [] as string[],
    exactly100: [] as string[],
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `assessmentData`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const { scoreData, traineeData, timestamp } = JSON.parse(cachedData);
        const currentTime = new Date().getTime();

        // Check if cached data is older than 5 minutes (300000 ms)
        if (currentTime - timestamp < 300000) {
          setScoreData(scoreData);
          setTraineeData(traineeData);
          return;
        }
      }

      try {
        const response = await axios.get<{ [traineeName: string]: number }>(
          "http://localhost:8080/api/v1/assessments/averageScore"
        );
        const scores = response.data;

        let below80: string[] = [];
        let between80and90: string[] = [];
        let between90and99: string[] = [];
        let exactly100: string[] = [];

        Object.entries(scores).forEach(([traineeName, score]) => {
          if (score < 80) {
            below80.push(traineeName);
          } else if (score >= 80 && score < 90) {
            between80and90.push(traineeName);
          } else if (score >= 90 && score < 100) {
            between90and99.push(traineeName);
          } else if (score === 100) {
            exactly100.push(traineeName);
          }
        });

        const newScoreData = {
          below80: below80.length,
          between80and90: between80and90.length,
          between90and99: between90and99.length,
          exactly100: exactly100.length,
        };

        const newTraineeData = {
          below80,
          between80and90,
          between90and99,
          exactly100,
        };

        setScoreData(newScoreData);
        setTraineeData(newTraineeData);

        // Cache the data with the current timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            scoreData: newScoreData,
            traineeData: newTraineeData,
            timestamp: new Date().getTime(),
          })
        );
      } catch (error) {
        console.error("Error fetching assessment scores:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    datasets: [
      {
        label: "Score Distribution",
        data: [
          scoreData.below80,
          scoreData.between80and90,
          scoreData.between90and99,
          scoreData.exactly100,
        ],
        backgroundColor: [
          "rgba(217, 85, 85)", // Red for below 80
          "rgba(247, 143, 84)", // Orange for between 80 and 90
          "rgba(217, 196, 85)", // Yellow for between 90 and 99
          "rgba(85, 217, 130)", // Green for exactly 100
        ],
        borderColor: [
          "rgba(217, 85, 85)",
          "rgba(247, 143, 84)",
          "rgba(217, 196, 85)",
          "rgba(85, 217, 130)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
      },
    },
    cutout: "40%", // Adjusted to fill the entire chart
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
      sx={{
        width: "460px",
        padding: "20px",
        margin: "auto",
        borderRadius: "5px",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={handleOpenModal}
    >
      <Box width="100%" sx={{ pr: 2 }}>
        <Typography variant="h5">Percipio</Typography>
        <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
          Batch Assessment Score Overview
        </Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(217, 85, 85)" }}>●</span> Below 80% (
            {scoreData.below80})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(247, 143, 84)" }}>●</span> Between 80%
            and 90% ({scoreData.between80and90})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(217, 196, 85)" }}>●</span> Between 90%
            and 99% ({scoreData.between90and99})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(85, 217, 130)" }}>●</span> 100% (
            {scoreData.exactly100})
          </Typography>
        </Box>
      </Box>
      <Box width="35%">
        <Doughnut data={data} options={options} />
      </Box>
      <TraineeModal
        open={modalOpen}
        onClose={handleCloseModal}
        traineeData={traineeData}
      />
    </Box>
  );
};

export default PercipioAssessment;
