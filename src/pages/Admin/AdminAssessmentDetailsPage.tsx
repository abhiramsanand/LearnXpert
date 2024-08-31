import { useEffect, useState } from "react";
import AssignmentDetails from "../../components/Admin/AssessmentDetails/TraineeAssessmentDetails";
import { Box, Container, Typography } from "@mui/material";

const AdminAssessmentDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  // useEffect to set loading to false once the component is mounted
  useEffect(() => {
    // Simulate data fetching or component preparation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer
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
          ILPex <span style={{ fontSize: "8px", marginLeft: "-8px" }}>WEB</span>
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 6, textAlign: "center" }}>
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mb: 2,
          mt: "-35px",
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        ASSESSMENTS
      </Typography>
      <AssignmentDetails batchId={15} />
    </Container>
  );
};

export default AdminAssessmentDetailsPage;
