import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateSelector;
