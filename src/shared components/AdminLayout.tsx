import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./Admin/AdminHeader";
import Sidebar from "./Admin/AdminSidebar";
import { Box, CssBaseline } from "@mui/material";

const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: (theme) =>
              theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <main className="main-content">
            <Outlet />
          </main>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AdminLayout;
