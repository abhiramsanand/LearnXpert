/* eslint-disable @typescript-eslint/prefer-as-const */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import TraineeScoresModal from "./Modals/ILPexScoresModal"; // Adjust the import path as needed

ChartJS.register(ArcElement, Tooltip, Legend);

interface ScoreData {
  above80: number;
  between70and80: number;
  between60and70: number;
  below60: number;
}

const ILPexAssessment: React.FC = () => {
  const [scoreData, setScoreData] = useState<ScoreData>({
    above80: 0,
    between70and80: 0,
    between60and70: 0,
    below60: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [traineeScores, setTraineeScores] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const fetchScoreData = async () => {
      const cacheKey = "scoreDataCache";
      const cacheTimeKey = "scoreDataCacheTime";
      const cacheDuration = 0 * 60 * 1000; // 5 minutes in milliseconds

      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);
      const now = new Date().getTime();

      if (
        cachedData &&
        cachedTime &&
        now - parseInt(cachedTime) < cacheDuration
      ) {
        setScoreData(JSON.parse(cachedData));
      } else {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/trainee-scores/average/name"
          );
          const scores: Record<number, number> = response.data;

          let above80 = 0;
          let between70and80 = 0;
          let between60and70 = 0;
          let below60 = 0;

          Object.values(scores).forEach((score) => {
            if (score > 80) {
              above80++;
            } else if (score > 70) {
              between70and80++;
            } else if (score > 60) {
              between60and70++;
            } else {
              below60++;
            }
          });

          const newScoreData = {
            above80,
            between70and80,
            between60and70,
            below60,
          };
          setScoreData(newScoreData);

          localStorage.setItem(cacheKey, JSON.stringify(newScoreData));
          localStorage.setItem(cacheTimeKey, now.toString());
        } catch (error) {
          console.error("Error fetching trainee scores:", error);
        }
      }
    };

    fetchScoreData();
  }, []);

  const fetchTraineeScores = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/trainee-scores/average/name"
      );
      setTraineeScores(response.data);
    } catch (error) {
      console.error("Error fetching trainee scores:", error);
    }
  };

  const handleOpenModal = () => {
    fetchTraineeScores();
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const data = {
    datasets: [
      {
        label: "Score Distribution",
        data: [
          scoreData.above80,
          scoreData.between70and80,
          scoreData.between60and70,
          scoreData.below60,
        ],
        backgroundColor: ["#5B8C5A", "#F4E4BA", "#E5A9A9", "#DB5461"],
        borderColor: ["rgba(128, 97, 195, 0.3)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right" as "right",
      },
    },
    cutout: "0%",
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        boxShadow="0px 4px 10px rgba(128, 97, 195, 0.5)"
        sx={{
          width: "459px",
          padding: "20px",
          margin: "auto",
          borderRadius: "5px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          cursor: "pointer", 
        }}
        onClick={handleOpenModal} // Handle click to open modal
      >
        <Box width="100%" sx={{ pr: 2 }}>
          <Typography variant="h5">ILPex</Typography>
          <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
            Batch Assessment Score Overview
          </Typography>
          <Box>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#5B8C5A" }}>●</span> Above 80% (
              {scoreData.above80})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#F4E4BA" }}>●</span> Between 70% and 80% (
              {scoreData.between70and80})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#E5A9A9" }}>●</span> Between 60% and 70% (
              {scoreData.between60and70})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#DB5461" }}>●</span> Below 60% (
              {scoreData.below60})
            </Typography>
          </Box>
        </Box>
        <Box width="35%">
          <Doughnut data={data} options={options} />
        </Box>
      </Box>

      <TraineeScoresModal
        open={modalOpen}
        onClose={handleCloseModal}
        traineeScores={traineeScores}
      />
    </>
  );
};

export default ILPexAssessment;
