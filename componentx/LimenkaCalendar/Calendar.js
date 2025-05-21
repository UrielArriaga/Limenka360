import { Drawer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import NewCalendarPendings from "../../features/CalendarPendings/CalendarPendings";

export default function Calendar({ open, toogle }) {
  return (
    <CalendarStyled anchor="right" open={open} onClose={toogle}>
      <div className="calendarheader">
        <h2>Cronograma </h2>
        <button className="close" onClick={toogle}>
          X
        </button>
      </div>
      <div className="calendercontent">
        <NewCalendarPendings />
      </div>
    </CalendarStyled>
  );
}

const CalendarStyled = styled(Drawer)`
  width: 90% !important;
  .MuiDrawer-paper {
    width: 96% !important;
  }
  .calendarheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: #000;
    h2 {
      margin: 0;
      font-size: 1.5rem;
    }
    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      background-color: #f44336;
      color: white;
      font-size: 1.2rem;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #d32f2f;
        transform: scale(1.1);
      }
    }
  }
  .calendercontent {
    height: 100%;
  }
`;
