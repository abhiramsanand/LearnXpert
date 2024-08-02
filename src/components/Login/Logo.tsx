import React from "react";
import { Typography } from "@mui/material";

const Logo: React.FC = () => {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: "#8518FF", mb: "30px", mt: "50px" }}
      >
        LearnXpert
      </Typography>
    </>
  );
};

export default Logo;
