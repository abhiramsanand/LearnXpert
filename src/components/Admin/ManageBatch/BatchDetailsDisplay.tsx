/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { BatchDetails } from "../ManageBatch/BatchDetails";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BatchDetailsDisplayProps {
  batchDetails: BatchDetails;
  onUpdate: (updatedDetails: BatchDetails) => void;
}

const BatchDetailsDisplay: React.FC<BatchDetailsDisplayProps> = ({
  batchDetails,
  onUpdate,
}) => {
  const [editableBatchDetails, setEditableBatchDetails] =
    useState<BatchDetails>(batchDetails);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableBatchDetails({
      ...editableBatchDetails,
      [name]: new Date(value),
    });
  };

  const handleBlur = () => {
    onUpdate(editableBatchDetails);
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
                onBlur={handleBlur}
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
              <Button
                sx={{
                  backgroundColor: "#8061C3",
                  color: "white",
                  ml: "20px",
                  fontSize: "10px",
                  width: "250px",
                  mt: 1,
                }}
              >
                Configure calendar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BatchDetailsDisplay;
