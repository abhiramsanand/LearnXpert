import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";


const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", username);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={handleLogin} style={{ width: "85%" }}>
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
          "& .MuiInputLabel-root": {
            color: "#8518FF",
            top: "50%",
            transform: "translateY(-70%) translateX(20%)",
            "&.MuiInputLabel-shrink": {
              top: "10px",
              transform: "translateY(-70%) translateX(20%) scale(0.75)",
            },
          },
          width: "100%",
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
          width: "100%",
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#8518FF",
          borderRadius: "20px",
          mt: 2,
          width: "100%",
          mb: 1,
          "&:hover": {
            backgroundColor: "#6611CC",
          },
        }}
      >
        Login
      </Button>
      <Box display="flex" justifyContent="center">
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ color: "#8518FF", opacity: "69%", textAlign: "center" }}
        >
          Forgot Password?
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;
