import React from "react";
import { Container, Box } from "@mui/material";
import BarChart from "./BarChart";
import ILPexavg from "./ILPexavg";
import PercipioScore from "./PercipioScore";
import DaysComplete from "./Days";

const Graph: React.FC = () => {
  return (
    <Container sx={{ mt: "15px" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <ILPexavg />
          <PercipioScore />
          <DaysComplete />
        </Box>
        <Box>
          <BarChart />
        </Box>
      </Box>
    </Container>
  );
};

export default Graph;
