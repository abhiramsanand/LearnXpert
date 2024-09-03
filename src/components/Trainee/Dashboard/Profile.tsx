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
        justifyContent: "space-between",
        gap: "80px",
        p: 1,
        mt: -2,
        width: "770px",
        border: "1px solid rgba(128, 97, 195, 0.3)"
      }}
    >
      <Box sx={{ border: "1px solid rgba(128, 97, 195, 0.3)", p: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{profile.userName}</Typography>
        <Typography color="rgba(128, 97, 195, 0.7)">
          ILP {profile.batchName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          border: "1px solid rgba(128, 97, 195, 0.3)",
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: "#8061C3", fontSize: "13px" }}>
          Good Morning! Today is {formatDate()}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Typography sx={{ color: "#8061C3" }}>
            Batch's Current Day :
          </Typography>
          <Typography sx={{ color: "#8061C3", mr: 4 }}>10</Typography>
          <Typography sx={{ color: "#8061C3" }}>Your Current Day :</Typography>
          <Typography sx={{ color: "#8061C3" }}>10</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
