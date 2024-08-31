import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

interface BatchSelectProps {
  selectedBatch: number;
  onBatchSelect: (batchId: number) => void;
}

interface Batch {
  id: number;
  batchName: string;
  isActive: boolean;
}

const BatchSelect: React.FC<BatchSelectProps> = ({
  selectedBatch,
  onBatchSelect,
}) => {
  const [batches, setBatches] = useState<Batch[]>([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch("http://localhost:8080/api/v1/batches")
      .then((response) => response.json())
      .then((data) => {
        setBatches(data);
      })
      .catch((error) => {
        console.error("Error fetching batch data:", error);
      });
  }, []);

  return (
    <FormControl
      size="small"
      variant="outlined"
      sx={{
        width: "200px",
        textAlign: "left",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#8061C3",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#5B8C5A",
          },
        },
      }}
    >
      <InputLabel
        shrink
        htmlFor="batch-select"
        sx={{
          color: "#8061C3",
          "&.Mui-focused": {
            color: "#5B8C5A",
          },
        }}
      >
        Select Batch
      </InputLabel>
      <Select
        label="Select Batch"
        value={selectedBatch}
        onChange={(event) => onBatchSelect(Number(event.target.value))}
        inputProps={{
          id: "batch-select",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .Mui-selected": {
                backgroundColor: "#8061C3 !important",
                color: "white !important",
              },
            },
          },
        }}
        sx={{
          "& .MuiSelect-select": {
            padding: "10px 20px",
          },
        }}
      >
        {batches.map((batch) => (
          <MenuItem
            key={batch.id}
            value={batch.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px 20px",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" sx={{ fontSize: "12px" }}>
                {batch.batchName}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "6px" }}>
                {batch.isActive ? "Active" : "Complete"}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BatchSelect;
