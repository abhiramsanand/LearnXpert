/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { AppBar, Container, Box } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import NotificationPage from "../../pages/Trainee/NotificationPage";

const HeaderContainer = styled(AppBar)({
  backgroundColor: "rgba(128, 97, 195, 0.1)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "100%",
  height: "56px",
  position: "fixed",
  top: 0,
});

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("traineeId"); // Remove stored ID
    localStorage.removeItem("roleId");    // Optionally remove role
    navigate("/"); // Navigate back to login

    // Prevent going back to restricted pages
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function (_event) {
      window.history.pushState(null, "", window.location.href);
    });
  };

  return (
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 4 }}>
            <NotificationPage />
            <LogoutIcon
              sx={{ color: "rgba(128, 97, 195, 1)", cursor: "pointer" }}
              onClick={handleLogout}
            />
          </Box>
        </Container>
      </HeaderContainer>
      <Box sx={{ mt: "56px" }}></Box>
    </>
  );
};

export default AdminHeader;
