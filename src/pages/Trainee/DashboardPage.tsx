import React from "react";
import { Container } from "@mui/material";
import Header from "../../components/Trainee/Dashboard/Header";
import Profile from "../../components/Trainee/Dashboard/Profile";
import Graph from "../../components/Trainee/Dashboard/Graph";
import Footer from "../../shared components/Footer";

const TraineeDashboardPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Profile />
        <Graph />
      </Container>
      <Footer />
    </>
  );
};

export default TraineeDashboardPage;
