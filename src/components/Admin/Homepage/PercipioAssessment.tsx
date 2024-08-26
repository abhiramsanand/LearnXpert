/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssessmentScoreProps {
  selectedBatch: number;
}

const PercipioAssessment: React.FC<AssessmentScoreProps> = ({
  selectedBatch,
}) => {
  const [scoreData, setScoreData] = useState({
    below80: 0,
    between80and90: 0,
    between90and99: 0,
    exactly100: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ [traineeId: number]: number }>(
          "http://localhost:8080/api/v1/assessments/average"
        );
        const scores = response.data;

        let below80 = 0;
        let between80and90 = 0;
        let between90and99 = 0;
        let exactly100 = 0;

        Object.values(scores).forEach((score) => {
          if (score < 80) {
            below80++;
          } else if (score >= 80 && score < 90) {
            between80and90++;
          } else if (score >= 90 && score < 100) {
            between90and99++;
          } else if (score === 100) {
            exactly100++;
          }
        });

        setScoreData({
          below80,
          between80and90,
          between90and99,
          exactly100,
        });
      } catch (error) {
        console.error("Error fetching assessment scores:", error);
      }
    };

    fetchData();
  }, [selectedBatch]);

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

  const options: any = {
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
      },
    },
    cutout: "70%",
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.2)"
      sx={{
        maxWidth: "420px",
        padding: "20px",
        margin: "auto",
        borderRadius: "5px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
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
    </Box>
  );
};

export default PercipioAssessment;
