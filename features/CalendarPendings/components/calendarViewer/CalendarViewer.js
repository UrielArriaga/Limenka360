import { momentLocalizer, Views } from "react-big-calendar";
import { ActivitiesViewerStyled, CalendarStyled } from "./styles.js";

import moment from "moment";
import { useEffect, useState } from "react";
// import { getEvent, getEvents, updateEvent } from "@/app/_services/apiEvents";

import dayjs from "dayjs";
import CustomToolbar from "./CustomToolbar";
import CreatePending from "../createPending/CreatePending";
import { getAllPendings, updatePending } from "../../service/pendingsApi.js";
import { colorsEvents } from "../createPending/styles.js";

import "moment/locale/es"; // Importa español
import { usePendings } from "../../context/contextPendings.js";

const localizer = momentLocalizer(moment);
moment.locale("es");

const formats = {
  // timeGutterFormat: "h:m a", // Mantiene el formato de 24 horas sin AM/PM
};

// export const resources = [
//   { resourceId: 1, resourceTitle: "Llamada" },
//   { resourceId: 2, resourceTitle: "Videollamada" },
//   { resourceId: 3, resourceTitle: "Demos" },
//   { resourceId: 4, resourceTitle: "Visita" },
//   { resourceId: 5, resourceTitle: "WhatsApp" },
//   { resourceId: 6, resourceTitle: "Forecast" },
// ];

// function CalendarViewer({ date, setDate, events = [], setEvents, pendingType, newProperty, setNewProperty }) {
function CalendarViewer() {
  const { date, setDate, events, pendingType } = usePendings();

  const [open, setOpen] = useState(false);
  const [eventCurrent, setEventCurrent] = useState({});
  const [currentEventApi, setCurrentEventApi] = useState(null);

  // open modal
  const handleSelectSlot = (event) => {
    setOpen(true);
    setEventCurrent(event);
  };

  // set color event, whent it´s showing
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.isdone ? "#e9ecef" : event?.color?.bgColor,
      color: event.isdone ? "#868e96" : event?.color?.color,
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 8px",
      zIndex: "999",
      textTransform: "capitalize",
      fontSize: "0.8rem",
      borderLeft: `3px solid ${event.isdone ? "#868e96" : event?.color?.color}`,
    },
  });

  const handleGetEvent = async (ev) => {
    try {
      const event = await getEvent(ev?.id);

      setCurrentEventApi(event);
      setEventCurrent(event);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Update date event drop
  // const onEventDrop = async ({ event, start, end, resourceId }) => {
  //   try {
  //     const withEndDates = ["62dp9dPnCtgdfTodXAUuzr1N", "62dN6LUisuI0rTZm1p5l5Lcp"];

  //     if (withEndDates.includes(resourceId)) return;

  //     const date_to = withEndDates.includes(resourceId) ? end : null;

  //     await updatePending(event.id, { date_from: start });
  //     setNewProperty(property => !property);
  //   } catch (error) {
  //     console.log("Error updating event:", error);
  //   }
  // };

  // Update resizing event date
  // const onEventResize = async ({ event, start, end }) => {
  //   try {
  //     const updatedEvent = { ...event, eventAt: `${start}*${end}` };
  //     await updateEvent(event.id, updatedEvent);
  //     setNewProperty(property => !property);
  //   } catch (error) {
  //     console.log("Error updating event:", error);
  //   }
  // };

  return (
    <ActivitiesViewerStyled>
      <CalendarStyled
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={{ day: true, week: false, month: true }}
        defaultView={Views.DAY}
        style={{ height: "100%", fontFamily: "", width: "1000px" }}
        // onSelectSlot={handleSelectSlot}
        // onSelectEvent={handleGetEvent}
        eventPropGetter={eventStyleGetter}
        draggableAccessor={() => true}
        // onEventDrop={onEventDrop}
        resources={pendingType}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        date={new Date(date)}
        onNavigate={(date) => setDate(dayjs(date))}
        components={{
          toolbar: CustomToolbar,
        }}
        // selectable
        // popup
        // onEventResize={onEventResize}
        // resizables
        // resizableAccessor={() => true}
        formats={formats}
        min={new Date(new Date().setHours(7, 0, 0, 0))}
      />

      {/* <CreatePending
        open={open}
        setOpen={setOpen}
        eventCurrent={eventCurrent}
        setEventCurrent={setEventCurrent}
        setNewProperty={setNewProperty}
        currentEventApi={currentEventApi}
      /> */}
    </ActivitiesViewerStyled>
  );
}

export default CalendarViewer;
