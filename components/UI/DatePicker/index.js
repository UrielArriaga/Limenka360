import { Button, Popover } from "@material-ui/core";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styled from "styled-components";
import { colors } from "../../../styles/global.styles";

export default function DatePicker({ children, anchorEl, setAnchorEl, handleRangeSelected = () => {} }) {
  // HElp me to type this

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleSelectDate = dates => setSelectionRange(dates.selection);

  const formatDateSelected = () => {
    let dates = selectionRange;
    let valuesDates = {
      startDate: dayjs(dates?.startDate).format(""),
      endDate: dayjs(dates?.endDate).format(""),
    };
    console.log(valuesDates);

    // return;

    handleRangeSelected(valuesDates);
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    });
    onClose();
    // handleSelectRange("calendario", valuesDates);
    // handleClose();
  };

  return (
    <DatePickerStyled>
      {/* <Button
        className="btn_showcalendar"
        // startIcon={<FontAwesomeIcon className="icon_calendar" icon={faCalendar} />}
        onClick={handleClick}
      >
        Seleccionar Rango
      </Button> */}

      <CalendarStyled
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="date_content">
          <DateRange
            className="date"
            locale={es}
            editableDateInputs={false}
            showDateDisplay={false}
            onChange={e => handleSelectDate(e)}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={[selectionRange]}
            endDatePlaceholder="Fin del Rango"
            rangeColors={["#246658"]}
            displayMode="dateRange"
          />
          <div className="buttons">
            <Button className="bt_apply" onClick={() => formatDateSelected()}>
              Aplicar
            </Button>
          </div>
        </div>
      </CalendarStyled>
    </DatePickerStyled>
  );
}

// const DatePickerStyled = styled(Popover)``;

const DatePickerStyled = styled.div`
  .btn_showcalendar {
    /* background-color: #c0a073; */
    background-color: #034d6f;

    color: white;
    font-weight: 600;
    padding: 4px 20px;
    border-radius: 5px;
    text-transform: none;
  }
`;

const CalendarStyled = styled(Popover)`
  position: absolute;
  margin-top: 0.5%;
  margin-left: -1%;
  .date_content {
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    .date {
      padding: 10px;
      font-size: 11px;
      .dayNumer {
        color: #000;
      }
      .rdrMonthAndYearWrapper {
        height: fit-content;
      }
      input {
        font-size: 11px;
        padding: 0px;
      }
      button {
        font-size: 11px;
        color: #000;
      }
      select {
        font-size: 11px;
      }

      span.rdrDayNumber {
        color: #000;
        font-weight: 500;
      }
      .rdrDay {
        color: #fff;
        font-weight: 500;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row-reverse;
      margin-top: -20px;
      padding: 5px;

      .bt_apply {
        text-transform: capitalize;
        color: ${colors.primaryColor};
        font-size: 13px;
      }
    }
  }
`;

{
  /* <DatePickerStyled
open={open}
onClose={onClose}
anchorEl={anchorEl}
anchorOrigin={{
  vertical: "bottom",
  horizontal: "right",
}}
transformOrigin={{
  vertical: "top",
  horizontal: "center",
}}
>
DatePikcer xadasd
</DatePickerStyled> */
}
