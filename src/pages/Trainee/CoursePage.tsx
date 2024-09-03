import { Typography } from "@mui/material";
import CourseContainer from "../../components/Trainee/Course/CourseContainer";

const CoursePage = () => {
  const traineeId = parseInt(localStorage.getItem("traineeId") || "0", 10);

  return (
    <div>
      <Typography
        align="center"
        sx={{
          color: "#8061C3",
          mt: "15px",
          ml: "-3",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        PROGRESS
      </Typography>
      <CourseContainer traineeId={traineeId} />
    </div>
  );
};

export default CoursePage;
