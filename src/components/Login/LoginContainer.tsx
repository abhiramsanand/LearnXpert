import React from "react";
import { Container, Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import Exp from "../../assets/exp.png";

const LoginContainer: React.FC = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        borderTop: "2px solid #8518FF",
        borderBottom: "2px solid #8518FF",
        borderRadius: "50px",
        py: "20px",
        boxSizing: "border-box",
        width: {
          sm: "100%",
          md: "300px",
        },
      }}
      data-aos="flip-left"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="subtitle1"
          component="h1"
          sx={{ color: "#8518FF", opacity: "69%", mb: 2 }}
        >
          Login
        </Typography>
        <img
          src={Exp}
          alt="Exp"
          style={{ width: "50px", height: "60px", marginBottom: "16px" }}
        />
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginContainer;
