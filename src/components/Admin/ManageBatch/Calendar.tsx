/* eslint-disable @typescript-eslint/no-explicit-any */
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

type CalendarValue = Date | [Date, Date] | null;

const CustomCalendar: React.FC = () => {
  const [dates, setDates] = useState<DayNumberWithDateDTO[]>([]);
  const [value, setValue] = useState<CalendarValue>(new Date());
  const [holidayDate, setHolidayDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [loadingMark, setLoadingMark] = useState(false);
  const [loadingUnmark, setLoadingUnmark] = useState(false);
  const [openMarkDialog, setOpenMarkDialog] = useState(false);
  const [openUnmarkDialog, setOpenUnmarkDialog] = useState(false);

  const fetchDates = () => {
    setLoading(true);
    axios
      .get<DayNumberWithDateDTO[]>("http://localhost:8080/api/courses/dates/dayNumber")
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
    setLoadingMark(true);
    axios
      .post("http://localhost:8080/api/courses/mark-holiday/day", {
        holidayDate,
        description: "Holiday",
      })
      .then(() => {
        alert("Holiday marked successfully.");
        fetchDates();
      })
      .catch((error) => {
        console.error("Error marking holiday:", error);
      })
      .finally(() => {
        setLoadingMark(false);
      });
  };

  const handleUnmarkHoliday = () => {
    setLoadingUnmark(true);
    axios
      .post("http://localhost:8080/api/courses/unmark-holiday", { holidayDate })
      .then(() => {
        alert("Holiday unmarked successfully.");
        fetchDates();
      })
      .catch((error) => {
        console.error("Error unmarking holiday:", error);
      })
      .finally(() => {
        setLoadingUnmark(false);
      });
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
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

  const handleCalendarChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      // Use toISOString to ensure the date is properly normalized to UTC
      const selectedDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      setHolidayDate(selectedDate);
    } else if (Array.isArray(value) && value[0]) {
      const selectedDate = new Date(value[0].getTime() - value[0].getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      setHolidayDate(selectedDate);
    } else {
      setHolidayDate(""); // Handle the case of null
    }
    setValue(value);
  };  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography align="center" sx={{ color: "#8061C3", mb: 2, fontWeight: "bold", fontSize: "20px" }}>
        CALENDAR
      </Typography>
      <Calendar
        value={value}
        onChange={handleCalendarChange as any} // Cast the function to any to bypass type checks temporarily
        tileContent={tileContent}
        prevLabel={<span style={{ fontSize: "15px", color: "#8061C3" }}>‹</span>}
        nextLabel={<span style={{ fontSize: "15px", color: "#8061C3" }}>›</span>}
        navigationLabel={({ date }) => (
          <Typography sx={{ color: "#8061C3", fontWeight: "bold", fontSize: "15px" }}>
            {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </Typography>
        )}
        className="custom-calendar" // Custom class for styles
      />
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 4 }}>
        <TextField
          label="Date"
          type="date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputBase-input": { color: "#8061C5" },
            "& .MuiFormLabel-root.Mui-focused": { color: "#8061C5", borderColor: "#8061C5" },
          }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#DB5461", color: "#fff", "&:hover": { backgroundColor: "#C63C49" } }}
          onClick={() => setOpenMarkDialog(true)}
          disabled={loadingMark}
        >
          {loadingMark ? <CircularProgress size={20} color="inherit" /> : "Mark as Holiday"}
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5B8C5A", color: "#fff", "&:hover": { backgroundColor: "#4A6B49" } }}
          onClick={() => setOpenUnmarkDialog(true)}
          disabled={loadingUnmark}
        >
          {loadingUnmark ? <CircularProgress size={20} color="inherit" /> : "Unmark as Holiday"}
        </Button>
      </Box>

      {/* Mark Holiday Dialog */}
      <Dialog open={openMarkDialog} onClose={() => setOpenMarkDialog(false)}>
        <DialogTitle>Confirm Mark Holiday</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to mark {holidayDate} as a holiday?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarkDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleMarkHoliday();
              setOpenMarkDialog(false);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unmark Holiday Dialog */}
      <Dialog open={openUnmarkDialog} onClose={() => setOpenUnmarkDialog(false)}>
        <DialogTitle>Confirm Unmark Holiday</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to unmark {holidayDate} as a holiday?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnmarkDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleUnmarkHoliday();
              setOpenUnmarkDialog(false);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom CSS for Calendar */}
      <style>
        {`
          .custom-calendar {
            width: 100%;
            max-width: 1000px;
            background-color: transparent;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </Box>
  );
};

export default CustomCalendar;
