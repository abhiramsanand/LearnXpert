/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Container } from "@mui/material";
import Profile from "../../components/Admin/TraineeReport/Profile";
import Graph from "../../components/Admin/TraineeReport/Graph";
import { useParams, useLocation } from "react-router-dom";

const TraineeReportPage: React.FC = () => {
  // Extract the ID from the URL params
  const { id } = useParams<{ id: string }>();

  // Extract name, email, and batch from the location state
  const location = useLocation();
  const { name, email, batch } = location.state || { name: '', email: '', batch: '' };

  return (
    <Container>
      <Profile name={name} batch={batch} email={email} />
      <Graph />
    </Container>
  );
};

export default TraineeReportPage;
