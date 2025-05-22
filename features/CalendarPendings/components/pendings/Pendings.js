"use client";

import {
  ActivitiesSyled,
  BtnFilter,
  BtnEddit,
  Category,
  Color,
  Description,
  Event,
  EventDetails,
  Events,
  Header,
  Schedule,
  ScheduleTitle,
  Time,
} from "./styles";

import FilterListIcon from "@material-ui/icons/FilterList";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";

import { addDays, format } from "date-fns";
import CalendarInput from "../ui/CalendarInput";
import { getTimeRange, isDateInRange } from "../../utils/utils";
import { useState } from "react";
import { getPending } from "../../service/pendingsApi";
import Pending from "../pending/Pending";
import Filters from "./Filters";
import { usePendings } from "../../context/contextPendings";
import { useSelector } from "react-redux";
import { pendingsSelector } from "../../../../redux/slices/slopesSlice";
import { COLOR_EVENTS } from "../../config";

function Pendings() {
  const { events, date, setIsLoading, filters } = usePendings();

  const { slopesTodayResults } = useSelector(pendingsSelector);

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

  console.log(formattedEvents);

  const [pending, setPending] = useState(null);

  const formatDateCalendar = format(new Date(date), "yyyy-MM-dd");
  const formatDateMoreCalendar = format(
    addDays(new Date(date), 1),
    "yyyy-MM-dd"
  );
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const isCurrentDate = currentDate === formatDateCalendar;

  // Get events of the current day
  const curEvents = slopesTodayResults.filter((event) => {
    if (!(event.start instanceof Date) || isNaN(event.start.getTime()))
      return false;
    if (!(event.end instanceof Date) || isNaN(event.end.getTime()))
      return false;

    const eventStartDate = format(new Date(event.start), "yyyy-MM-dd");
    const eventEndDate = format(new Date(event.end), "yyyy-MM-dd");

    return isDateInRange({
      startDate: eventStartDate,
      endDate: eventEndDate,
      dateToVerify: formatDateCalendar,
    });
  });

  // Get events of de date + 1 day
  const tomorrowEvents = events.filter((event) => {
    if (!(event.start instanceof Date) || isNaN(event.start.getTime()))
      return false;
    if (!(event.end instanceof Date) || isNaN(event.end.getTime()))
      return false;

    const eventStartDate = format(
      addDays(new Date(event.start), -1),
      "yyyy-MM-dd"
    );
    const eventEndDate = format(addDays(new Date(event.end), -1), "yyyy-MM-dd");

    return isDateInRange({
      startDate: eventStartDate,
      endDate: eventEndDate,
      dateToVerify: formatDateCalendar,
    });
  });

  const handleGetPending = async (id) => {
    setIsLoading(true);
    try {
      const data = await getPending(id);
      setPending(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isOpenFilters, setIsOpenFilters] = useState(false);

  return (
    <ActivitiesSyled>
      {/* <div>
        {pending ? (
          <Pending onClose={() => setPending(null)} pending={pending} />
        ) : (
          <CalendarInput />
        )}
      </div> */}
      <div className="filters">
        <Header>
          <FilterListIcon />
          <span>Filtros</span>
        </Header>
        <div className="filter-group">
          <label>Tipo de actividad</label>
          <div className="checkboxes">
            <label>
              <input type="checkbox" />
              Prospectos
            </label>
            <label>
              <input type="checkbox" />
              Oportunidades
            </label>
            <label>
              <input type="checkbox" />
              Clientes
            </label>
          </div>
        </div>

        <div className="filter-group">
          <label>Horario</label>
          <input type="time" /> a <input type="time" />
        </div>
        <BtnFilter
          onClick={() => {
            /* lógica de aplicar filtros */
          }}
        >
          Aplicar Filtros
        </BtnFilter>
      </div>
      <Schedule>
        <ScheduleTitle>
          {isCurrentDate ? "HOY" : formatDateCalendar}
        </ScheduleTitle>
        {filters.byPerform && <Category>ACTIVIDADES PROSPECTO</Category>}
        <Events>
          {curEvents.map((ev) => {
            const hours = getTimeRange(ev.start, ev.end, ev.resourceId);

            return (
              <Event key={ev.id}>
                <Color color={ev.isdone ? "#adb5bd" : ev?.color?.color} />
                <EventDetails>
                  <Time>{hours}</Time>
                  <Description>{ev.title}</Description>
                </EventDetails>
                <BtnEddit
                  onClick={() => handleGetPending(ev.id)}
                  disabled={ev?.id === pending?.id}
                >
                  {ev.isdone ? <VisibilityIcon /> : <CreateIcon />}
                </BtnEddit>
              </Event>
            );
          })}
          {!curEvents.length && <p>No hay eventos para este día</p>}
        </Events>
      </Schedule>
      <Schedule>
        <ScheduleTitle color="#fff">
          {isCurrentDate ? "Mañana" : formatDateMoreCalendar}
        </ScheduleTitle>
        <Events>
          {tomorrowEvents.map((ev) => {
            const hours = getTimeRange(ev.start, ev.end, ev.resourceId);

            return (
              <Event key={ev.id}>
                <Color color={ev.isdone ? "#adb5bd" : ev?.color?.color} />
                <EventDetails>
                  <Time>{hours}</Time>
                  <Description>{ev.title}</Description>
                </EventDetails>
                <BtnEddit
                  onClick={() => handleGetPending(ev.id)}
                  disabled={ev?.id === pending?.id}
                >
                  {ev.isdone ? <VisibilityIcon /> : <CreateIcon />}
                </BtnEddit>
              </Event>
            );
          })}

          {!tomorrowEvents.length && <p>No hay eventos para ese día</p>}
        </Events>
      </Schedule>
    </ActivitiesSyled>
  );
}

export default Pendings;
