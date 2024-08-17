import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const BatchForm: React.FC = () => {
  const navigate = useNavigate(); 
  const handleNext = () => {
    navigate('/Admin-BatchAdd2'); // Redirect to batchAdd2.tsx
  };
  return (
    <Container>
      <Box
        sx={{
          mt: 2,
          p: 4,
          bgcolor: "#ffffff", // Softer background color
          borderRadius: "15px",
          boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography variant="h4" fontFamily={"Montserrat, sans-serif"}>
          CREATE BATCH
        </Typography>

        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                select
                label="Select Program"
                variant="outlined"
                sx={{
                  bgcolor: "#FFF",
                  width:"250px",
                  borderRadius: "4px",
                }}
              >
                <MenuItem value="program1">Program 1</MenuItem>
                <MenuItem value="program2">Program 2</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Batch Name"
                variant="outlined"
                placeholder="ILP-2023-B03"
                InputProps={{
                  sx: {
                    bgcolor: "#FFF",
                    width: "250px",
                    "& .MuiSelect-select": {
                    },
                    borderRadius: "4px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Start Date (Tentative)"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  bgcolor: "#FFF",
                  width:"250px",
                  "& .MuiSelect-select": {                  
                  },
                  borderRadius: "4px",
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="End Date (Tentative)"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  bgcolor: "#FFF",
                  width:"250px",
                  "& .MuiSelect-select": {
                    width: "250px",
                  },
                  borderRadius: "4px",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                Upload the list of trainees (Format: .xlsx)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                
                
                sx={{
                  color: "#8061C3",
                  bgcolor: "#ffff",
                  border: "6px #8061C3",
                  borderRadius: "24px",
                  height: "46px", // increase button height
                  fontSize: "16px", // increase font size
                  marginRight: "26px",
                  borderColor:"#8061C3",
                  "&:hover": {
                    bgcolor: "#D0C7FF",
                  },
                }}
              >
                +  UPLOAD FILE
                <input type="file" hidden />
              </Button>

              <Typography variant="caption" color="textSecondary">
                Don’t have a template? Download it from{" "}
                <a href="#" style={{ color: "#6C63FF" }}>
                  here
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                sx={{
                  color: "#8061C3",
                  borderColor: "#8061C3",
                  borderRadius: "4px",
                  height: "36px", // increase button height
                  width:"90px",
                  fontSize: "16px", // increase font size
                  marginRight: "26px", // add space between buttons
                  "&:hover": {
                    borderColor: "#D0C7FF",
                    bgcolor: "white",
                  },
                }}
              >
                CANCEL
              </Button>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#8061C3",
                  color: "#FFFFFF",
                  borderRadius: "4px",
                  height: "36px", // increase button height
                  width:"90px",
                  fontSize: "16px", // increase font size
                  "&:hover": {
                    bgcolor: "#D0C7FF",
                  },
                }}
                onClick={handleNext}
              >
                NEXT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default BatchForm;
