import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  AccountCircle,
  Assignment,
  Call,
  Cancel,
  CheckBox as CheckboxIcon,
  Email,
  Schedule,
  WatchLater,
  WhatsApp,
} from "@material-ui/icons";
import { Checkbox, Skeleton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import styled from "styled-components";
import { colors } from "../../../styles/global.styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

// Recordatorio
// Visita
// Cita
// Llamada
// Tarea

const iconsActions = {
  Recordatorio: {
    icon: <WhatsApp />,
    color: "#fff",
    bgColor: "#25d366",
  },
  Cita: {
    icon: <WatchLater />,
    color: "#fff",
    bgColor: "#512da8", // Modificado a un tono de púrpura más oscuro
  },
  "Seguimiento Automatico": {
    icon: <Schedule />,
    color: "#fff",
    bgColor: "#ff9800", // Modificado a un tono de naranja
  },
  Tarea: {
    icon: <Assignment />,
    color: "#fff",
    bgColor: "#1976d2", // Modificado a un tono de azul más oscuro
  },
  Llamada: {
    icon: <Call />,
    color: "#fff",
    bgColor: "#f44336", // Modificado a un tono de rojo
  },
  Visita: {
    icon: <Email />,
    color: "#fff",
    bgColor: "#6d4c41", // Modificado a un tono de rojo
  },
};

// const iconMapping = {
//   Visita: <PersonPinCircle className="icon visit" />,
//   Cita: <WatchLater className="icon date" />,
//   Llamada: <RingVolume className="icon call" />,
//   Recordatorio: <NotificationsActive className="icon remember" />,
//   Tarea: <Assignment className="icon task" />,
// };

// const icon = iconMapping[type] || null;
// return icon;
export default function LineTimePendings({ pendingsData, fetching }) {
  const { userData } = useSelector(userSelector);
  const classes = useStyles();
  const { results: pendings = [], isFetching = false, count = 1 } = pendingsData;

  const formatDate = date => dayjs(date).format("MMMM D, YYYY");

  const renderSkeleton = () => {
    return Array.from(Array(5).keys()).map(index => (
      <div key={index} className="timeLineItem">
        <div className="line">
          <div className="circle">
            <Skeleton variant="circle" width={30} height={30} />
          </div>
          <div className="line"></div>
        </div>
        <div className="cardcontent">
          <div className="titlePending">
            <Checkbox className="check" />
            <Skeleton variant="text" width={150} />
          </div>
          <div className="content">
            <div className="calendarBg">
              <div className="calendar">
                <div className="bar"></div>
                <div className="contentnumber">
                  <Skeleton variant="text" width={30} />
                  <Skeleton variant="text" width={30} />
                  <Skeleton variant="text" width={60} />
                </div>
              </div>
            </div>
            <div className="descripionsinfo">
              <div className="row">
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const validExpire = item => {
    const now = dayjs();
    const expire = dayjs(item.date_from);
    console.log(item.isdone);
    console.log(now.isAfter(expire) && item.isdone);

    if (!item.isdone && now.isAfter(expire)) {
      return false;
    }

    // return now.isAfter(expire) && item.isdone;
  };
  return (
    <TimeLinePrewiewStyled>
      <div className="dividerchip">
        <div className="chip">Actividades por realizar</div>
      </div>

      <div className="timeLineContainer">
        {isFetching && renderSkeleton()}

        {isFetching == false &&
          pendings.map((item, index) => {
            return (
              <div
                className="timeLineItem"
                onClick={() => {
                  console.log(item.pendingstype);
                }}
              >
                <div className="line">
                  <div
                    className="circle"
                    style={{
                      backgroundColor: validExpire(item) ? colors.primaryColor : "red",
                      // color: iconsActions[item.action.name]?.color,
                    }}
                  >
                    {validExpire(item) ? <CheckboxIcon /> : <Cancel />}
                    {/* <CheckboxIcon /> */}
                  </div>
                  <div className="line"></div>
                </div>
                <div className="cardcontent">
                  <div className="rowglobal">
                    <div className="titlePending">
                      <Checkbox className="check" />
                      <p className="title">{item.subject}</p>
                    </div>

                    <div className="user">
                      <Tooltip title={`Asignado a ${userData?.name}`} placement="top">
                        <AccountCircle />
                      </Tooltip>
                    </div>
                  </div>

                  <div className="content">
                    <div className="calendarBg">
                      <div className="calendar">
                        <div className="bar"></div>
                        <div className="contentnumber">
                          <p className="date">{dayjs(item.date_from).format("DD")}</p>
                          <p className="month">{dayjs(item.date_from).format("MMM")}</p>
                          <p className="dayandhour">{dayjs(item.date_from).format("dddd h:mm:ss A")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="descripionsinfo">
                      <div className="row">
                        <p className="txtdes">Fecha limite</p>

                        <div className="datelimit">
                          <p>{dayjs(item.date_from).format("DD/MM/YYYY h:mm:ss A")}</p>
                        </div>
                      </div>

                      <div className="description">
                        {/* <p className="txtdes">Descripción</p> */}
                        <p className="textdescp">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                    <Button className="btnprimary">Marcar como Completado</Button>
                  </div>
                  {/* {JSON.stringify(item?.isdone)}
                <p className="titleaction">
                  {item?.action?.name} - {formatDate(item.createdAt)}
                </p>
                <p className="txtcard reason">{item.observations} </p> */}
                </div>
              </div>
            );
          })}

        {isFetching === false && pendings.length === 0 && (
          <div className="emptyactivities">
            <p>No hay actividades pendientes</p>
          </div>
        )}
      </div>
    </TimeLinePrewiewStyled>
  );
}

const TimeLinePrewiewStyled = styled.div`
  margin-top: 30px;
  margin-left: 10px;

  .dividerchip {
    height: 4px;
    border-radius: 10px;
    background-color: #78909c; /* Color de fondo de la línea */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .chip {
    background-color: #4caf50; /* Color de fondo del chip */
    color: #fff; /* Color del texto del chip */
    padding: 5px 10px; /* Espaciado interno del chip */
    border-radius: 20px; /* Radio de borde del chip para hacerlo redondeado */
    font-size: 12px;
  }

  .timeLineContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .timeLineItem {
    display: flex;
    gap: 10px;
    position: relative;
    margin-bottom: 20px;
    /* align-items: center; */

    .line {
      width: 2px;
      height: 80%;
      background-color: #bcbcbc;
      position: absolute;
      top: 20px;
    }

    .circle {
      /* width: 12px;
      height: 12px; */
      width: 30px;
      height: 30px;
      border-radius: 50%;
      /* background-color: blue; */
      /* border: 2px solid #3f51b5; */
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #9dcf00;

      svg {
        font-size: 24px;
        color: #fff;
      }
    }
  }
  .cardcontent {
    padding: 10px;
    margin-left: 20px;
    position: relative;
    border-radius: 8px;
    /* box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px; */
    /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); */

    /* background-color: #fffeef; */
    background-color: #fffeef;
    width: 100%;

    .titlePending {
      display: flex;
      align-items: center;

      .title {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 14px;
      }
    }

    .check {
      width: 20px;
      margin-right: 10px;
    }

    .titleaction {
      font-size: 16px;
      margin-bottom: 10px;
      color: #9e9e9e;
    }

    .titlecard {
      font-weight: bold;
      font-size: 12px;
    }

    .reason {
      color: #616161;
      font-size: 14px;
      font-weight: bold;
    }

    .content {
      display: flex;
    }

    .calendarBg {
      background-color: #e5f9ff;
      padding: 8px;

      .calendar {
        border-radius: 5px;
        background-color: #fff;
        width: 60px;
        .bar {
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          height: 10px;
          background-color: ${colors.primaryColor};
        }

        .contentnumber {
          display: flex;
          flex-direction: column;
          align-items: center;

          .date {
            font-size: 14px;
            font-weight: bold;
          }
          .month {
            font-size: 12px;
          }
          .dayandhour {
            font-size: 9px;
            text-align: center;
          }
        }
      }
    }

    .descripionsinfo {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-left: 10px;
      width: 100%;
      .row {
        display: flex;
        gap: 10px;
        align-items: center;
        .txtdes {
          /* font-weight: bold; */
          font-size: 14px;
        }
        .datelimit {
          background-color: #fef3b8;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
          p {
            margin: 0;
            color: #616161;
          }
        }
      }
    }
  }

  .emptyactivities {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    /* background-color: #f5f5f5; */
    border-radius: 10px;
    color: #616161;
  }

  .description {
    border: 1px solid #9e9e9e;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    .textdescp {
      font-weight: bold;
      font-size: 12px;
      color: #616161;
    }
  }

  .actions {
    margin-top: 20px;
    .btnprimary {
      background-color: ${colors.primaryColor};
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      font-size: 10px;
    }
  }

  // * COMMON
  .rowglobal {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
  }
`;
