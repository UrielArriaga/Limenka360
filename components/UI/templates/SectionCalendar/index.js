import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { api } from "../../../../services/api";
import { Tooltip } from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";
import RequestCommon from "../../../../services/request_Common";
import ViewInfoPending from "../../../ViewPendingEjecutive";
import MonthEvent from "../../molecules/MonthEvent";
import { WeekEvent } from "../../molecules/WeekEvent";
import dayjs from "dayjs";
import Select from "react-select";
import { FormatOptionLabel, NoOptionsMessage, CustomFilter } from "../../../../redux/slices/reactSelect";
const localizer = momentLocalizer(moment);
export default function SectionCalendar(props) {
  const { groupId, ejecutive, setEjecutive, viewOption, setViewOption, date, setDate } = props;
  const commonApi = new RequestCommon();
  const [flag, setFlag] = useState(false);
  const [pendings, setPendings] = useState([]);
  const [ejecutives, setEjecutives] = useState([]);
  const [dataPendingView, setDataPendingView] = useState({});
  const [isOpenViewPending, setIsOpenViewPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCloseViewPending = () => setIsOpenViewPending(false);
  const optionDefault = {
    name: "Todos los Ejecutivos",
    lastname: "",
    id: "",
  };
  useEffect(() => {
    getEjecutives();
  }, []);

  useEffect(() => {
    if (groupId !== "" || groupId !== undefined || groupId !== null) {
      getData();
    }
  }, [groupId, flag, ejecutive, viewOption, date]);

  const getEjecutives = async () => {
    try {
      setIsLoading(true);
      let response = await commonApi.getEjecutivesByGroup(groupId);
      setEjecutives(response.data.results);
      setEjecutives(old => [optionDefault, ...old]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  const generateFilters = () => {
    let query = {};
    let inQuery = {};
    query.ejecutive = inQuery;
    query.isdone = false;
    if (ejecutive.id) {
      inQuery.id = ejecutive.id;
    } else {
      inQuery.groupId = groupId;
    }

    if (viewOption == "month") {
      query.date_from = {
        between: [
          dayjs(date).startOf("month").toISOString(),
          dayjs(date).add(1, "month").startOf("month").toISOString(),
        ],
      };
    }
    if (viewOption == "week") {
      query.date_from = {
        between: [dayjs(date).startOf("week").toISOString(), dayjs(date).add(1, "week").startOf("week").toISOString()],
      };
    }
    if (viewOption == "day") {
      query.date_from = {
        between: [dayjs(date).startOf("day").toISOString(), dayjs(date).add(1, "day").startOf("day").toISOString()],
      };
    }

    return query;
  };

  const getData = async () => {
    try {
      let params = {
        where: generateFilters(),
        order: "-date_from",
        all: 1,
        count: 1,
        include:
          "prospect,prospect.clienttype,prospect.city,prospect.entity,prospect.specialty,prospect.phase,prospect.ejecutive,oportunity,oportunity.phase,pendingstype,ejecutive,ejecutive.group",
        join: "prospect,pct,pc,pe,ps,pp,prospect.ejecutive,opo,opha,pendingstype,ejecutive,eg",
      };
      /// hola esto es una prueba jajajaj
      let response = await api.get("pendings", { params });
      let results = normalizeEvents(response.data.results);
      setPendings(results);
    } catch (error) {
      console.log(error);
    }
  };

  const normalizeEvents = results => {
    let events = [];
    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      let event = interfaceEvent(element);
      events.push(event);
    }
    return events;
  };

  const interfaceEvent = item => ({
    title: item.subject,
    start: new Date(item.date_from),
    event: item,
    end: item.date_to ? new Date(item.date_to) : new Date(item.date_from),
  });

  const handleNavigationDate = date => {
    setDate(date);
    setPendings([]);
    setFlag(!flag);
  };

  const handleSelectEjecutive = event => {
    if (event === null) {
      setEjecutive("");
    } else {
      setEjecutive(event);
    }
  };

  const handleViewPending = event => {
    setDataPendingView(event.event);
    setIsOpenViewPending(true);
  };

  return (
    <SectionCalendarLayout>
      <div className="container_calendar">
        <Calendar
          localizer={localizer}
          events={pendings}
          startAccessor="start"
          endAccessor="end"
          defaultView={viewOption}
          onNavigate={handleNavigationDate}
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
          components={{ month: { event: MonthEvent }, week: { event: WeekEvent }, day: { event: MonthEvent } }}
          onSelectEvent={handleViewPending}
        />
        <div className="filter_byExecutive">
          <p className="title_filter">Filtrar Por Ejecutivo</p>
          <Select
            options={ejecutives}
            formatOptionLabel={FormatOptionLabel}
            getOptionValue={option => option["id"]}
            value={ejecutives.filter(item => item.id === ejecutive.id)}
            onChange={handleSelectEjecutive}
            placeholder="Selecciona un Ejecutivo"
            isLoading={isLoading}
            components={{ NoOptionsMessage }}
            filterOption={CustomFilter}
            styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
          />
        </div>
      </div>
      <ViewInfoPending open={isOpenViewPending} onClose={handleCloseViewPending} pending={dataPendingView} />
    </SectionCalendarLayout>
  );
}

const SectionCalendarLayout = styled.div`
  background-color: #eeeeee;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  min-height: 380px;

  .container_calendar {
    background-color: #ffff;

    .rbc-today {
      background-color: #eaf6ff;
      box-shadow: inset 0 0 0 3px #000;
    }

    .rbc-toolbar {
      margin-bottom: 10px;
      background-color: #ebebea;
      flex-direction: row-reverse;
      button {
        transition: all 0.4s ease;
        background-color: #8b9ab2;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button.rbc-active {
        transition: all 0.3s ease;
        background: #f7bb5b;
        color: #fff;
        border-radius: 4px;
      }
      button:hover {
        background: #f9deb2;
      }
    }

    .rbc-toolbar:first-child,
    .rbc-toolbar:last-child {
      justify-content: space-between;
    }

    .rbc-toolbar > span:first-child {
      display: flex;
      button:first-child:not(:last-child) {
        border-radius: 0;
      }
      button:not(:first-child):not(:last-child) {
        order: -1;
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      button:last-child:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .rbc-toolbar .rbc-toolbar-label {
      padding: 0 10px;
      margin-top: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      color: white;
      background-color: #f7bb5b;
      order: 3;
      width: 100%;
      height: 32px;
    }
    .rbc-off-range-bg {
      /* background: #103c821f; */
    }
    .rbc-row-segment {
      padding: 0 5px;
    }

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
    .rbc-event,
    .rbc-day-slot .rbc-background-event {
      border: none;
      box-sizing: border-box;
      box-shadow: none;
      color: #000;
      margin: 0;
      padding: 0;
      background-color: transparent;
      width: 100%;
      text-align: left;
      &:focus {
        outline: none;
      }
      .target {
        position: relative;
        align-items: center;
        background: #103c82;
        border-radius: 4px;
        padding: 2px 5px;
        color: #fff;
        font-size: 12px;
        font-weight: 500;
        margin-bottom: 1.5px;
        /* width: max-content; */
        svg {
          font-size: 16px;
          margin-right: 2px;
        }
        .type {
          display: flex;
          align-items: center;
          width: max-content;
        }
        .hours {
          display: flex;
          width: max-content;
          font-size: 10px;
        }
        .pending {
          position: absolute;
          width: 9px;
          height: 9px;
          background: #b40000;
          top: 2px;
          right: 2px;
          border-radius: 50%;
        }
      }
      .visit {
        background: #03cd71;
      }
      .date {
        background: #fba92b;
      }
      .call {
        background: #9e9e9e;
      }
      .remember {
        background: #6682f2;
      }
      .task {
        background: #b247e3;
      }
      .complete {
        opacity: 0.4;
      }
    }
    .rbc-show-more {
      z-index: 4;
      font-weight: bold;
      font-size: 10px;
      height: auto;
      line-height: normal;
      color: #3174ad;
    }
    .rbc-day-slot .rbc-event-label {
      display: none;
    }
    span.rbc-toolbar-label {
      text-transform: capitalize;
    }
  }
  .filter_byExecutive {
    background-color: #ebebea;
    .title_filter {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
`;
