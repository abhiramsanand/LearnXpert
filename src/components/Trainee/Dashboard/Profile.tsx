import React, { useEffect, useState } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import axios from "axios";

// Define the type for the Profile data
interface ProfileData {
  traineeId: number;
  userName: string;
  batchName: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    // Get traineeId from local storage
    const traineeId = localStorage.getItem("traineeId");

    if (traineeId) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get<ProfileData>(
            `http://localhost:8080/api/v1/profiles/${traineeId}`
          );
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchProfileData();
    } else {
      console.error("No traineeId found in local storage");
    }
  }, []);

  // Function to format today's date
  const formatDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "80px",
      }}
    >
      <Box
        sx={{
          boxShadow: "0px 4px 10px rgba(128, 97, 195, 0.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: "30px",
          borderRadius: "20px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Typography variant="h5">{profile.userName}</Typography>
        <Typography variant="body2" color="rgba(128, 97, 195, 0.7)">
          ILP {profile.batchName}
        </Typography>
        <Typography variant="body2">{profile.email}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#8061C3", fontSize: "13px" }}>
          Good Morning! Today is {formatDate()}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Paper
            sx={{
              px: 2,
              backgroundColor: "#8061C3",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "80px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Typography variant="h5" sx={{ color: "#FFFFFF", pt: "20px" }}>
              10
            </Typography>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Batch's Current Day
            </Typography>
          </Paper>
          <Paper
            sx={{
              px: 2,
              backgroundColor: "#8061C3",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "80px",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Typography variant="h5" sx={{ color: "#FFFFFF", pt: "20px" }}>
              10
            </Typography>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Trainee's Current Day
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
