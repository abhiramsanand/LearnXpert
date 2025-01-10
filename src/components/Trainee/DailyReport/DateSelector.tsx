/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { enGB } from "date-fns/locale"; // Use enGB for dd-MM-yyyy format

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <DatePicker
        value={selectedDate}
        onChange={onDateChange}
        slotProps={{
          textField: {
            variant: "outlined",
            sx: {
              "& .MuiInputBase-root": {
                minWidth: "200px",
                height: "30px",
                borderRadius: "20px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            },
            inputProps: {
              placeholder: "dd-MM-yyyy", // Show format as a placeholder
            },
          },
        }}
        views={["year", "month", "day"]} // Ensure day, month, and year are displayed
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
