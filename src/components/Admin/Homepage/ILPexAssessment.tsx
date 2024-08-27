/* eslint-disable @typescript-eslint/prefer-as-const */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssessmentScoreProps {
  selectedBatch: number;
}

interface ScoreData {
  above80: number;
  between70and80: number;
  between60and70: number;
  below60: number;
}

const ILPexAssessment: React.FC<AssessmentScoreProps> = ({ selectedBatch }) => {
  const [scoreData, setScoreData] = useState<ScoreData>({
    above80: 0,
    between70and80: 0,
    between60and70: 0,
    below60: 0,
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchScoreData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/trainee-scores/average"
        );
        const scores: Record<number, number> = response.data;

        // Initialize counters
        let above80 = 0;
        let between70and80 = 0;
        let between60and70 = 0;
        let below60 = 0;

        // Categorize each trainee's average score
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

        // Update state with categorized data
        setScoreData({
          above80,
          between70and80,
          between60and70,
          below60,
        });
      } catch (error) {
        console.error("Error fetching trainee scores:", error);
      }
    };

    fetchScoreData();
  }, [selectedBatch]);

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
        backgroundColor: [
          "rgba(85, 217, 130)",
          "rgba(217, 196, 85)",
          "rgba(247, 143, 84)",
          "rgba(217, 85, 85)",
        ],
        borderColor: [
          "rgba(85, 217, 130)",
          "rgba(217, 196, 85)",
          "rgba(247, 143, 84)",
          "rgba(217, 85, 85)",
        ],
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
        borderRadius: '5px',
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box width="100%" sx={{ pr: 2 }}>
        <Typography variant="h5">ILPex</Typography>
        <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
          Batch Assessment Score Overview
        </Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(85, 217, 130)" }}>●</span> Above 80% ({scoreData.above80})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(217, 196, 85)" }}>●</span> Between 70% and 80% ({scoreData.between70and80})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(247, 143, 84)" }}>●</span> Between 60% and 70% ({scoreData.between60and70})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(217, 85, 85)" }}>●</span> Below 60% ({scoreData.below60})
          </Typography>
        </Box>
      </Box>
      <Box width="35%">
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ILPexAssessment;
