import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import localeEs from "dayjs/locale/es";

dayjs.extend(updateLocale);
dayjs.locale(localeEs);

const localizer = dayjsLocalizer(dayjs);

export default function CalendarView({ data, actions }) {
  const events = data?.results.map((item) => ({
    title: `${item.subject} - ${item.pendingstype?.name || "Sin tipo"}`,
    start: new Date(item.date_from),
    end: new Date(item.date_to || item.date_from),
    status: item.status,
    allDay: false,
    resource: item,
  }));

  const eventStyleGetter = (event) => {
    let backgroundColor = "#004d40"; // default

    switch (event.status) {
      case 1:
        backgroundColor = "#00796B";
        break; // prospecto
      case 2:
        backgroundColor = "#F57C00";
        break; // oportunidad
      case 3:
        backgroundColor = "#388E3C";
        break; // cliente
      case 4:
        backgroundColor = "#1976D2";
        break; // venta
      case 5:
        backgroundColor = "#D32F2F";
        break; // pedido
      default:
        backgroundColor = "#616161";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "8px",
        padding: "4px 8px",
        fontWeight: "500",
      },
    };
  };

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "85vh" }}
        popup
        tooltipAccessor={(event) => event.resource.description}
        eventPropGetter={eventStyleGetter}
        views={["month", "week", "day", "agenda"]}
        onSelectEvent={(event) => {
          actions.handleOnClickProspects(event.resource);
        }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Pendiente",
          noEventsInRange: "No hay pendientes en este rango",
        }}
      />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  padding: 1rem;
  /* background: #f0f0f0; */
  border-radius: 12px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
`;
