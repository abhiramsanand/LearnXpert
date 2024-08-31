import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BatchSelect from "../../shared components/Admin/BatchSelect";
import CourseContainer from "../../components/Admin/CourseView/CourseContainer";
import { Add } from "@mui/icons-material";

const AdminCoursePage = () => {
  const [selectedBatch, setSelectedBatch] = useState<number | null>(15);

  const handleBatchSelect = (batchId: number) => {
    setSelectedBatch(batchId);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
    >
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mb: 2,
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        COURSES
      </Typography>
      <Box mb={2} display="flex" justifyContent="space-between" width="100%">
        <BatchSelect
          selectedBatch={selectedBatch || 0}
          onBatchSelect={handleBatchSelect}
        />
        <Link to="/Admin-CourseCreation">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{
              borderRadius: "20px",
              backgroundColor: "#8061C3",
              "&:hover": {
                backgroundColor: "#6A529D",
              },
            }}
          >
            Add Course
          </Button>
        </Link>
      </Box>
      <CourseContainer selectedBatch={selectedBatch} />
    </Box>
  );
};

export default AdminCoursePage;
