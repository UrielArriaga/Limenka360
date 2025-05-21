import { momentLocalizer, Views } from "react-big-calendar";
import { ActivitiesViewerStyled, CalendarStyled } from "./styles.js";
import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";
import CustomToolbar from "./CustomToolbar";
import "moment/locale/es";
import { usePendings } from "../../context/contextPendings.js";
import { useSelector } from "react-redux";
import { pendingsSelector } from "../../../../redux/slices/slopesSlice.js";
import { COLOR_EVENTS } from "../../config.js";
import { Modal, styled } from "@material-ui/core";

const localizer = momentLocalizer(moment);
moment.locale("es");

const formats = {};
function CalendarViewer({ setEventSelected, handleOpen }) {
  const {
    date,
    setDate,
    events,
    pendingType,
    calendarView,
    handleOnChangeView,
  } = usePendings();

  const { slopesTodayResults } = useSelector(pendingsSelector);
  const [open, setOpen] = useState(false);
  const [eventCurrent, setEventCurrent] = useState({});
  const [currentEventApi, setCurrentEventApi] = useState(null);

  const formattedEvents = slopesTodayResults.map((event, i) => {
    const {
      id,
      isdone,
      subject,
      description,
      date_from: dateFrom,
      date_to: dateTo,
      pendingstypeId,
    } = event;

    return {
      resourceId: pendingstypeId,
      id,
      title: subject,
      start: new Date(dateFrom),
      end: dateTo ? new Date(dateTo) : new Date(dateFrom),
      color: COLOR_EVENTS.find((color) => color.resourceId === pendingstypeId),
      isdone,
    };
  });

  // open modal
  const handleSelectSlot = (event) => {
    setEventSelected(event);
    handleOpen();
    // setOpen(true);
    // setEventCurrent(event);
  };

  // set color event, whent it´s showing
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.isdone
        ? "#f1f3f5"
        : event?.color?.bgColor || "#74c0fc",
      color: event.isdone ? "#868e96" : event?.color?.color || "#1c1c1c",
      fontWeight: "500",
      borderRadius: "6px",
      padding: "4px 6px",
      fontSize: "0.75rem",
      borderLeft: `4px solid ${
        event.isdone ? "#adb5bd" : event?.color?.color || "#228be6"
      }`,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
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

  return (
    <ActivitiesViewerStyled>
      <CalendarStyled
        localizer={localizer}
        events={slopesTodayResults}
        startAccessor="start"
        endAccessor="end"
        views={{ day: true, week: false, month: true }}
        defaultView={calendarView}
        onView={(view) => handleOnChangeView(view)}
        style={{ height: "100%", fontFamily: "", width: "1000px" }}
        // onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        // draggableAccessor={() => true}
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
