import moment from "moment";
import React from "react";
import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarPendingsStyled } from "./styled";
import dayjs from "dayjs";
const localizer = momentLocalizer(moment);
// const localizer = dayjsLocalizer(dayjs);
export default function CalendarPendings({ calendarData = {} }) {
  return (
    <CalendarPendingsStyled>
      <h4>Calendario</h4>

      <Calendar
        localizer={localizer}
        events={calendarData?.events}
        startAccessor="start"
        endAccessor="end"
        defaultView={"month"}
        // onNavigate={handleNavigationDate}
        onView={e => {
          if (e !== "agenda") {
            setViewOption(e);
            setFlag(!flag);
          }
        }}
        views={["month", "week", "day"]}
        style={{ height: 500 }}
        messages={{
          next: ">",
          today: "Hoy",
          previous: "<",
          month: "Mes",
          week: "Semana",
          day: "Día",
          date: "Fecha",
          time: "Horario",
          event: "Pendiente",
        }}
        tooltipAccessor={false}
        // components={{ month: { event: MonthEvent }, week: { event: weekEvent }, day: { event: MonthEvent } }}
      />
    </CalendarPendingsStyled>
  );
}
