import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import dayjs from "dayjs";
import { Tooltip } from "@material-ui/core";

function DashboardCalendarBio() {
  const localizer = momentLocalizer(moment);
  const [eventsCalendary, setEventsCalendary] = useState([
    {
      start: dayjs(new Date()).startOf("day").toDate(),
      end: dayjs(new Date()).endOf("day").toDate(),
      title: "evento 1",
    },
    {
      start: dayjs(new Date()).startOf("day").add(1, "day").toDate(),
      end: dayjs(new Date()).endOf("day").add(1, "day").toDate(),
      title: "evento 2",
    },
    {
      start: dayjs(new Date()).startOf("day").add(2, "day").toDate(),
      end: dayjs(new Date()).endOf("day").add(2, "day").toDate(),
      title: "evento 3",
    },
  ]);

  const ComponentTooltip = ({evento}) => {
    return (
      <Tooltip placement="top" title="evento">
        <div className="target">
          <div className="type">
            <p>{evento.title}</p>
          </div>
        </div>
      </Tooltip>
    );
  };

  const MonthEvent = ({ event }) => {
    return <ComponentTooltip evento={event} /> ;
  };
  const WeekEvent = ({ event }) => {
    return <ComponentTooltip evento={event} /> ;
  };

  return (
    <div className="compontentCalendar">
      <h3>Calendario de Administrador Biomedica</h3>
      <Calendar
        localizer={localizer}
        events={eventsCalendary}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        style={{ height: 500, width: "100%" }}
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
        onView={e=> {
          console.log(e, "evento");
          
        }}
        tooltipAccessor={false}
        components={{ month: { event: MonthEvent }, week: { event: WeekEvent } }}
      />
    </div>
  );
}

export default DashboardCalendarBio;
