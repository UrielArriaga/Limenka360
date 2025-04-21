import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, IconButton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import { PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { usePendings } from "../../context/contextPendings";
import { getPendingDays } from "../../utils/utils";
import { DEFAULT_COLOR_POINT_CALENDAR_DONE, DEFAULT_COLOR_POINT_CALENDAR_NOTDONE } from "../../config";

const darkTheme = createTheme({
  palette: {
    background: {
      paper: "#212529",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: "50% !important",
          color: "#fff",
          "&.Mui-selected": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

const CalendarInput = () => {
  const { date, setDate, events, filters } = usePendings();
  const markedDays = getPendingDays(events || []);

  const renderDay = (day, _, pickersDayProps) => {
    const formattedDate = day.format("YYYY-MM-DD");

    const isMarked = markedDays.includes(formattedDate);

    const pendingIsDone = !filters.byPerform;

    const isOutsideCurrentMonth = pickersDayProps.outsideCurrentMonth;

    return (
      <Box position="relative">
        <PickersDay
          {...pickersDayProps}
          sx={{
            borderRadius: "50% !important",

            color: isOutsideCurrentMonth ? "#777" : "#fff",
            opacity: isOutsideCurrentMonth ? 0.6 : 1,
          }}
        />
        {isMarked && (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: pendingIsDone ? DEFAULT_COLOR_POINT_CALENDAR_DONE : DEFAULT_COLOR_POINT_CALENDAR_NOTDONE,
              position: "absolute",
              bottom: 4,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        )}
      </Box>
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={date}
          onChange={setDate}
          renderDay={renderDay}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CalendarInput;
