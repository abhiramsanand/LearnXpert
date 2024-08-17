import React from "react";
import { Container } from "@mui/material";
import Profile from "../../components/Trainee/Dashboard/Profile";
import Graph from "../../components/Trainee/Dashboard/Graph";

const TraineeDashboardPage: React.FC = () => {
  return (
    <>
      <Container sx={{mt: 4}}>
        <Profile />
        <Graph />
      </Container>
    </>
  );
};

export default TraineeDashboardPage;
