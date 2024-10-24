import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

interface ProfileProps {
  name: string;
  batch: string;
  email: string;
}

const Profile: React.FC<ProfileProps> = ({ name, batch, email }) => {
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
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" color="rgba(128, 97, 195, 0.7)">
          ILP {batch}
        </Typography>
        <Typography variant="body2">
          {email}
        </Typography>
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
          Good Morning! Today is 02-08-2024
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
