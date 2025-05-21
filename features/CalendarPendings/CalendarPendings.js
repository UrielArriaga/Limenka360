import CalendarViewer from "./components/calendarViewer/CalendarViewer";
import Pendings from "./components/pendings/Pendings";
import { CalendarPendingsStyled } from "./styles";
import { usePendings } from "./context/contextPendings";
import Spinner from "./components/ui/Spinner";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getSlopesToday } from "../../redux/slices/slopesSlice";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import dayjs from "dayjs";
import { Modal } from "@material-ui/core";
import { useState } from "react";
import ModalEvent from "./components/ModalEvent";

function NewCalendarPendings() {
  const { isLoading, fetchEvents } = usePendings();
  const [eventSelected, setEventSelected] = useState(null);
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Calendario>
      <CalendarPendingsStyled>
        {isLoading && <Spinner />}
        <Pendings />
        <CalendarViewer
          setEventSelected={setEventSelected}
          handleOpen={handleOpen}
        />

        {/* <button
          onClick={() => {            
            let query = {
              ejecutiveId: id_user,
              isdone: false,
              date_from: {
                gte: dayjs().startOf("day").format(),
                lte: dayjs().endOf("day").format(),
              },
            };

            let params = {
              where: JSON.stringify(query),
              include: "prospect,pendingstype",
              count: 1,
              all: 1,
              order: "createdAt",
              skip: 1,
            };
            dispatch(getSlopesToday({ params }));
          }}
        >
          click me
        </button> */}

        <ModalEvent
          open={open}
          onClose={handleClose}
          eventSelected={eventSelected}
          setEventSelected={setEventSelected}
        />

        {/* <ModalEvent
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <div className="body">
            <h2>📌 {eventSelected?.subject}</h2>
            <div className="info">
              <div>
                <span className="label">Tipo:</span>{" "}
                <span className="value">
                  {eventSelected?.pendingstype?.name || "-"}
                </span>
              </div>
              <div>
                <span className="label">Descripción:</span>{" "}
                <span className="value">
                  {eventSelected?.description || "Sin descripción"}
                </span>
              </div>
              <div>
                <span className="label">Fecha:</span>{" "}
                <span className="value">
                  {dayjs(eventSelected?.date_from).format("DD/MM/YYYY hh:mm A")}
                </span>
              </div>
              <div>
                <span className="label">Prospecto:</span>{" "}
                <span className="value">
                  {eventSelected?.prospect?.fullname}
                </span>
              </div>
              <div>
                <span className="label">Email:</span>{" "}
                <span className="value">{eventSelected?.prospect?.email}</span>
              </div>
              <div>
                <span className="label">Teléfono:</span>{" "}
                <span className="value">{eventSelected?.prospect?.phone}</span>
              </div>
            </div>
            <div className="tracking-input">
              <label htmlFor="tracking">Comentario para seguimiento</label>
              <textarea id="tracking" placeholder="Escribe tu comentario..." />
            </div>

            <div className="actions">
              <button className="cancel" onClick={handleClose}>
                Cancelar
              </button>
              <button className="complete">Marcar como completado</button>
            </div>
          </div>
        </ModalEvent> */}
      </CalendarPendingsStyled>
    </Calendario>
  );
}

const Calendario = styled.div`
  /* margin-top: 120px; */
  width: 100%;

  height: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  /* padding: 10px; */
  /* max-height: calc(100vh - 200px); */
  /* overflow-y: auto; */

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #000f;
  }
`;

// const ModalEvent = styled(Modal)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: none;
//   outline: none;

//   .MuiBackdrop-root {
//     background-color: rgba(0, 0, 0, 0.1);
//   }

//   .MuiPaper-root {
//     padding: 24px;
//     outline: none;
//     border-radius: 12px;
//     border: none;
//     box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
//     background-color: #fff;
//     min-width: 400px;
//   }

//   .body {
//     width: 500px;
//     /* height: 300px; */
//     padding: 20px;
//     background-color: #fff;

//     display: flex;
//     flex-direction: column;
//     gap: 16px;
//     font-family: "Inter", sans-serif;

//     h2 {
//       margin: 0;
//     }

//     .info {
//       display: flex;
//       flex-direction: column;
//       gap: 8px;
//       font-size: 0.95rem;
//     }

//     .label {
//       font-weight: bold;
//       color: #333;
//     }

//     .value {
//       color: #555;
//     }
//     .tracking-input {
//       margin-top: 16px;
//       display: flex;
//       flex-direction: column;
//       gap: 6px;

//       label {
//         font-weight: 600;
//         font-size: 0.9rem;
//         color: #333;
//       }

//       textarea {
//         resize: none;
//         padding: 10px;
//         border-radius: 8px;
//         border: 1.5px solid #ccc;
//         font-size: 0.9rem;
//         min-height: 80px;
//         transition: all 0.2s ease;

//         &:focus {
//           outline: none;
//           border-color: #1976d2;
//         }
//       }
//     }

//     .actions {
//       margin-top: 16px;
//       display: flex;
//       justify-content: flex-end;
//       gap: 10px;

//       button {
//         padding: 8px 16px;
//         border: none;
//         border-radius: 6px;
//         font-size: 0.9rem;
//         font-weight: 600;
//         cursor: pointer;
//         transition: background 0.2s ease;
//       }

//       .cancel {
//         background-color: #e0e0e0;
//         color: #333;

//         &:hover {
//           background-color: #d5d5d5;
//         }
//       }

//       .complete {
//         background-color: #4caf50;
//         color: white;

//         &:hover {
//           background-color: #43a047;
//         }
//       }
//     }
//   }
// `;

export default NewCalendarPendings;
