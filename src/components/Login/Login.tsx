import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Exp from "../../assets/exp.png";
import "./Login.css";
import "aos/dist/aos.css";

const Login: React.FC = () => {
  const [username, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", username);
    console.log("Password:", password);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Numans, sans-serif",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ color: "#8518FF", mb: "20px" }}
      >
        LearnXpert
      </Typography>
      <Container
        maxWidth="xs"
        sx={{
          borderTop: "2px solid #8518FF",
          borderBottom: "2px solid #8518FF",
          borderRadius: "50px",
          py: 1,
          padding: "16px",
          boxSizing: "border-box",
          width: {
            sm: "100%",
            md: "70%",
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
            Admin Login
          </Typography>
          <img
            src={Exp}
            alt="Exp"
            style={{ width: "50px", height: "50px", marginBottom: "16px" }}
          />
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8518FF",
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8518FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8518FF",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "7px",
                },
                "& .MuiInputLabel-root": {
                  color: "#8518FF",
                  top: "50%",
                  transform: "translateY(-70%) translateX(20%)",
                  "&.MuiInputLabel-shrink": {
                    top: "10px",
                    transform: "translateY(-70%) translateX(20%) scale(0.75)",
                  },
                },
                width: "90%",
                pb: "10px",
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#8518FF",
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#8518FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8518FF",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "7px",
                },
                "& .MuiInputLabel-root": {
                  color: "#8518FF",
                  top: "50%",
                  transform: "translateY(-50%) translateX(20%)",
                  "&.MuiInputLabel-shrink": {
                    top: "10px",
                    transform: "translateY(-70%) translateX(20%) scale(0.75)",
                  },
                },
                width: "90%",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#8518FF",
                borderRadius: "20px",
                mt: 2,
                width: "90%",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#6611CC",
                },
              }}
            >
              Login
            </Button>
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ color: "#8518FF", opacity: "69%", mb: 1 }}
            >
              Forgot Password?
            </Typography>
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ color: "#8518FF", opacity: "69%" }}
            >
              <Link
                to="/Signup"
                style={{ textDecoration: "none", color: "#8518FF" }}
              >
                SignUp
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;