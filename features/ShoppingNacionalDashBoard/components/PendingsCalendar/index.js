import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Add, ArrowBackIos, ArrowForwardIos, NextWeek } from "@material-ui/icons";
import { Container } from "./styles";
import moment from "moment/moment";
import "moment/locale/es";

const locales = {
  es: esLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function PendingsCalendar({
  eventsDate,
  toggleModalCreate,
  setSlotSelected,
  setSlotToEdit,
  toggleModalEdit,
}) {
  const localizer = momentLocalizer(moment);

  const showAppointment = ({ event }) => {
    return (
      <div className="target-event-calendar">
        <p>{event?.title}</p>
        {/* <p>{event?.itemdetails.date_from}</p> */}
      </div>
    );
  };
  const showAppointmentWeek = ({ event }) => {
    return (
      <div className="target-event-calendar">
        <p> {event?.title}</p>
      </div>
    );
  };
  const showAppointmentDay = ({ event }) => {
    return (
      <div className="target-event-calendar-day">
        <p>{event?.title}</p>
      </div>
    );
  };

  return (
    <Container>
      <h2 className="title">Calendario de Ordenes de Compra Pendientes</h2>
      <Calendar
        events={eventsDate?.data}
        localizer={localizer}
        startAccessor={event => {
          return new Date(event.start);
        }}
        endAccessor={event => {
          return new Date(event.end);
        }}
        defaultDate={new Date()}
        defaultView="month"
        views={["month", "week", "day"]}
        messages={{
          next: <ArrowForwardIos className="icon" />,
          previous: <ArrowBackIos className="icon" />,
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          date: "Fecha",
          time: "Horario",
          event: "Pendiente",
        }}
        onSelectEvent={e => {
          console.log("event to edit: ", e);
          setSlotToEdit(e.detailsPending);
          toggleModalEdit();
        }}
        onSelectSlot={e => {
          console.log("event to create", e);
          setSlotSelected(e);
          toggleModalCreate();
        }}
        components={{
          month: { event: showAppointment },
          week: { event: showAppointmentWeek },
          day: { event: showAppointmentDay },
        }}
        selectable
      />
    </Container>
  );
}
