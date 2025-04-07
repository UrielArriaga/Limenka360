import React  from "react";
import { Tooltip } from "@material-ui/core";
import { Assignment, MonetizationOn, NotificationsActive, PersonPinCircle, RingVolume, WatchLater } from "@material-ui/icons";
import { returnFomatTime } from "../../../utils";


export const MonthTarget = (event, handleOpen, handleOpenPayment) => {
  if(event.title == "pago"){
    return (
      <Tooltip placement="top" title={<p>{`${event?.title}`}</p>} arrow>
        <div className="target" onClick={() => handleOpenPayment(event.event)}>
          <div className="type">
            <MonetizationOn />
            <p>{event.title}</p>
          </div>
          {!event.ispaid && <div className="pending" />}
        </div>
      </Tooltip>
    );
  }
  switch (event?.event?.pendingstype?.name) {
    case "Visita":
      return (
        <Tooltip placement="top" title={<p>{`${event?.title} - ${event?.event?.description}`}</p>} arrow>
          <div className="target visit" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <PersonPinCircle />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Cita":
      return (
        <Tooltip placement="top" title={<p>{`${event?.title} - ${event?.event?.description}`}</p>} arrow>
          <div className="target date" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <WatchLater />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Llamada":
      return (
        <Tooltip placement="top" title={<p>{`${event?.title} - ${event?.event?.description}`}</p>} arrow>
          <div className="target call" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <RingVolume />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Recordatorio":
      return (
        <Tooltip placement="top" title={<p>{`${event?.title} - ${event?.event?.description}`}</p>} arrow>
          <div className="target remember" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <NotificationsActive />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Tarea":
      return (
        <Tooltip placement="top" title={<p>{`${event?.title} - ${event?.event?.description}`}</p>} arrow>
          <div className="target task" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <Assignment />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    default:
      return (
        <div className="target">
          <p>{event.title}</p>
        </div>
      );
  }
}

export const WeekTarget = ( event, handleOpen, handleOpenPayment ) => {
  if(event.title == "pago"){
    return (
      <Tooltip placement="top" title={<p>{`${event?.title}`}</p>} arrow>
        <div className="target" onClick={() => handleOpenPayment(event.event)}>
          <div className="type">
            <MonetizationOn />
            <p>{event.title}</p>
          </div>
          {!event.ispaid && <div className="pending" />}
        </div>
      </Tooltip>
    );
  }
  switch (event?.event?.pendingstype?.name) {
    case "Visita":
      return (
        <Tooltip
          placement="top"
          title={
            <>
              {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
              <p>{`${event.title} - ${event.event.description}`}</p>
            </>
          }
          arrow
        >
          <div className="target visit" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <PersonPinCircle />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Cita":
      return (
        <Tooltip
          placement="top"
          title={
            <>
              {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
              <p>{`${event.title} - ${event.event.description}`}</p>
            </>
          }
          arrow
        >
          <div className="target date" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <WatchLater />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Llamada":
      return (
        <Tooltip
          placement="top"
          title={
            <>
              {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
              <p>{`${event.title} - ${event.event.description}`}</p>
            </>
          }
          arrow
        >
          <div className="target call" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <RingVolume />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Recordatorio":
      return (
        <Tooltip
          placement="top"
          title={
            <>
              {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
              <p>{`${event.title} - ${event.event.description}`}</p>
            </>
          }
          arrow
        >
          <div className="target remember" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <NotificationsActive />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    case "Tarea":
      return (
        <Tooltip
          placement="top"
          title={
            <>
              {!event.allDay && <p className="hours">{`${returnFomatTime(event?.start)} `}</p>}
              <p>{`${event?.title} - ${event?.event?.description}`}</p>
            </>
          }
          arrow
        >
          <div className="target task" onClick={() => handleOpen(event.event)}>
            <div className="type">
              <Assignment />
              <p>{event.title}</p>
            </div>
            {!event.event.isdone && <div className="pending" />}
          </div>
        </Tooltip>
      );
    default:
      return (
        <div className="target">
          <p>{event.title}</p>
        </div>
      );
  }
};