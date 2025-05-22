import { CalendarToday } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import { pendingsSelector } from "../../redux/slices/slopesSlice";

export default function LimenkaCalendar() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const { countSlopesToday } = useSelector(pendingsSelector);

  return (
    <LimenkaCalendarStyled>
      <div
        className="calendarbutton"
        onClick={() => setIsOpenCalendar(!isOpenCalendar)}
      >
        <CalendarToday className="iconrotate" />
        <p>Calendario</p>
        <div className="badge">{countSlopesToday}</div>
      </div>

      <Calendar
        open={isOpenCalendar}
        onClickEvent={(e) => alert(`Evento: ${e.titulo}`)}
        toogle={() => setIsOpenCalendar(!isOpenCalendar)}
      />
    </LimenkaCalendarStyled>
  );
}

const LimenkaCalendarStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1000;

  .badge {
    background-color: rgb(152, 195, 210);
    color: white;
    font-weight: bold;
    padding: 4px 6px;
    border-radius: 50%;
    margin-top: 10px;
    transform: rotate(90deg);
    font-size: 12px;
  }

  .calendarbutton {
    background-color: #39b8df;
    color: white;
    padding: 34px 2px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;

    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgb(16, 173, 221);
    }

    p {
      margin-top: 20px;
    }

    .iconrotate {
      transform: rotate(180deg);
    }
  }
`;
