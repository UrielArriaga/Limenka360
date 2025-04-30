import { makeStyles } from "@material-ui/core/styles";
import {
  Assignment,
  Call,
  Email,
  Schedule,
  WatchLater,
  WhatsApp,
} from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const iconsActions = {
  Whatsapp: {
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
  LLamada: {
    icon: <Call />,
    color: "#fff",
    bgColor: "#f44336", // Modificado a un tono de rojo
  },
  Email: {
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
export default function LineTime({ trackings = [], fetching }) {
  const classes = useStyles();

  const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");
  return (
    <TimeLinePrewiewStyled>
      <div className="dividerchip">
        <div className="chip">Historial Prospecto</div>
      </div>
      <div className="timeLineContainer">
        {trackings.map((item, index) => {
          return (
            <div
              className="timeLineItem"
              onClick={() => {
                console.log(item.action);
              }}
            >
              <div className="line">
                <div
                  className="circle"
                  style={{
                    backgroundColor: iconsActions[item.action.name]?.bgColor,
                    color: iconsActions[item.action.name]?.color,
                  }}
                >
                  {iconsActions[item.action.name]?.icon || null}
                  {/* <WhatsApp /> */}
                </div>
                <div className="line"></div>
              </div>
              <div className="cardcontent">
                <p className="titleaction">
                  {item?.action?.name} - {formatDate(item.createdAt)}
                </p>
                <p className="txtcard reason">{item.observations} </p>
                {/* <p className="txtcard observations">{item.observations}</p> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* <Timeline align="right">
        {trackings.map((item, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(item.createdAt).format("MMMM D, YYYY	")}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">                  
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className="cardcontent">
                  <p className="txtcard reason">
                    <span className="titlecard">Asunto</span> {item.reason}
                  </p>
                  <p className="txtcard observations">
                    <span className="titlecard">Observaciones :</span>
                    {item.observations}
                  </p>
                </div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline> */}
    </TimeLinePrewiewStyled>
  );
}

// import React from "react";

// export default function TimeLinePrewiew({ trackings }) {

//   return <div>TimeLinePrewiew</div>;
// }

const TimeLinePrewiewStyled = styled.div`
  margin-top: 30px;
  margin-left: 10px;

  .dividerchip {
    height: 4px;
    background-color: #78909c; /* Color de fondo de la línea */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .chip {
    background-color: #007bff; /* Color de fondo del chip */
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

    background-color: #fff;
    width: 100%;

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
  }
`;
