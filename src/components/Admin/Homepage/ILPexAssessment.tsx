/* eslint-disable @typescript-eslint/prefer-as-const */
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AssessmentScoreProps {
  selectedBatch: number;
}

const ILPexAssessment: React.FC<AssessmentScoreProps> = ({ selectedBatch }) => {
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
      boxShadow={3}
      sx={{
        maxWidth: "500px",
        padding: "20px",
        margin: "auto",
      }}
    >
      <Box width="100%" sx={{ pr: 2 }}>
        <Typography variant="h5">Percipio</Typography>
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
