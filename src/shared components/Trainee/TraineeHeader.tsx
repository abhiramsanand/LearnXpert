import { AppBar, Container, Box } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import NotificationPage from "../../pages/Trainee/NotificationPage";
import { Link } from "react-router-dom";

const HeaderContainer = styled(AppBar)({
  backgroundColor: "rgba(128, 97, 195, 0.1)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "100%",
  height: "56px",
  position: "fixed",
  top: 0,
});

const TraineeHeader = () => {
  return (
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 4 }}
          >
            <NotificationPage />
            <Link to="/" style={{ textDecoration: 'none' }}>
              <LogoutIcon sx={{ color: "rgba(128, 97, 195, 1)", cursor: 'pointer' }} />
            </Link>
          </Box>
        </Container>
      </HeaderContainer>
      <Box sx={{ mt: "26px" }}></Box>
    </>
  );
};

export default TraineeHeader;
