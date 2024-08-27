import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, Button } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface HigherSpeedProps {
  selectedBatch: number;
}

const DailyReportTrack: React.FC<HigherSpeedProps> = ({ selectedBatch }) => {
  const [speedPercentage, setSpeedPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [traineeStatuses, setTraineeStatuses] = useState<{ [key: number]: string }>({});
  
  useEffect(() => {
    if (selectedBatch) {
      setLoading(true);
      
      // Fetch trainee progress data
      fetch(`http://localhost:8080/api/v1/ilpex/traineeprogress/Daily-Report-day-number`)
        .then((response) => response.json())
        .then((traineeData) => {
          // Fetch batch day number
          fetch(`http://localhost:8080/api/v1/batches/${selectedBatch}/dayNumber`)
            .then((response) => response.json())
            .then((batchData) => {
              const batchDayNumber = batchData.dayNumber-4;
              const traineeStatusesTemp: { [key: number]: string } = {};

              // Determine trainee status
              for (const traineeId in traineeData) {
                const traineeDayNumber = traineeData[traineeId];
                if (traineeDayNumber < batchDayNumber) {
                  traineeStatusesTemp[parseInt(traineeId)] = 'Behind';
                } else if (traineeDayNumber === batchDayNumber) {
                  traineeStatusesTemp[parseInt(traineeId)] = 'On Track';
                } else {
                  traineeStatusesTemp[parseInt(traineeId)] = 'Ahead';
                }
              }

              // Calculate percentage of trainees who are behind
              const totalTrainees = Object.keys(traineeStatusesTemp).length;
              const behindCount = Object.values(traineeStatusesTemp).filter(status => status === 'Behind').length;
              const percentage = (behindCount / totalTrainees) * 100;

              setTraineeStatuses(traineeStatusesTemp);
              setSpeedPercentage(Math.round(percentage));
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching batch data:", error);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error("Error fetching trainee data:", error);
          setLoading(false);
        });
    }
  }, [selectedBatch]);

  const data = {
    datasets: [
      {
        label: "Percentage of Trainees Behind",
        data: [speedPercentage, 100 - speedPercentage],
        backgroundColor: ["#8061C3", "#F0EAFD"],
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
    cutout: "70%",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      boxShadow="0px 4px 10px rgba(128, 97, 195, 0.2)"
      height="190px"
      width="27%"
      position="relative"
      sx={{
        overflow: "hidden",
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
          paddingX="100px"
          sx={{ position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
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
          <Box width="100%" height="70%">
            <Doughnut data={data} options={options} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "7px", color: "#000000" }}>
              Pending Daily Reports
            </Typography>
            <Typography sx={{ fontSize: "20px", color: "black" }}>
              {speedPercentage}%
            </Typography>
          </Box>
          <Box
            width="100%"
            height="0%"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              variant="text"
              sx={{
                color: "#8061C3",
                fontSize: "10px",
                textDecoration: "underline",
                mt: 1,
              }}
            >
              List Trainees
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DailyReportTrack;
