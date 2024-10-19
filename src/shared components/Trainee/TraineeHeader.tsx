import { useEffect, useState } from "react";
import { AppBar, Container, Box, Typography, Avatar } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import NotificationPage from "../../pages/Trainee/NotificationPage";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import axios from "axios";

const HeaderContainer = styled(AppBar)({
  backgroundColor: "rgba(128, 97, 195, 0.1)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "100%",
  height: "56px",
  position: "fixed",
  top: 0,
});

const TraineeHeader = () => {
  const [username, setUsername] = useState("");
  const traineeId = localStorage.getItem("traineeId");
  const navigate = useNavigate(); // For navigating on logout

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/profiles/${traineeId}`
        );
        setUsername(response.data.userName);
      } catch (error) {
        console.error("Error fetching the username:", error);
      }
    };

    fetchUsername();
  }, [traineeId]);

  const handleLogout = () => {
    localStorage.removeItem("traineeId"); // Clear the stored traineeId
    navigate("/"); // Navigate to login page

    // Block access to previous protected pages using the back button
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      window.history.pushState(null, "", window.location.href);
    });
  };

  return (
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: "5px"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <NotificationPage />
              {/* Handle logout on click */}
              <LogoutIcon
                sx={{ color: "rgba(128, 97, 195, 1)", cursor: "pointer" }}
                onClick={handleLogout}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(128, 97, 195, 1)" }}
                >
                  {username}
                </Typography>
              </Box>
            </Box>
            <Avatar
              sx={{
                bgcolor: "rgba(128, 97, 195, 0.3)",
                mt: -1,
                color: "rgba(128, 97, 195, 1)",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Container>
      </HeaderContainer>
      <Box sx={{ mt: "26px" }}></Box>
    </>
  );
};

export default TraineeHeader;
