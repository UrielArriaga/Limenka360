import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import esLocale from "date-fns/locale/es";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Container } from "./styles";
import moment from "moment/moment";
import "moment/locale/es";
import dayjs from "dayjs";
import HomeIcon from "@material-ui/icons/Home";
import EventNoteIcon from "@material-ui/icons/EventNote";
import BuildIcon from "@material-ui/icons/Build";
import PhoneIcon from "@material-ui/icons/Phone";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
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

export default function BigCalendarComponent({
  handleClickOpenModal,
  eventsDate,
  handleSelectSlot,
  setSelectDate,
  handleClickOpenModalEdit,
  setSelectDateEdit,
}) {
  const localizer = momentLocalizer(moment);

  const RenderIcon = item => {
    switch (item) {
      case "Recordatorio":
        return <EventNoteIcon className="icon" />;
      case "Visita":
        return <CalendarTodayIcon className="icon" />;
      case "Cita":
        return <CalendarTodayIcon className="icon" />;
      case "Llamada":
        return <PhoneIcon className="icon" />;
      case "Tarea":
        return <AssignmentIcon className="icon" />;
      default:
        return null;
    }
  };


  const isEventPast = eventDate => {
    return new Date(eventDate) < new Date(); 
  };

  const showAppointment = ({ event }) => {
    const isPast = isEventPast(event.start); 

    return (
      <div className={`target-event-calendar ${isPast ? "past-event" : ""}`}>
        <div className="content_icon">{RenderIcon(event.typePedding)}</div>
        <div className="title">
          <p>{event?.title}</p>
        </div>
      </div>
    );
  };

  const showAppointmentWeek = ({ event }) => {
    const isPast = isEventPast(event.start); 

    return (
      <div className={`target-event-calendar ${isPast ? "past-event" : ""}`}>
        <div className="content_icon">{RenderIcon(event.typePedding)}</div>
        <div className="title">
          <p>{event?.title}</p>
        </div>
      </div>
    );
  };

  const showAppointmentDay = ({ event }) => {
    const isPast = isEventPast(event.start); 

    return (
      <div className={`target-event-calendar ${isPast ? "past-event" : ""}`}>
        <div className="content_icon">{RenderIcon(event.typePedding)}</div>
        <div className="title">
          <p>{event?.title}</p>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <div className="content_title">
        <h2 className="title">Calendario de pendientes Proveedores</h2>
        <button className="button" onClick={() => handleClickOpenModal()}>Nuevo Pendiente</button>
      </div>
      <Calendar
        events={eventsDate}
        localizer={localizer}
        startAccessor={event => new Date(event.start)}
        endAccessor={event => new Date(event.end)}
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
          handleClickOpenModalEdit();
          setSelectDateEdit(e.itemdetails);
        }}
        onSelectSlot={e => {
          handleSelectSlot(e);
          setSelectDate(e);
          handleClickOpenModal();
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
