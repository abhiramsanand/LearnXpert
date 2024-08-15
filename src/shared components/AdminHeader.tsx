import {
  AppBar,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";

const HeaderContainer = styled(AppBar)({
  backgroundColor: "rgba(128, 97, 195, 0.1)",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  width: "100%",
  height: "56px",
  position: "fixed",
  top: 0,
});

const AdminHeader = () => {
  return (
    <>
      <HeaderContainer position="fixed">
        <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
              <Avatar
                alt="Athira"
                src=""
                sx={{ width: 40, height: 40, mt: 1}}
              />
            </Box>
        </Container>
      </HeaderContainer>
      <Box sx={{ mt: "56px" }}></Box>
    </>
  );
};

export default AdminHeader;
