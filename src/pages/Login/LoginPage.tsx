import React from "react";
import { Container } from "@mui/material";

import Logo from "../../components/Login/Logo.tsx";
import LoginContainer from "../../components/Login/LoginContainer";

const LoginPage: React.FC = () => {
  return (
    <Container
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        margin: 0,
        minWidth: "100vw",
        background: "linear-gradient(160deg, #F3E8FF 50%, white 50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Numans, sans-serif",
        textAlign: "center",
      }}
    >
      <Logo />
      <LoginContainer />
    </Container>
  );
};

export default LoginPage;
