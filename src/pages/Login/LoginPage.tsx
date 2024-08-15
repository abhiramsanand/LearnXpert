import React from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import leftBackgroundImage from "../../assets/Left Content.png";
import rightBackgroundImage from "../../assets/Bg.png";
import exp from "../../assets/exp.png";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
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
            sx={{ fontSize: "57px", fontFamily: "Montserrat, sans-serif", fontWeight: "bold" }}
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
          <TextField
            fullWidth
            label="USERNAME"
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": {
                color: "#8061C3",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": {
                  borderColor: "#8061C3",
                  backgroundColor: "#F6F1F1",
                },
                "&:hover fieldset": {
                  borderColor: "#8061C3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8061C3",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="PASSWORD"
            type="password"
            variant="outlined"
            margin="normal"
            sx={{
              "& .MuiInputLabel-root": {
                color: "#8061C3",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": {
                  borderColor: "#8061C3",
                  backgroundColor: "#F6F1F1",
                },
                "&:hover fieldset": {
                  borderColor: "#8061C3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8061C3",
                },
              },
              mb: 3,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              mb: 3,
              backgroundColor: "#8061C3",
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "#6D4BB6",
              },
            }}
            component={Link}
            to="/Trainee-Dashboard"
          >
            LOGIN
          </Button>
          <a
            href="#"
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
