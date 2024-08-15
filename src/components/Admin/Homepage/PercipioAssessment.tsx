/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssessmentScoreProps {
  selectedBatch: number;
}

const PercipioAssessment: React.FC<AssessmentScoreProps> = ({
  selectedBatch,
}) => {
  const [scoreData, setScoreData] = useState({
    above80: 3,
    between70and80: 10,
    between60and70: 19,
    below60: 6,
  });

  useEffect(() => {
    const batchData: Record<
      number,
      {
        above80: number;
        between70and80: number;
        between60and70: number;
        below60: number;
      }
    > = {
      1: { above80: 3, between70and80: 10, between60and70: 19, below60: 6 },
      2: { above80: 5, between70and80: 8, between60and70: 15, below60: 7 },
      3: { above80: 4, between70and80: 12, between60and70: 20, below60: 8 },
      4: { above80: 6, between70and80: 14, between60and70: 18, below60: 5 },
    };
    setScoreData(batchData[selectedBatch] || batchData[1]);
  }, [selectedBatch]);

  const data = {
    labels: [
      "Above 80%",
      "Between 70% and 80%",
      "Between 60% and 70%",
      "Below 60%",
    ],
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
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
    },
    cutout: "70%",
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" boxShadow={3}>
      <Box>
        <Typography variant="h5">Percipio</Typography>
        <Typography variant="subtitle1">
          Batch Assessment Score Overview
        </Typography>
        <Box width="100%">
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(75, 192, 192, 1)" }}>●</span> Above 80%
            ({scoreData.above80})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(255, 206, 86, 1)" }}>●</span> Between
            70% and 80% ({scoreData.between70and80})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(255, 159, 64, 1)" }}>●</span> Between
            60% and 70% ({scoreData.between60and70})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "rgba(255, 99, 132, 1)" }}>●</span> Below 60%
            ({scoreData.below60})
          </Typography>
        </Box>
        <Box width="100%">
          <Doughnut data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

export default PercipioAssessment;
