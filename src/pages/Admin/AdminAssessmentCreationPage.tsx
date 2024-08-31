import { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import AssessmentCreation from "../../components/Admin/AssessmentCreation/AssessmentCreation";

const AdminAssessmentCreationPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data or other async operations)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "#8061C3",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            animation: "flip 1s infinite",
            "@keyframes flip": {
              "0%": { transform: "rotateX(0)" },
              "50%": { transform: "rotateX(180deg)" },
              "100%": { transform: "rotateX(360deg)" },
            },
          }}
        >
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>{" "}
        </Typography>
      </Box>
    );
  }

  return (
    <Container>
      <AssessmentCreation />
    </Container>
  );
};

export default AdminAssessmentCreationPage;
