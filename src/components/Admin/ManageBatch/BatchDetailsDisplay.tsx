/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditableBatchDetails({
      ...editableBatchDetails,
      [name]: new Date(value),
    });
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/batches/15/update-end-date`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endDate: editableBatchDetails.endDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update end date");
      }
      setIsModalOpen(false);
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
                    width: "60%",
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
                  backgroundColor: "#5B8C5A",
                  color: "white",
                  ml: "-110px",
                  fontSize: "10px",
                  width: "130px",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#3C673B",
                  },
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Confirm
              </Button>
              <Button
                sx={{
                  backgroundColor: "#8061C3",
                  color: "white",
                  ml: "50px",
                  fontSize: "10px",
                  width: "250px",
                  mt: 1,
                  "&:hover": {
                    backgroundColor: "#5b3f9f",
                  },
                }}
              >
                Configure calendar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Confirm End Date Update
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Are you sure you want to update the end date to{" "}
              {
                new Date(editableBatchDetails.endDate)
                  .toISOString()
                  .split("T")[0]
              }
              ?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setIsModalOpen(false)}
                sx={{ backgroundColor: "#DB5461" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{ backgroundColor: "#5B8C5A" }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default BatchDetailsDisplay;
