import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  return (
    <Container
      sx={{
        pt: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h5">Athira R Krishnan</Typography>
        <Typography variant="body2" color="textSecondary">
          ILP Batch 4
        </Typography>
        <Typography variant="body2">
          athira.krishnan@experionglobal.com
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ color: "black", fontSize: "13px" }}>
          Good Morning! Today is 02-08-2024
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#F4F4F4",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#8518FF" }}>
              10
            </Typography>
            <Typography variant="body1" sx={{ color: "#8518FF" }}>
              Batch's Current Day
            </Typography>
          </Paper>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "#F4F4F4",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "60px",
            }}
          >
            <Typography variant="h5" sx={{ color: "#8518FF" }}>
              10
            </Typography>
            <Typography variant="body1" sx={{ color: "#8518FF" }}>
              Trainee's Current Day
            </Typography>
          </Paper>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "200px",
              gap: 1,
              borderRadius: "4px",
            }}
          >
            <Button
              sx={{
                backgroundColor: "transparent",
                mb: 1,
                color: "black",
                fontSize: "12px",
                border: "1px solid #8518FF",
                borderRadius: "20px",
              }}
              component={Link} to="/Dailyreport"
            >
              Daily Report
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "black",
                fontSize: "12px",
                border: "1px solid #8518FF",
                borderRadius: "20px",
              }}
              component={Link} to="/Enquiry"
            >
              Enquiry
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
