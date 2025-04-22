// import React from "react";
// import styled from "styled-components";
// import dayjs from "dayjs";
// import { Drawer } from "@material-ui/core";

// const horaInicio = 7;
// const horaFin = 20;
// const rowHeight = 60;

// const TYPES = [
//   "recordatorio",
//   "visita",
//   "cita",
//   "llamada",
//   "tarea",
//   "videollamada",
// ];

// const COLORS = {
//   recordatorio: "#FFCDD2",
//   visita: "#E1BEE7",
//   cita: "#BBDEFB",
//   llamada: "#FFE0B2",
//   tarea: "#C8E6C9",
// };

// export default function Calendar({ open, eventos = [], toogle, onClickEvent }) {
//   const renderEvents = (tipo) => {
//     return eventos
//       .filter((e) => e.tipo === tipo)
//       .map((evento, i) => {
//         const inicio = dayjs(evento.inicio);
//         const fin = dayjs(evento.fin);
//         const duration = fin.diff(inicio, "minute");
//         const top =
//           (inicio.hour() - horaInicio + inicio.minute() / 60) * rowHeight;

//         return (
//           <EventBox
//             key={i}
//             style={{
//               top,
//               height: `${(duration / 60) * rowHeight}px`,
//               backgroundColor: COLORS[tipo],
//               borderLeft: `4px solid ${
//                 evento.prioridad === 3
//                   ? "#D32F2F"
//                   : evento.prioridad === 2
//                   ? "#FBC02D"
//                   : "#388E3C"
//               }`,
//             }}
//             onClick={() => onClickEvent?.(evento)}
//           >
//             {evento.titulo}
//           </EventBox>
//         );
//       });
//   };

//   return (
//     <CalendarStyled open={open}>
//       <div className="calendar-wrapper">
//         <div className="header">
//           <h2>{dayjs().format("dddd D MMMM")}</h2>
//           <button onClick={toogle}>Cerrar</button>
//         </div>
//         <div className="body">
//           <div className="hour-column">
//             {Array.from({ length: horaFin - horaInicio + 1 }, (_, i) => (
//               <div key={i} className="hour">
//                 {`${horaInicio + i}:00`}
//               </div>
//             ))}
//           </div>
//           <div className="event-columns">
//             {TYPES.map((tipo) => (
//               <div key={tipo} className="event-column">
//                 <div className="column-header">{tipo.toUpperCase()}</div>
//                 <div className="column-body">
//                   {renderEvents(tipo)}
//                   <CurrentTimeLine />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </CalendarStyled>
//   );
// }

// const CalendarStyled = styled(Drawer)`
//   width: 90% !important;
//   .MuiDrawer-paper {
//     width: 90% !important;
//   }

//   .calendar-wrapper {
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//   }

//   .header {
//     padding: 10px;
//     border-bottom: 1px solid #ddd;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .body {
//     display: flex;
//     height: 100%;
//   }

//   .hour-column {
//     width: 80px;
//     background: #f5f5f5;
//     padding-top: 30px;
//     font-size: 12px;
//   }

//   .hour {
//     height: ${rowHeight}px;
//     padding: 4px;
//     border-top: 1px solid #ccc;
//   }

//   .event-columns {
//     display: flex;
//     flex: 1;
//     overflow-x: auto;
//   }

//   .event-column {
//     flex: 1;
//     border-left: 1px solid #ddd;
//     position: relative;
//   }

//   .column-header {
//     text-align: center;
//     font-weight: bold;
//     background: #fafafa;
//     padding: 8px 0;
//     border-bottom: 1px solid #ccc;
//   }

//   .column-body {
//     position: relative;
//     height: calc(100% - 40px);
//   }
// `;

// const EventBox = styled.div`
//   position: absolute;
//   left: 4px;
//   right: 4px;
//   padding: 4px;
//   font-size: 12px;
//   border-radius: 4px;
//   cursor: pointer;
//   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
// `;

// const CurrentTimeLine = () => {
//   const now = dayjs();
//   const top = (now.hour() - horaInicio + now.minute() / 60) * rowHeight;
//   return <TimeLine style={{ top }} />;
// };

// const TimeLine = styled.div`
//   position: absolute;
//   left: 0;
//   right: 0;
//   height: 2px;
//   background: limegreen;
//   z-index: 1;
// `;

import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const horaInicio = 7;
const horaFin = 20;
const TYPES = ["llamada", "videollamada"];

export default function CalendarTabla({ eventos = [] }) {
  const getEventosPorHoraYTipo = (hora, tipo) => {
    return eventos.filter((e) => {
      const inicio = dayjs(e.inicio);
      return inicio.hour() === hora && e.tipo === tipo;
    });
  };

  const horas = Array.from(
    { length: horaFin - horaInicio + 1 },
    (_, i) => horaInicio + i
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>Hora</th>
          {TYPES.map((tipo) => (
            <th key={tipo}>{tipo.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {horas.map((hora) => (
          <tr key={hora}>
            <td className="hora">{`${hora}:00`}</td>
            {TYPES.map((tipo) => (
              <td key={tipo}>
                {getEventosPorHoraYTipo(hora, tipo).map((evento, idx) => (
                  <EventItem key={idx}>{evento.titulo}</EventItem>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 90wv;
  border-collapse: collapse;
  font-size: 14px;
  background: #fff;

  th,
  td {
    border: 1px solid #ccc;
    vertical-align: top;
    padding: 8px;
    min-height: 60px;
  }

  th {
    background-color: #f5f5f5;
    text-align: center;
  }

  .hora {
    font-weight: bold;
    text-align: center;
    background: #fafafa;
    width: 80px;
    white-space: nowrap;
  }
`;

const EventItem = styled.div`
  background: #e0f7fa;
  border-left: 4px solid #00acc1;
  padding: 4px 6px;
  margin-bottom: 4px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;
