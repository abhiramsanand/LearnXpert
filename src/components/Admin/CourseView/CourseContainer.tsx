import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import CourseDetails from "./CourseDetails";

interface CourseData {
  courseName: string;
  dayNumber: number;
  batchName: string;
  courseDuration: string;
}

interface CourseContainerProps {
  selectedBatch: number | null;
}

const CourseContainer: React.FC<CourseContainerProps> = ({ selectedBatch }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [daysData, setDaysData] = useState<Record<
    number,
    { totalDuration: number; sessions: { title: string }[] }
  > | null>(null);

  useEffect(() => {
    if (selectedBatch !== null) {
      fetch(`http://localhost:8080/api/courses/batch/${selectedBatch}`)
        .then((response) => response.json())
        .then((data: CourseData[]) => {
          console.log("Fetched data:", data);

          const transformedData = data.reduce((acc, item) => {
            const durationInMinutes = parseDuration(item.courseDuration);
            if (!acc[item.dayNumber]) {
              acc[item.dayNumber] = {
                totalDuration: 0,
                sessions: [],
              };
            }
            acc[item.dayNumber].totalDuration += durationInMinutes;
            acc[item.dayNumber].sessions.push({ 
              title: item.courseName, 
              courseDuration: item.courseDuration  // Include courseDuration here
            });
            return acc;
          }, {} as Record<number, { totalDuration: number; sessions: { title: string; courseDuration: string }[] }>);
          

          setDaysData(transformedData);
          // Set Day 1 as selected if it exists
          if (Object.keys(transformedData).length > 0) {
            setSelectedDay(1);
          }
        })
        .catch((error) => console.error("Error fetching the API data:", error));
    }
  }, [selectedBatch]);

  const parseDuration = (duration: string): number => {
    const timeParts = duration.split(" ");
    let totalMinutes = 0;
    timeParts.forEach((part) => {
      if (part.includes("h")) {
        totalMinutes += parseInt(part.replace("h", "")) * 60;
      } else if (part.includes("m")) {
        totalMinutes += parseInt(part.replace("m", ""));
      }
    });
    return totalMinutes;
  };

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const days = daysData ? Object.keys(daysData).map(Number) : [];

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(80vh - 70px)",
        width: "100%",
        backgroundColor: "transparent", // Background color for the container
      }}
    >
      {/* Left Column: Days List */}
      <Box
        sx={{
          width: "250px",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          padding: "8px",
          position: "relative",
          backgroundColor: "transparent", // Background color for the left column
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8061C3",
            borderRadius: "4px",
          },
        }}
      >
        {selectedBatch !== null && (
          <List>
            {days.map((day) => (
              <ListItem
                button
                key={day}
                onClick={() => setSelectedDay(day)}
                sx={{
                  marginBottom: "8px",
                  backgroundColor: selectedDay === day ? "rgba(128, 97, 195, 0.2)" : "transparent",
                  borderRadius: "4px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(128, 97, 195, 0.1)",
                  },
                }}
              >
                <ListItemText
                  primary={`Day ${day}`}
                  secondary={daysData[day]?.totalDuration
                    ? formatDuration(daysData[day].totalDuration)
                    : "No Duration"}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: "600",
                      color: "#8061C3",
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontWeight: "500",
                      color: "#5B8C5A",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          backgroundColor: "transparent",
          transform: selectedDay ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#8061C3",
            borderRadius: "4px",
          },
        }}
      >
        {selectedDay && daysData ? (
          <CourseDetails courses={daysData[selectedDay].sessions} />
        ) : (
          <Typography variant="body2" sx={{ textAlign: "center", color: "#DB5461" }}>
            Select a day to see course details
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CourseContainer;
