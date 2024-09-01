import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface DayNumberWithDateDTO {
  date: string;
  dayNumber: number;
}

const CustomCalendar: React.FC = () => {
  const [dates, setDates] = useState<DayNumberWithDateDTO[]>([]);
  const [value, setValue] = useState<Date | Date[]>(new Date());
  const [holidayDate, setHolidayDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [loadingMark, setLoadingMark] = useState(false);
  const [loadingUnmark, setLoadingUnmark] = useState(false);
  const [openMarkDialog, setOpenMarkDialog] = useState(false);
  const [openUnmarkDialog, setOpenUnmarkDialog] = useState(false);

  // Function to fetch dates
  const fetchDates = () => {
    setLoading(true);
    axios
      .get<DayNumberWithDateDTO[]>(
        "http://localhost:8080/api/courses/dates/dayNumber"
      )
      .then((response) => {
        setDates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dates:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const handleMarkHoliday = () => {
    setLoadingMark(true); // Start loading
    axios
      .post("http://localhost:8080/api/courses/mark-holiday/day", {
        holidayDate,
        description: "Holiday",
      })
      .then(() => {
        alert("Holiday marked successfully.");
        fetchDates(); // Refresh dates after marking a holiday
      })
      .catch((error) => {
        console.error("Error marking holiday:", error);
      })
      .finally(() => {
        setLoadingMark(false); // Stop loading
      });
  };

  const handleUnmarkHoliday = () => {
    setLoadingUnmark(true); // Start loading
    axios
      .post("http://localhost:8080/api/courses/unmark-holiday", { holidayDate })
      .then(() => {
        alert("Holiday unmarked successfully.");
        fetchDates(); // Refresh dates after unmarking a holiday
      })
      .catch((error) => {
        console.error("Error unmarking holiday:", error);
      })
      .finally(() => {
        setLoadingUnmark(false); // Stop loading
      });
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });
      const dayData = dates.find((d) => d.date === formattedDate);

      const isWorkingDay = Boolean(dayData);
      const backgroundColor = isWorkingDay ? "#5B8C5A" : "#DB5461";

      return (
        <Box
          sx={{
            backgroundColor,
            color: "#fff",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {dayData ? (
            <Typography variant="h6" sx={{ mt: -1, mb: 1 }}>
              {dayData.dayNumber}
            </Typography>
          ) : null}
        </Box>
      );
    }
    return null;
  };

  const handleCalendarChange = (date: Date | Date[]) => {
    let adjustedDate;

    if (Array.isArray(date)) {
      adjustedDate = new Date(date[0].getTime() + 24 * 60 * 60 * 1000);
    } else {
      adjustedDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }

    setValue(adjustedDate);
    setHolidayDate(adjustedDate.toISOString().split("T")[0]);
  };

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
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
        CALENDAR
      </Typography>
      <Calendar
        value={value}
        onChange={handleCalendarChange}
        tileContent={tileContent}
        prevLabel={
          <span style={{ fontSize: "15px", color: "#8061C3" }}>‹</span>
        }
        nextLabel={
          <span style={{ fontSize: "15px", color: "#8061C3" }}>›</span>
        }
        navigationLabel={({ date }) => (
          <Typography
            sx={{ color: "#8061C3", fontWeight: "bold", fontSize: "15px" }}
          >
            {date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Typography>
        )}
        sx={{
          width: "100%",
          maxWidth: "1000px",
          backgroundColor: "transparent",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          "& .react-calendar__tile": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
            height: "100px",
            width: "100px",
            borderRadius: "8px",
          },
          "& .react-calendar__navigation": {
            display: "flex",
            justifyContent: "center",
          },
          "& .react-calendar__month-view__weekdays": {
            backgroundColor: "#e7e1f4",
            color: "#8061C3",
            fontSize: "10px",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "8px 0",
            borderRadius: "8px",
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 4 }}>
        <TextField
          label="Date"
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "#8061C3",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "#8061C3",
              borderColor: "#8061C3",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#DB5461",
            color: "#fff",
            "&:hover": { backgroundColor: "#6749a4" },
          }}
          onClick={() => setOpenMarkDialog(true)}
          disabled={loadingMark} // Disable button while loading
        >
          {loadingMark ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Mark as Holiday"
          )}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5B8C5A",
            color: "#fff",
            "&:hover": { backgroundColor: "#c53939" },
          }}
          onClick={() => setOpenUnmarkDialog(true)}
          disabled={loadingUnmark} // Disable button while loading
        >
          {loadingUnmark ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Unmark Holiday"
          )}
        </Button>
      </Box>

      {/* Confirmation Dialog for Marking Holiday */}
      <Dialog open={openMarkDialog} onClose={() => setOpenMarkDialog(false)}>
        <DialogTitle>{"Confirm Mark as Holiday"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this date as a holiday?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarkDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleMarkHoliday();
              setOpenMarkDialog(false);
            }}
            color="primary"
            autoFocus
            disabled={loadingMark}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Unmarking Holiday */}
      <Dialog
        open={openUnmarkDialog}
        onClose={() => setOpenUnmarkDialog(false)}
      >
        <DialogTitle>{"Confirm Unmark Holiday"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unmark this holiday?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnmarkDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUnmarkHoliday();
              setOpenUnmarkDialog(false);
            }}
            color="primary"
            autoFocus
            disabled={loadingUnmark}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomCalendar;
