import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Exp from "../../assets/exp.png";
import "./Signup.css";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
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
            Admin Signup
          </Typography>
          <img
            src={Exp}
            alt="Exp"
            style={{ width: "50px", height: '60px', marginBottom: "16px" }}
          />
          <form onSubmit={handleSignup} style={{ width: "100%" }}>
            <TextField
              label="Email"
              value={email}
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
                width: "90%",
                pb:'10px'
              }}
            />
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                width: "90%",
                pb:'10px'
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
              Signup
            </Button>
            <Typography variant="subtitle1" component="h1" sx={{ color: '#8518FF', opacity: '69%' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#8518FF' }}>
                Login
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default Signup;
