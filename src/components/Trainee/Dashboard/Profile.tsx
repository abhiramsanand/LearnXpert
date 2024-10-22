import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
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
  const [batchCurrentDay, setBatchCurrentDay] = useState<number | null>(null);
  const [traineeCurrentDay, setTraineeCurrentDay] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Get traineeId from local storage
    const traineeId = localStorage.getItem("traineeId");

    if (traineeId) {
      const fetchProfileData = async () => {
        try {
          const [profileResponse, batchDayResponse, traineeDayResponse] =
            await Promise.all([
              axios.get<ProfileData>(
                `https://ilpex-backend.onrender.com/api/trainees/${traineeId}`
              ),
              axios.get<number>(
                `https://ilpex-backend.onrender.com/api/trainees/${traineeId}/currentdaynumber`
              ),
              axios.get<{ lastDayNumber: number }>(
                `https://ilpex-backend.onrender.com/api/v1/ilpex/traineeprogress/currentdaynumber/${traineeId}`
              ),
            ]);

          setProfile(profileResponse.data);
          setBatchCurrentDay(batchDayResponse.data); // Direct numeric value
          setTraineeCurrentDay(traineeDayResponse.data.lastDayNumber); // Extract lastDayNumber
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchProfileData();
    } else {
      console.error("No traineeId found in local storage");
    }
  }, []);

  // Function to format today's date in "Month day, Year" format
  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!profile || batchCurrentDay === null || traineeCurrentDay === null) {
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
        border: "1px solid rgba(128, 97, 195, 0.3)",
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
            Batch's Current Day:
          </Typography>
          <Typography sx={{ color: "#8061C3", mr: 4 }}>
            {batchCurrentDay}
          </Typography>
          <Typography sx={{ color: "#8061C3" }}>Your Current Day:</Typography>
          <Typography sx={{ color: "#8061C3" }}>{traineeCurrentDay}</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
