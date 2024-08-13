import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DateSelector from "./DateSelector";
import Data from "./Data.json";  // Import the JSON data

const DailyReportContainer: React.FC = () => {
  const [courses, setCourses] = useState(Data); // Load data from JSON
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredCourses = Data.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCourses(filteredCourses);
  }, [searchTerm]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Daily Report
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: "200px"
              
              , // Set a fixed width similar to DateSelector
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 20,
                border: '2px solid #8061C3',
                height:"30px"
              }
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <DateSelector />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8061C3",
              textTransform: "none",
              height: "40px",  // Ensure the button height matches other elements
              borderRadius: "20px",
            }}
          >
            View Whole Report
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8061C3",
              textTransform: "none",
              height: "40px",  // Ensure the button height matches other elements
              borderRadius: "20px",
            }}
          >
            Pending Submissions
          </Button>
        </Box>

        <Box 
          sx={{
            backgroundColor: "#f3e8ff",
            borderRadius: 2,
            p: 3,
            flexGrow: 1,
          }}
        >
          <Grid container spacing={2}>
            {courses.map((course, index) => (
              <Grid item xs={12} key={index}>
                 <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Grid container alignItems="center">
                      {/* Course Name on the Left */}
                      <Grid item xs={4}>
                        <Typography variant="body2">{course.name}</Typography>
                      </Grid>

                      {/* Duration Time Centered */}
                      <Grid item xs={4} sx={{ textAlign: "center" }}>
                        <Typography variant="body2">{course.duration}</Typography>
                      </Grid>

                      {/* Edit and View Icons on the Right */}
                      <Grid
                        item
                        xs={4}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <IconButton>
              <Avatar sx={{ backgroundColor: "#8061C3" }}>+</Avatar>
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DailyReportContainer;
