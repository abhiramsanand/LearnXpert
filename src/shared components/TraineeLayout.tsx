import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Box, CssBaseline } from "@mui/material";
import TraineeHeader from "./Trainee/TraineeHeader";
import TraineeSidebar from "./Trainee/TraineeSidebar";

const TraineeLayout = () => {
  return (
    <>
      <TraineeHeader />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TraineeSidebar />
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

export default TraineeLayout;
