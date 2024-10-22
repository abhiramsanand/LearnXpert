/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  const [value, setValue] = useState<Date | [Date, Date]>(new Date());
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
      .get<DayNumberWithDateDTO[]>("https://ilpex-backend.onrender.com/api/courses/dates/dayNumber")
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
      .post("https://ilpex-backend.onrender.com/api/courses/mark-holiday/day", {
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
      .post("https://ilpex-backend.onrender.com/api/courses/unmark-holiday", { holidayDate })
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

  const handleCalendarChange = (value: Date | [Date, Date] | null) => {
    if (value instanceof Date) {
      const adjustedDate = new Date(value.getTime() + 24 * 60 * 60 * 1000);
      setValue(adjustedDate);
      setHolidayDate(adjustedDate.toISOString().split("T")[0]);
    }
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
        // @ts-ignore
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
            "&:hover": { backgroundColor: "#C63C49" },
          }}
          onClick={() => setOpenMarkDialog(true)}
          disabled={loadingMark} // Disable button while loading
        >
          {loadingMark ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Mark Holiday"
          )}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5B8C5A",
            color: "#fff",
            "&:hover": { backgroundColor: "#416741" },
          }}
          onClick={() => setOpenUnmarkDialog(true)}
          disabled={loadingUnmark} // Disable button while loading
        >
          {loadingUnmark ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Unmark Holiday"
          )}
        </Button>
      </Box>

      <Dialog
        open={openMarkDialog}
        onClose={() => setOpenMarkDialog(false)}
        aria-labelledby="mark-holiday-dialog-title"
        aria-describedby="mark-holiday-dialog-description"
      >
        <DialogTitle id="mark-holiday-dialog-title">Mark Holiday</DialogTitle>
        <DialogContent>
          <DialogContentText id="mark-holiday-dialog-description">
            Are you sure you want to mark this day as a holiday?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMarkDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleMarkHoliday();
              setOpenMarkDialog(false);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUnmarkDialog}
        onClose={() => setOpenUnmarkDialog(false)}
        aria-labelledby="unmark-holiday-dialog-title"
        aria-describedby="unmark-holiday-dialog-description"
      >
        <DialogTitle id="unmark-holiday-dialog-title">Unmark Holiday</DialogTitle>
        <DialogContent>
          <DialogContentText id="unmark-holiday-dialog-description">
            Are you sure you want to unmark this day as a holiday?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUnmarkDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleUnmarkHoliday();
              setOpenUnmarkDialog(false);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomCalendar;
