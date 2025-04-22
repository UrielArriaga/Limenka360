import { Dialog, Drawer } from "@material-ui/core";
import React from "react";

export default function Calendar({ open, toogle }) {
  return (
    <CalendarStyled anchor="right" open={open} onClose={toogle}>
      <div className="calendarheader">
        <h2>Calendario</h2>
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

import styled from "styled-components";
import NewCalendarPendings from "../../features/CalendarPendings/CalendarPendings";

const CalendarStyled = styled(Drawer)`
  width: 90% !important;
  .MuiDrawer-paper {
    width: 90% !important;
  }

  .calendarheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    /* background-color: rgb(4, 79, 102); */
    color: #000;

    h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .close {
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  .calendercontent {
    height: 100%;
  }
`;
