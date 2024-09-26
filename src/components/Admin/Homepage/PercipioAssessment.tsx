/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import TraineeScoreModal from "./Modals/PercipioModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const PercipioAssessment: React.FC = () => {
  const [scoreData, setScoreData] = useState({
    below80: 0,
    between80and90: 0,
    between90and99: 0,
    exactly100: 0,
  });

  const [traineeData, setTraineeData] = useState<{
    [traineeName: string]: number;
  }>({});

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
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

        setScoreData(newScoreData);
        setTraineeData(scores);
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
          "#DB5461", // Red for below 80
          "#E5A9A9", // Orange for between 80 and 90
          "#F4E4BA", // Yellow for between 90 and 99
          "#5B8C5A", // Green for exactly 100
        ],
        borderColor: ["rgba(128, 97, 195, 0.3)"],
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
    cutout: "0%", // Adjusted to fill the entire chart
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
              <span style={{ color: "#5B8C5A" }}>●</span> 100% (
              {scoreData.exactly100})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#F4E4BA" }}>●</span> Between 90% and 99% (
              {scoreData.between90and99})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#E5A9A9" }}>●</span> Between 80% and 90% (
              {scoreData.between80and90})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <span style={{ color: "#DB5461" }}>●</span> Below 80% (
              {scoreData.below80})
            </Typography>
          </Box>
        </Box>
        <Box width="35%">
          <Doughnut data={data} options={options} />
        </Box>
      </Box>

      <TraineeScoreModal
        open={modalOpen}
        onClose={handleCloseModal}
        traineeData={traineeData}
      />
    </>
  );
};

export default PercipioAssessment;
