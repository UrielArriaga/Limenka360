import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, IconButton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import { PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { usePendings } from "../../context/contextPendings";
import { getPendingDays } from "../../utils/utils";
import {
  DEFAULT_COLOR_POINT_CALENDAR_DONE,
  DEFAULT_COLOR_POINT_CALENDAR_NOTDONE,
} from "../../config";

const darkTheme = createTheme({
  palette: {
    background: {
      paper: "#eeeeee", // Fondo medio oscuro
    },
    text: {
      primary: "#000", // Texto negro
      secondary: "#222",
    },
  },
  components: {
    MuiPickersDay: {
      styleOverrides: {
        root: {
          borderRadius: "50% !important",
          color: "#000", // Texto negro en los días
          backgroundColor: "#2e2e2e",
          "&.Mui-selected": {
            backgroundColor: "#90caf9",
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#b3e5fc",
            color: "#fff",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#000", // Íconos
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#000", // Flechas y otros íconos
        },
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiPickersStaticWrapper: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e2e2e",
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: "#2e2e2e",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#eeeeee",
        },
        label: {
          color: "#000",
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
            backgroundColor: "#4288D3",
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
              backgroundColor: pendingIsDone
                ? DEFAULT_COLOR_POINT_CALENDAR_DONE
                : DEFAULT_COLOR_POINT_CALENDAR_NOTDONE,
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
      {/* <CssBaseline /> */}
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
