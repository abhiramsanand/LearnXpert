/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AssignmentDetails from "../../components/Admin/AssessmentDetails/TraineeAssessmentDetails";
import { Box, Container, Typography } from "@mui/material";

// Define Batch type interface
interface Batch {
  id: number;
  name: string;
  isActive: boolean;
}

const AdminAssessmentDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeBatch, setActiveBatch] = useState<Batch | null>(null); // Use Batch type or null
  const [error, setError] = useState("");

  // Fetch active batch and set loading state
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchResponse = await fetch("https://ilpex-backend.onrender.com/api/v1/batches");
        const batches: Batch[] = await batchResponse.json(); // Expecting an array of Batch type

        // Find the active batch
        const foundActiveBatch = batches.find((batch: Batch) => batch.isActive);
        if (!foundActiveBatch) {
          setError("No active batch found");
        } else {
          setActiveBatch(foundActiveBatch);
        }
      } catch (err) {
        console.error("Failed to fetch batches", err);
        setError("Failed to fetch batches");
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  // Loading screen with animated text
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

  // Error handling
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography color="error" variant="h6">{error}</Typography>
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
      {activeBatch ? (
        <AssignmentDetails batchId={activeBatch.id} />
      ) : (
        <Typography>No active batch available</Typography>
      )}
    </Container>
  );
};

export default AdminAssessmentDetailsPage;
