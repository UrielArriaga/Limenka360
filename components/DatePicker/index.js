import React, { useState } from "react";
import styled from "styled-components";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Button,
  Dialog,
  IconButton,
} from "@material-ui/core";
import * as dayjs from "dayjs";

// import DatePicker from "../../atoms/DatePicker";
import { motion } from "framer-motion";

import { localeData } from "moment/moment";
import { useEffect } from "react";
import { ArrowBackIos, ArrowForwardIos, CalendarToday } from "@material-ui/icons";
// import { dashboardDirectorSelector } from "../../../../redux/slices/dashboardDirector";
import { useSelector } from "react-redux";
// import { colorLog, consoleColor } from "../../../../utils";
import { colors } from "../../styles/global.styles";

dayjs.extend(localeData);

export default function DatePicker({ startDate, finishDate, handleOnChangeDate, color = "#034D6F" }) {
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [typeCalendar, setTypeCalendar] = useState({
    value: "months",
    isActive: true,
  });
  /* 
   //* The days and weekends methods
   This method generates all days of the month; 
   if the first day of the month is different than Monday, 
   the method will get the difference in the month before, 
   and if the last day of the month is different than Sunday, 
   the method will get the difference in the next month.*/
  //   const { startDateGlobal, finishDateGlobal, typeCalendar } = useSelector(dashboardDirectorSelector);

  const startDateGlobal = "2021-09-01";
  const finishDateGlobal = "2021-09-30";
  //   const typeCalendar = { value: "days" };

  const [tabSelected, setTabSelected] = useState(typeCalendar);
  const [months, setMonths] = useState([]);
  const [daysOfWeeken, setDaysOfWeeken] = useState([]);
  const [days, setdays] = useState([]);

  // * State to handle add or substract months
  const [monthSelected, setMonthSelected] = useState(startDateGlobal);
  const [yearSelected, setYearSelected] = useState(startDateGlobal);

  useEffect(() => {
    setMonthSelected(startDateGlobal);
  }, [startDateGlobal]);

  useEffect(() => {
    setTabSelected(typeCalendar);
  }, [typeCalendar]);

  useEffect(() => {
    setYearSelected(startDateGlobal);
  }, [startDateGlobal]);

  useEffect(() => {
    if (tabSelected?.value === "months") {
      getMonthsDays();
    } else if (tabSelected?.value === "weekends") {
      getWeekends();
    } else if (tabSelected?.value === "days") {
      getDays();
    }
  }, [tabSelected, monthSelected, yearSelected]);

  const subsTractDate = type => {
    if (type === "month") {
      let before = dayjs(monthSelected).subtract(1, type);
      setMonthSelected(before.format(""));
    } else {
      let before = dayjs(yearSelected).subtract(1, type);
      setYearSelected(before.format(""));
    }
  };

  const addDate = type => {
    if (type === "month") {
      let next = dayjs(monthSelected).add(1, type);
      setMonthSelected(next.format(""));
    } else {
      let next = dayjs(yearSelected).add(1, type);
      setYearSelected(next.format(""));
    }
  };

  const getNextDaysOfMonth = lastDayOfCurrenMonth => {
    let nextDaysOfMonth = [];
    let totalDaysOfNextMonth = getDayAdd(lastDayOfCurrenMonth.format("dddd"));
    for (let index = 1; index <= totalDaysOfNextMonth; index++) {
      let nextMonthDay = generateObjectOfDay(lastDayOfCurrenMonth, index, true);
      nextDaysOfMonth.push(nextMonthDay);
    }
    return nextDaysOfMonth;
  };

  const getBeforeDaysOfMonth = firstDayOfMonth => {
    let befeoreDaysOfMonth = [];
    let totalDaysOfBeforeMonth = getDaysSubstrac(firstDayOfMonth.format("dddd"));
    let dayStartCountMonthBefore = dayjs(firstDayOfMonth).subtract(totalDaysOfBeforeMonth, "day");

    for (let index = 0; index < totalDaysOfBeforeMonth; index++) {
      let beforeDay = generateObjectOfDay(dayStartCountMonthBefore, index, true);
      befeoreDaysOfMonth.push(beforeDay);
    }

    return befeoreDaysOfMonth;
  };

  const generateObjectOfDay = (day, increment, overflow = false) => {
    let dateObject = {
      overflow: overflow,
      start: dayjs(day).add(increment, "day").format(""),
      name: dayjs(day).add(increment, "day").format("dddd"),
      value: dayjs(day).add(increment, "day").format("DD"),
      finish: dayjs(day)
        .add(increment + 1, "day")
        .format(""),
      isActive: false,
      isCurrentDate:
        dayjs(day).add(increment, "day").format("MM/DD/YYYY") == dayjs().format("MM/DD/YYYY") ? true : false,
    };
    return dateObject;
  };

  const getDays = () => {
    let daysOfMonth = [];

    let firstDayOfMonth = dayjs(monthSelected).startOf("month");

    let lastDayOfMonth = dayjs(monthSelected).endOf("month");

    let totalDaysOfMonth = Math.abs(firstDayOfMonth.diff(lastDayOfMonth, "day", true).toFixed(2));

    let beforeDaysOfMonth = getBeforeDaysOfMonth(firstDayOfMonth);

    for (let i = 0; i < totalDaysOfMonth; i++) {
      daysOfMonth.push(generateObjectOfDay(firstDayOfMonth, i));
    }

    let nextDaysOfMonth = getNextDaysOfMonth(lastDayOfMonth);

    let allDaysOfCalendar = [...beforeDaysOfMonth, ...daysOfMonth, ...nextDaysOfMonth];
    setdays(allDaysOfCalendar);
  };

  const getMonthsDays = () => {
    let monthsTemporal = [];
    let start = dayjs(yearSelected).startOf("y");

    for (let i = 0; i < 12; i++) {
      let valueMonth = {};
      let value = start.add(i, "month").format("");
      valueMonth.start = value;
      valueMonth.finish = dayjs(value).endOf("M").format("");
      valueMonth.name = dayjs(value).format("MMMM");
      valueMonth.isActive = false;
      monthsTemporal.push(valueMonth);
    }
    setMonths(monthsTemporal);
  };

  const getWeekends = () => {
    let daysOfMonth = [];

    let firstDayOfMonth = dayjs(monthSelected).startOf("month");

    let lastDayOfMonth = dayjs(monthSelected).endOf("month");

    let totalDaysOfMonth = Math.abs(firstDayOfMonth.diff(lastDayOfMonth, "day", true).toFixed(2));

    let beforeDaysOfMonth = getBeforeDaysOfMonth(firstDayOfMonth);

    let nextDaysOfMonth = getNextDaysOfMonth(lastDayOfMonth);

    for (let i = 0; i < totalDaysOfMonth; i++) {
      daysOfMonth.push(generateObjectOfDay(firstDayOfMonth, i));
    }
    let allDaysOfCalendar = [...beforeDaysOfMonth, ...daysOfMonth, ...nextDaysOfMonth];

    let weekends = [];
    let days = [];
    for (let i = 0; i < allDaysOfCalendar.length; i++) {
      days.push(allDaysOfCalendar[i]);
      let week = {
        days: days,
      };
      if (days.length === 7) {
        weekends.push(week);
        days = [];
      }
    }
    setDaysOfWeeken(weekends);
  };

  const getRangeValue = () => {
    switch (tabSelected?.value) {
      case "months":
        return ` ${dayjs(startDateGlobal).format("MMMM, YYYY	")}`;
      case "weekends":
        return ` ${dayjs(startDateGlobal).format("MMMM D, YYYY")} - ${dayjs(finishDateGlobal).format("MMMM D, YYYY")} `;
      case "days":
        return ` ${dayjs(startDateGlobal).format("MMMM D, YYYY	")} `;
      default:
        return ` ${dayjs(startDateGlobal).format("MMMM D, YYYY	")} - ${dayjs(startDate).format("DD/MM/YYYY")}`;
    }
  };

  const isCurrentTab = (option, compareOption, className) => {
    if (option === compareOption) {
      return className + "-selected";
    }

    return className;
  };

  const handleDates = type => setTabSelected({ ...tabSelected, value: type });

  const renderContent = () => {
    switch (tabSelected?.value) {
      case "months":
        return (
          <>
            <div className="arrows">
              <IconButton onClick={() => subsTractDate("year")}>
                <ArrowBackIos />
              </IconButton>
              <p>{dayjs(yearSelected).format("YYYY	")}</p>
              <IconButton onClick={() => addDate("year")}>
                <ArrowForwardIos />
              </IconButton>
            </div>
            <div className="months">
              {months.map((item, index) => {
                return (
                  <div
                    onClick={() => handleOnChangeDate(item, "months")}
                    className={`month ${item.isActive && "selected"}`}
                    key={item.name}
                  >
                    <p>{item.name}</p>
                    <p className="dummydays">.......................</p>
                    <p className="dummydays">.......................</p>
                    <p className="dummydays">.......................</p>
                    <p className="dummydays">.......................</p>
                  </div>
                );
              })}
            </div>
          </>
        );

      case "weekends":
        return (
          <>
            <div className="arrows">
              <IconButton onClick={() => subsTractDate("month")}>
                <ArrowBackIos />
              </IconButton>
              <p>{dayjs(monthSelected).format("MMM , YYYY	")}</p>
              <IconButton onClick={() => addDate("month")}>
                <ArrowForwardIos />
              </IconButton>
            </div>
            <div className="weekends">
              {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((item, index) => {
                return (
                  <div className="weekend" key={item}>
                    <p>{item}</p>
                  </div>
                );
              })}

              {daysOfWeeken.map((item, index) => {
                return (
                  <div key={index} className="weekend-number" onClick={() => handleOnChangeDate(item, "weekends")}>
                    {" "}
                    {item.days.map((item, index) => {
                      return (
                        <div key={index} className={`weekend-numbers ${item.isCurrentDate && "isToday"}`}>
                          <p style={{ color: item.overflow ? "#9e9e9e" : "#000" }}>{item.value}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        );

      case "days":
        return (
          <>
            <div className="arrows">
              <IconButton onClick={() => subsTractDate("month")}>
                <ArrowBackIos />
              </IconButton>
              <p>{dayjs(monthSelected).format("MMM , YYYY	")}</p>
              <IconButton onClick={() => addDate("month")}>
                <ArrowForwardIos />
              </IconButton>
            </div>

            <div className="weekends">
              {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((item, index) => {
                return (
                  <div className="weekend" key={item}>
                    <p>{item}</p>
                  </div>
                );
              })}

              {days.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`days ${item.isCurrentDate && "isToday"}`}
                    onClick={() => handleOnChangeDate(item, "days")}
                  >
                    <p style={{ color: item.overflow ? "#9e9e9e" : "#000" }}>{item.value}</p>
                  </div>
                );
              })}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ModalDateDirectorStyled color={color}>
      <div className="container_currentdate" onClick={() => setShowCustomDate(!showCustomDate)}>
        <div className="bg">
          <p className="txtdate" tabIndex={0}>
            {getRangeValue()}
          </p>
        </div>
        <div className="iconcalendarr">
          <CalendarToday />
        </div>
      </div>
      <Calendar
        tabIndex={0}
        animate={{
          visibility: showCustomDate ? "visible" : "hidden",
        }}
      >
        <div className="customdate">
          <div className="toptabs">
            <div
              onClick={() => {
                handleDates("days");
              }}
              className={`tab ${isCurrentTab("days", tabSelected?.value, "taboption")}`}
            >
              Dias
            </div>
            <div
              onClick={() => handleDates("weekends")}
              className={`tab ${isCurrentTab("weekends", tabSelected?.value, "taboption")}`}
            >
              Semanas
            </div>
            <div
              onClick={() => handleDates("months")}
              className={`tab ${isCurrentTab("months", tabSelected?.value, "taboption")}`}
            >
              Meses
            </div>
            {/* <div
              onClick={() => handleDates("range")}
              className={`tab ${isCurrentTab("range", tabSelected.value, "taboption")}`}
            >
              Rango
            </div> */}
          </div>

          <div className="content">{renderContent()}</div>
        </div>
      </Calendar>
    </ModalDateDirectorStyled>
  );
}

const getDaysSubstrac = dayDDDD => {
  switch (dayDDDD) {
    case "martes":
      return 1;
    case "miércoles":
      return 2;
    case "jueves":
      return 3;
    case "viernes":
      return 4;
    case "sábado" || "sabado" || "saturday":
      return 5;
    case "domingo":
      return 6;

    default:
      return 0;
  }
};

const getDayAdd = dayDDDD => {
  switch (dayDDDD) {
    case "lunes":
      return 6;
    case "martes":
      return 5;
    case "miércoles":
      return 4;
    case "jueves":
      return 3;
    case "viernes":
      return 2;
    case "sábado":
      return 3;

    default:
      return 0;
  }
};

export const ModalDateDirectorStyled = styled.div`
  position: relative;
  cursor: pointer;
  .container_currentdate {
    color: #000;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    .bg {
      background-color: #fff;
      padding: 4px 20px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      .txtdate {
        font-size: 14px;
      }
    }
  }
  .iconcalendarr {
    padding: 4px;
    background-color: ${props => (props.color ? props.color : "#7084c7")};
    svg {
      font-size: 15px;
      color: #fff;
    }
  }
`;

export const Calendar = styled(motion.div)`
  position: absolute;
  /* will-change: transform; */
  top: 30px;
  right: 0px;
  width: 350px;
  transform: translate(-0px, 10px);
  z-index: 100;
  background-color: red;
  .customdate {
    padding: 20px;
    min-height: 350px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .customdate .toptabs {
    display: flex;
    justify-content: space-between;
    border: 1px solid #bdbdbd;
  }

  .customdate .toptabs .tab {
    width: 100%;
    padding: 4px 5px;
    color: #000;
    border-right: 1px solid #bdbdbd;

    &:hover {
      background-color: ${colors.bgDirector};
      color: #fff;
    }
  }
  .customdate .toptabs .taboption-selected {
    width: 100%;
    background-color: ${colors.bgDirector};
    padding: 4px 5px;
    color: #fff;
  }

  .content .months {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .selected {
      background-color: ${colors.bgDirector};
    }
  }

  .content .months .month {
    margin-top: 10px;
    padding: 6px 4px;
    width: 30%;

    &:hover {
      background-color: #eeeeee;
      cursor: pointer;
    }

    .dummydays {
      color: #bdbdbd;
    }
  }

  .content .weekends {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #333333;
    font-size: 13px;
  }

  .content .weekends .weekend {
    margin-top: 20px;
    padding: 6px 4px;
    width: calc(100% / 7);
    text-align: center;
  }

  .weekend-number {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    color: #333333;
    font-size: 13px;
    &:hover {
      background-color: rgba(189, 189, 189, 0.5);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      border-radius: 8px;
    }
    div {
      width: calc(100% / 7);
      margin-top: 10px;
      padding: 6px 4px;
    }
  }
  .arrows {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    p {
      font-size: 13px;
      color: #424242;
    }
    svg {
      font-size: 14px;
    }
  }
  .days {
    width: calc(100% / 7);
    padding: 6px 6px;
    text-align: center;
    margin-top: 10px;
    &:hover {
      background-color: rgba(189, 189, 189, 0.5);
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      border-radius: 8px;
    }
  }

  .isToday {
    border: 1px solid #776ceb;
    border-radius: 8px;
  }
`;
