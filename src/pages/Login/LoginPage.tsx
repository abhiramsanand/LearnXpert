import React, { useState } from "react";
import { Box, Button, Typography, Grid, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import leftBackgroundImage from "../../assets/Left Content.png";
import rightBackgroundImage from "../../assets/Bg.png";
import exp from "../../assets/exp.png";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://ilpex-backend.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: username, password }),
        }
      );

      if (response.ok) {
        const responseText = await response.text();
        const roleIdMatch = responseText.match(/RoleID: (\d+)/);
        const traineeIdMatch = responseText.match(/TraineeID: (\d+)/);

        const roleId = roleIdMatch ? roleIdMatch[1] : null;
        const traineeId = traineeIdMatch ? traineeIdMatch[1] : null;

        if (roleId === "3" && traineeId) {
          localStorage.setItem("traineeId", traineeId);
          localStorage.setItem("roleId", "3");
          navigate("/Trainee-Dashboard");
        } else if (roleId === "1") {
          localStorage.setItem("roleId", "1");
          navigate("/Admin-Home");
        } else {
          setErrorMessage("Unhandled roleId.");
        }
      } else {
        setErrorMessage("Bad credentials");
      }
    } catch (error) {
      setErrorMessage("Bad credentials");
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        item
        md={6}
        sx={{
          position: "relative",
          backgroundImage: `url(${leftBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            right: 40,
            textAlign: "right",
            color: "#FFFFFF",
          }}
        >
          <Typography
            sx={{
              fontSize: "57px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
            }}
          >
            ILPex{" "}
            <span style={{ fontSize: "10px", marginLeft: "-15px" }}>WEB</span>
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${rightBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Box
          sx={{
            width: "60%",
            maxWidth: 400,
            textAlign: "center",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "#8061C3",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Login
          </Typography>
          <img
            src={exp}
            alt="Experion Technologies"
            style={{ marginBottom: 24, width: "60px" }}
          />

          {errorMessage && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Box
            component="form"
            sx={{
              mb: 3,
              "& input": {
                width: "100%",
                padding: "12px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #8061C3",
                borderRadius: "20px",
                boxSizing: "border-box",
                backgroundColor: "#F6F1F1",
                fontFamily: "Montserrat, sans-serif",
              },
              "& input:focus": {
                outline: "none",
                borderColor: "#8061C3",
                boxShadow: "0 0 5px rgba(128, 97, 195, 0.5)",
              },
            }}
            onSubmit={handleLogin}
          >
            <input
              placeholder="username"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                placeholder="password"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: "absolute", right: 10 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                mb: 3,
                backgroundColor: "#8061C3",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#6D4BB6",
                },
              }}
            >
              LOGIN
            </Button>
          </Box>
          <a
            href="mailto:abhiram.anand@experionglobal.com.com?subject=Forgot%20Password&body=Hello,%20I%20need%20help%20resetting%20my%20password."
            style={{
              color: "#8061C3",
              textDecoration: "none",
              position: "relative",
              display: "inline-block",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Forgot password?
          </a>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
