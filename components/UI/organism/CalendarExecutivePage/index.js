import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styled from "styled-components";
import RequestExecutive from "../../../../services/request_Executive";
import MonthEvent from "../../molecules/MonthEvent";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { colors } from "../../../../styles/global.styles";
export default function CalendarExecutivePage({ executive, refetchData }) {
  const apiExecutive = new RequestExecutive();
  const [viewOption, setViewOption] = useState("month");
  const [refetch, setFefetch] = useState(false);
  const localizer = momentLocalizer(moment);
  const [eventsCalendary, setEventsCalendary] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs().format(""));

  useEffect(() => {
    getPendingsByExecutive();
  }, [refetch, refetchData]);

  const getPendingsByExecutive = async () => {
    try {
      let params = {
        periodSearch: viewOption,
        executive,
        date: currentDate,
      };
      let response = await apiExecutive.getCurrentPendings(params);
      let events = apiExecutive.normalizeEvents(response.data.results);
      setEventsCalendary(events);
      console.log(normalizeDate);
    } catch (error) {}
  };

  // * Events Calendar
  const handleOnChangeView = typeEvent => {
    console.log(typeEvent);
    setViewOption(typeEvent);
    setFefetch(!refetch);
  };

  const handleOnNavigate = date => {
    setEventsCalendary([]);
    setCurrentDate(dayjs(date).format());
    setFefetch(!refetch);
  };

  return (
    <CalendarExecutivePageStyled>
      <Calendar
        events={eventsCalendary}
        onView={e => handleOnChangeView(e)}
        onNavigate={handleOnNavigate}
        localizer={localizer}
        views={["month", "week", "day"]}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        tooltipAccessor={false}
        components={{ month: { event: MonthEvent }, week: { event: MonthEvent }, day: { event: MonthEvent } }}
      />
    </CalendarExecutivePageStyled>
  );
}

let messages = {
  next: ">",
  today: "Hoy",
  previous: "<",
  month: "Mes",
  week: "Semana",
  day: "Día",
  date: "Fecha",
  time: "Horario",
  event: "Pendiente",
};

const CalendarExecutivePageStyled = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  background-color: #ffff;
  height: 50vh;
  padding: 20px;
  border-radius: 8px;

  .rbc-today {
    background-color: #eaf6ff;
    box-shadow: inset 0 0 0 3px ${colors.primaryColorDark};
  }
  .rbc-toolbar {
    margin-bottom: 10px;
    /* background-color: #ebebea; */
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
    background: #103c821f;
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
`;
