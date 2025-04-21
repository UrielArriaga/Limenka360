"use client";

import { useEffect, useState } from "react";

import { Button, Input, Radio, TextField } from "@mui/material";

import {
  ChooseColorEvent,
  colorsEvents,
  ContainerInputTime,
  FormCreateEvent,
  HeadInfo,
  NewEvent,
  TextFieldStyled,
} from "./styles";
import ModalWindow from "../ui/ModalWindow";
import InputTime from "../ui/InputTime";
import { resources } from "../calendarViewer/CalendarViewer";

function CreatePending({ eventCurrent, setEventCurrent, setOpen, open, setNewProperty, currentEventApi }) {
  const [nameEvent, setNameEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [selectedValue, setSelectedValue] = useState("a");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  useEffect(() => {
    if (eventCurrent) {
      setNameEvent(eventCurrent.title || "");
      setDescriptionEvent(eventCurrent.description || "");

      const startHour =
        new Date(eventCurrent.start).getHours().toString().padStart(2, "0") +
        ":" +
        new Date(eventCurrent.start).getMinutes().toString().padStart(2, "0");

      const endHour =
        new Date(eventCurrent.end).getHours().toString().padStart(2, "0") +
        ":" +
        new Date(eventCurrent.end).getMinutes().toString().padStart(2, "0");

      setTime1(startHour || "");
      setTime2(endHour || "");
    }
  }, [eventCurrent]);

  const getDatesStartAndEnd = currEv => {
    const datesArr = currEv.eventAt.split("*");
    return datesArr;
  };

  const handleAccept = async () => {
    try {
      const title = nameEvent;
      const description = descriptionEvent;
      const { start, end, resourceId } = eventCurrent;

      // const { id, isdone, subject, description, date_from: dateFrom, date_to: dateTo } = event;

      // return {
      //   resourceId: event?.resourceId || 1,
      //   id,
      //   title: subject,
      //   start: new Date(dateFrom),
      //   end: dateTo ? new Date(dateTo) : new Date(dateFrom),
      //   color: event.color || "red",
      // };

      if (!title || !start) return;

      const startDate = new Date(start);
      const endDate = new Date(end);

      const startHour = time1.split(":")[0];
      const startMinute = time1.split(":")[1];

      const endHour = time2.split(":")[0];
      const endMinute = time2.split(":")[1];

      startDate.setHours(parseInt(startHour), parseInt(startMinute));
      endDate.setHours(parseInt(endHour), parseInt(endMinute));

      const formattedStart = startDate.toString();
      const formattedEnd = endDate.toString();

      const newEvent = {
        eventAt: `${formattedStart}*${formattedEnd}`,
        title,
        description,
        color: colorsEvents[resourceId - 1],
        resourceId,
      };

      await addEvent(newEvent);

      setOpen(false);
      setNameEvent("");
      setDescriptionEvent("");
      setSelectedValue("a");
      setEventCurrent({});
      setNewProperty(property => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedEvent = {
        eventAt: eventCurrent.start,
        title: nameEvent,
        description: descriptionEvent,
        color: colorsEvents[selectedValue],
      };

      await updateEvent(eventCurrent.id, updatedEvent);
      setOpen(false);
      setNewProperty(property => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(eventCurrent.id);
      setOpen(false);
      setNewProperty(property => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: e => setSelectedValue(e.target.value),
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <ModalWindow
      open={open}
      handleClose={() => {
        setOpen(false);
        setNameEvent("");
        setDescriptionEvent("");
        setSelectedValue("a");
        setEventCurrent({});
      }}
      btnAccept={!eventCurrent?.id && handleAccept}
    >
      <NewEvent>
        <HeadInfo>
          <h2>{eventCurrent?.id ? "Editar evento" : "Nuevo evento"}</h2>

          {resources && <span>{resources[eventCurrent.resourceId - 1]?.resourceTitle}</span>}
        </HeadInfo>

        {eventCurrent?.id ? (
          <>
            <TextField
              label="Nombre del evento"
              type="text"
              value={nameEvent}
              variant="outlined"
              onChange={e => setNameEvent(e.target.value)}
            />
            <TextField
              value={descriptionEvent}
              onChange={e => setDescriptionEvent(e.target.value)}
              variant="outlined"
              label="Descripción del evento"
              placeholder="Enter event description..."
            />
            <p>
              <strong>Event Date:</strong>{" "}
              {getDatesStartAndEnd(currentEventApi).length === 2
                ? `${moment(getDatesStartAndEnd(currentEventApi)[0]).format("MMMM Do YYYY, h:mm:ss a")} - ${moment(
                    getDatesStartAndEnd(currentEventApi)[1]
                  ).format("MMMM Do YYYY, h:mm:ss a")}`
                : moment(currentEventApi?.eventAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </>
        ) : (
          <FormCreateEvent>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />

            <TextField
              id="outlined-basic"
              label="Nombre del evento"
              variant="outlined"
              onChange={e => setNameEvent(e.target.value)}
            />
            <TextField
              value={descriptionEvent}
              label="Descripción del evento"
              onChange={e => setDescriptionEvent(e.target.value)}
            />

            <ContainerInputTime>
              <div>
                <span>fecha de inicio</span>
                <InputTime time={time1} setTime={setTime1} />
              </div>

              <div>
                <span>fecha de termino</span>
                <InputTime time={time2} setTime={setTime2} />
              </div>
            </ContainerInputTime>
          </FormCreateEvent>
        )}

        {eventCurrent?.id && (
          <>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Event
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete Event
            </Button>
          </>
        )}
      </NewEvent>
    </ModalWindow>
  );
}

export default CreatePending;
