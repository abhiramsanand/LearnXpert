import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const HeaderContainer = styled(AppBar)({
  backgroundColor: "#FFFFFF",
  color: "#000000",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: 1100,
});

const Header = () => {
  return (
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                alt="Athira"
                src=""
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Typography sx={{ mt: "10px" }}>Hi Athira</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "50px",
                alignItems: "center",
              }}
            >
              <Notifications />
              <Typography
                component={Link}
                to="/Trainee-Courses"
                sx={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Courses
              </Typography>
              <Typography
                component={Link}
                to="/Trainee-Assessments"
                sx={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Assessments
              </Typography>
              <Typography
                component={Link}
                to="/"
                sx={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Logout
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </HeaderContainer>
      <Box sx={{ mt: "64px" }}></Box>
    </>
  );
};

export default Header;
