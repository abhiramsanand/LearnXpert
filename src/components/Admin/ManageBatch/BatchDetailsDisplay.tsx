import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { BatchDetails } from "../ManageBatch/BatchDetails";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BatchDetailsDisplayProps {
  batchDetails: BatchDetails;
}

const BatchDetailsDisplay: React.FC<BatchDetailsDisplayProps> = ({
  batchDetails,
}) => {
  const [editableBatchDetails, setEditableBatchDetails] =
    useState<BatchDetails>(batchDetails);

  const handleDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedDate = new Date(value);
    setEditableBatchDetails({
      ...editableBatchDetails,
      [name]: updatedDate,
    });

    try {
      const batchResponse = await fetch("http://localhost:8080/api/v1/batches");
        const batches = await batchResponse.json();

        // Find the active batch
        const activeBatch = batches.find((batch: { isActive: boolean }) => batch.isActive);
        if (!activeBatch) {
          console.error("No active batch found");
          return;
        }
      const response = await fetch(
        `http://localhost:8080/api/v1/batches/${activeBatch.id}/update-end-date`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endDate: updatedDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update end date");
      }
      // Optionally show a success message to the user
    } catch (error) {
      console.error("Error updating end date:", error);
      // Handle error, perhaps show an error message to the user
    }
  };

  return (
    <Box sx={{ mt: -3 }}>
      <Link to="/admin-home">
        <IconButton
          sx={{
            color: "#8061C3",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(0.9)",
            },
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
      </Link>
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
        MANAGE BATCH
      </Typography>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {batchDetails && (
              <>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#8061C3",
                  }}
                >
                  {batchDetails.batchName}
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "#A281EA" }}>
                  {batchDetails.programName} Batch
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "#A281EA" }}>
                  Start Date:{" "}
                  {new Date(batchDetails.startDate).toISOString().split("T")[0]}
                </Typography>
              </>
            )}
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={
                  new Date(editableBatchDetails.endDate)
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleDateChange}
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputBase-root": {
                    padding: "4px 8px",
                    width: "100%",
                    height: "30px",
                    backgroundColor: "#f0f0f0",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8061C3",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#A281EA",
                    "&.Mui-focused": {
                      color: "#8061C3",
                    },
                  },
                }}
              />
              <Link to={"/Admin-Calendar"}>
                <Button
                  sx={{
                    backgroundColor: "#8061C3",
                    color: "white",
                    fontSize: "10px",
                    width: "250px",
                    mt: 1,
                    ml: 2,
                    "&:hover": {
                      backgroundColor: "#5b3f9f",
                    },
                  }}
                >
                  Configure calendar
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BatchDetailsDisplay;
