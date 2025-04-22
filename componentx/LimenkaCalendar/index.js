import { CalendarToday } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";

export default function LimenkaCalendar() {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  return (
    <LimenkaCalendarStyled>
      <div
        className="calendarbutton"
        onClick={() => {
          setIsOpenCalendar(!isOpenCalendar);
        }}
      >
        <CalendarToday className="iconrotate" />
        <p>Calendario</p>
      </div>

      <Calendar
        open={isOpenCalendar}
        toogle={() => {
          setIsOpenCalendar(!isOpenCalendar);
        }}
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

  .calendarbutton {
    background-color: #39b8df;
    color: white;
    padding: 10px 4px;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;

    /* Trapecio usando clip-path */
    /* clip-path: polygon(0 0, 100% 10%, 100% 90%, 0% 100%); */
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgb(16, 173, 221);
    }

    p {
      margin-top: 20px;
    }

    .iconrotate {
      transform: rotate(180deg);
      /* margin-right: 10px; */
    }
  }
`;
