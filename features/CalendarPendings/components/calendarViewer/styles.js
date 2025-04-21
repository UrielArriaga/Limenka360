import styled from "styled-components";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar } from "react-big-calendar";

// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const DnDCalendar = withDragAndDrop(Calendar);

export const ActivitiesViewerStyled = styled.main`
  height: 100%;
  color: #000;
  background-color: #fff;
`;

export const CalendarStyled = styled(DnDCalendar)`
  /* width: "1000px"; */
  background-color: #f8f9fa;
  font-size: "Roboto";
  /* width: 100%; */
  /* border: 1px solid red; */
  /* width: 120px; */

  width: 100% !important; // O un tamaño fijo si lo prefieres
  height: 100% !important; // también útil si quieres que se expanda verticalmente
  background-color: #f8f9fa;
  font-family: "Roboto", sans-serif;

  .rbc-calendar {
    box-sizing: border-box;
  }

  .rbc-toolbar {
    /* display: flex;
    justify-content: space-between;
    padding: 10px; */
  }

  .rbc-calendar {
    width: 100% !important;
    height: 100% !important;
    box-sizing: border-box;
  }

  .rbc-time-view,
  .rbc-month-view {
    width: 100% !important;
    height: 100% !important;
  }

  .rbc-toolbar button {
    background: none;
    border: 1px solid #ddd;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 7px;
  }

  .rbc-toolbar button:hover {
    color: #fff;
    background: #922323;
  }

  .rbc-btn-group button.rbc-active {
    background-color: #c92a2a !important;
    /* color: white !important; */
    border-color: #922323 !important;
    font-weight: 700 !important;
  }

  .rbc-toolbar-label {
    font-size: 24px;
    font-weight: 700;
    color: #364fc7;
  }

  .rbc-today {
    background-color: #f8f8f8;
  }

  .rbc-day-bg {
    border-right: 1px solid #ddd;
  }

  .rbc-off-range {
    color: #ccc;
  }

  .rbc-event-label {
    display: none;
  }

  .rbc-time-view .rbc-event {
    border: none;
  }

  .rbc-time-header-cell {
    padding: 0;
    margin: 0;
  }

  .rbc-time-gutter {
    color: #495057;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    padding: 5px 0;
  }

  /* .rbc-allday-cell {
    display: none;
  } */

  .rbc-header {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    text-transform: uppercase;
    color: #212529;
    background-color: #fff;
  }

  .rbc-time-header-content > .rbc-row.rbc-row-resource {
    border-bottom: 0;
  }
`;
