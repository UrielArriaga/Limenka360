import { CircularProgress, Container } from "@material-ui/core";
import {
  Assignment,
  Check,
  Close,
  EmailRounded,
  NotificationsActive,
  PersonPinCircle,
  PhoneCallback,
  RingVolume,
  Warning,
  WatchLater,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanSlopeSelected,
  getSlopesByQuery,
  getSlopesToday,
  refetchSlopes,
  refetchSlopesToday,
  setSlopeSelected,
  slopesSelector,
} from "../../redux/slices/slopesSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export default function Notification({ element, theme }) {
  const [reverseAnimation, setReverseAnimation] = useState(false);
  const { id_user } = useSelector(userSelector);
  const [showAlert, setShowAlert] = useState(true);
  const [statusUpdate, setStatusUpdate] = useState(0);
  const [messageTracking, setMessageTracking] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const closeAlert = (withTime) => {
    if (withTime) {
      setTimeout(() => {
        setShowAlert(false);
        setStatusUpdate(0);
      }, 3000);
    } else {
      setShowAlert(false);
    }

    // channel.postMessage("closeall");
  };
  const getColorBar = (element) => {
    // if (isEmpty(pendinse)) return;

    let color = "#f44336";
    switch (element?.status || 0) {
      case 0:
        //color = "#ffff00";
        break;
      case 1:
        //color = "#ff6d00";
        break;
      case 2:
      //color = "#d50000";
      default:
        color = "white";
        break;
    }

    return color;
  };
  const returnDesignType = (item) => {
    switch (item) {
      case "Visita":
        return (
          <PersonPinCircle className="contenido__item__header__title__icon" />
        );
      case "Cita":
        return <WatchLater className="contenido__item__header__title__icon" />;
      case "Recordatorio":
        return (
          <NotificationsActive className="contenido__item__header__title__icon" />
        );
      case "Llamada":
        return <RingVolume className="contenido__item__header__title__icon" />;
      case "Tarea":
        return <Assignment className="contenido__item__header__title__icon" />;
      default:
        return <Check />;
    }
  };
  const renderButton = (element) => {
    switch (statusUpdate) {
      case 1:
        return (
          <div className="btn_complete_loader">
            <CircularProgress
              className="loader"
              style={{ height: 20, width: 20 }}
            />
          </div>
        );

      case 2:
        return (
          <button
            className="btn_complete succes"
            disabled
            onClick={() => checkCurrentSlope()}
          >
            <Check style={{ color: "#fff" }} />
            Pendiente actualizado
          </button>
        );

      case 3:
        return (
          <button
            className="btn_complete error"
            onClick={() => checkCurrentSlope()}
          >
            <Warning />
            No se pudo actualizar
          </button>
        );
      case 4:
        return (
          <button className="btn_close error" onClick={() => closeAlert()}>
            Cerrar
          </button>
        );

      default:
        return (
          <button
            className="btn_complete"
            onClick={() => checkCurrentSlope(element)}
          >
            <Check />
            Marcar Como completado
          </button>
        );
    }
  };

  const handleClickGoToProspect = (element) => {
    let prospect = element?.prospect;
    if (prospect.isoportunity === true && prospect.isclient === true) {
      router.push({
        pathname: "/ventas/[prospecto]",
        query: { prospecto: prospect.id },
      });
    } else if (prospect.isoportunity === true && prospect.isclient === false) {
      router.push({
        pathname: "/oportunidades/[prospecto]",
        query: { prospecto: prospect.id },
      });
    } else {
      router.push({
        pathname: "/prospectos/[prospecto]",
        query: { prospecto: prospect.id },
      });
    }
  };

  //Marcar como terminado
  const checkCurrentSlope = async (element) => {
    console.log(element);
    setStatusUpdate(1);
    try {
      let responseUpdate = await api.put(`pendings/${element.id}`, {
        isdone: true,
      });

      console.log(responseUpdate);
      if (responseUpdate.status === 200) {
        setStatusUpdate(2);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
        createAutomaticTracking(element);
        setStatusUpdate(1);
        setTimeout(() => {
          setStatusUpdate(4);
        }, 1000);
        // channel.postMessage("closeall");
      }
    } catch (error) {
      console.log(error);
      setStatusUpdate(3);
    }
  };
  const createAutomaticTracking = async (pending) => {
    try {
      let data = {};
      data.prospectId = pending.prospectId;
      data.observations = messageTracking;
      data.actionId = ACTIONIDPRODUCTIONMODE;
      data.status = pending.prospect.status;
      data.reason = "Seguimiento automático";
      data.phaseId = pending.prospect.phaseId;
      data.createdbyId = id_user;
      if (pending.status >= 2) {
        data.oportunityId = pending.oportunityId;
      }

      let responseTracking = await api.post(`trackings`, data);

      console.log(responseTracking);
    } catch (error) {
      console.log(error, error?.response);
    }
  };

  if (showAlert == false) return null;
  return (
    <ContainerNotification>
      <motion.div
        className={theme ? "alert" : "alert_dark"}
        initial={{
          opacity: reverseAnimation ? 1 : 0,
          scale: 0.5,
          right: reverseAnimation ? 0 : -200,
        }}
        animate={{
          opacity: reverseAnimation ? 0 : 1,
          scale: 1,
          right: reverseAnimation ? -200 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="alert__close">
          <div className="icon_close">
            <Close onClick={() => closeAlert()} />
          </div>
        </div>
        <div className="contentpending">
          <div className="contentpending__top">
            {returnDesignType(element?.pendingstype?.name)}
            <p
              className="subject"
              onClick={() => {
                console.log(element);
              }}
            >
              Asunto : {element?.subject}
            </p>
          </div>
          <p className="contentpending__description">
            Descripcion {element?.description}
          </p>
          <div className="contentpending__prospect">
            <div className="name flex">
              <PersonPinCircle />
              <p>{element?.prospect?.name} </p>
            </div>

            <div className="email flex ">
              <EmailRounded />
              <p>{element?.prospect?.email}</p>
            </div>

            <div className="phone flex ">
              <PhoneCallback />
              <p>{element?.prospect?.phone}</p>
            </div>
          </div>

          <div className="contentpending__tracking">
            <input
              type="text"
              placeholder="Comentario para seguimiento"
              onChange={(e) => setMessageTracking(e.target.value)}
            />
          </div>

          <p>Hora: {dayjs(element?.date_from).format("DD/MM/YYYY h:mm")}</p>
          <div className="contentpending__actions">
            {renderButton(element)}
            <button
              className="btn_showprospect"
              onClick={() => handleClickGoToProspect(element)}
            >
              Ver prospecto
            </button>
          </div>
        </div>

        <div
          className="bar"
          style={{ backgroundColor: getColorBar(element) }}
        ></div>
      </motion.div>
    </ContainerNotification>
  );
}
const ContainerNotification = styled(motion.div)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  max-width: 380px;
  z-index: 999;

  .alert,
  .alert_dark {
    position: relative;
    border-radius: 16px;
    background-color: ${({ theme }) =>
      theme === "dark" ? "#2c2c2e" : "#ffffff"};
    color: ${({ theme }) => (theme === "dark" ? "#f5f5f5" : "#1f1f1f")};
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    padding: 1.2rem;
    overflow: hidden;
    font-family: "Inter", sans-serif;
  }

  .bar {
    height: 4px;
    width: 100%;
    background: linear-gradient(90deg, #1976d2, #4caf50);
  }

  .alert__close {
    position: absolute;
    top: 10px;
    right: 10px;
    .icon_close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #ef5350;
      cursor: pointer;
    }

    svg {
      color: white;
      font-size: 18px;
    }
  }

  .contentpending {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &__top {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .subject {
        font-size: 1rem;
        font-weight: 600;
        color: inherit;
      }
    }

    &__description {
      font-size: 0.95rem;
      color: #666;
    }

    &__prospect {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.25rem;

      .flex {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        svg {
          color: #1976d2;
        }
      }
    }

    &__tracking {
      input {
        width: 100%;
        padding: 0.6rem;
        border-radius: 8px;
        border: 1.5px solid #d1d1d1;
        background-color: ${({ theme }) =>
          theme === "dark" ? "#3a3a3a" : "#fafafa"};
        color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: #1976d2;
        }
      }
    }

    &__actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      button {
        border: none;
        border-radius: 6px;
        font-size: 0.875rem;
        padding: 0.5rem 0.8rem;
        cursor: pointer;
        color: white;
        transition: background-color 0.2s ease-in-out;

        &.btn_complete {
          background-color: #43a047;
          &:hover {
            background-color: #388e3c;
          }
        }

        &.btn_close {
          background-color: #ef5350;
          &:hover {
            background-color: #d32f2f;
          }
        }

        &.btn_showprospect {
          background-color: #1976d2;
          &:hover {
            background-color: #1565c0;
          }
        }
      }
    }
  }
`;
