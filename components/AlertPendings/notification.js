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

  const closeAlert = withTime => {
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
  const getColorBar = element => {
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
  const returnDesignType = item => {
    switch (item) {
      case "Visita":
        return <PersonPinCircle className="contenido__item__header__title__icon" />;
      case "Cita":
        return <WatchLater className="contenido__item__header__title__icon" />;
      case "Recordatorio":
        return <NotificationsActive className="contenido__item__header__title__icon" />;
      case "Llamada":
        return <RingVolume className="contenido__item__header__title__icon" />;
      case "Tarea":
        return <Assignment className="contenido__item__header__title__icon" />;
      default:
        return <Check />;
    }
  };
  const renderButton = element => {
    switch (statusUpdate) {
      case 1:
        return (
          <div className="btn_complete_loader">
            <CircularProgress className="loader" style={{ height: 20, width: 20 }} />
          </div>
        );

      case 2:
        return (
          <button className="btn_complete succes" disabled onClick={() => checkCurrentSlope()}>
            <Check style={{ color: "#fff" }} />
            Pendiente actualizado
          </button>
        );

      case 3:
        return (
          <button className="btn_complete error" onClick={() => checkCurrentSlope()}>
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
          <button className="btn_complete" onClick={() => checkCurrentSlope(element)}>
            <Check />
            Marcar Como completado
          </button>
        );
    }
  };

  const handleClickGoToProspect = element => {
    let prospect = element?.prospect;
    if (prospect.isoportunity === true && prospect.isclient === true) {
      router.push({ pathname: "/ventas/[prospecto]", query: { prospecto: prospect.id } });
    } else if (prospect.isoportunity === true && prospect.isclient === false) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    } else {
      router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: prospect.id } });
    }
  };

  //Marcar como terminado
  const checkCurrentSlope = async element => {
    console.log(element);
    setStatusUpdate(1);
    try {
      let responseUpdate = await api.put(`pendings/${element.id}`, { isdone: true });

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
  const createAutomaticTracking = async pending => {
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
        initial={{ opacity: reverseAnimation ? 1 : 0, scale: 0.5, right: reverseAnimation ? 0 : -200 }}
        animate={{ opacity: reverseAnimation ? 0 : 1, scale: 1, right: reverseAnimation ? -200 : 0 }}
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
          <p className="contentpending__description">Descripcion {element?.description}</p>
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
              onChange={e => setMessageTracking(e.target.value)}
            />
          </div>

          <p>Hora: {dayjs(element?.date_from).format("DD/MM/YYYY h:mm")}</p>
          <div className="contentpending__actions">
            {renderButton(element)}
            <button className="btn_showprospect" onClick={() => handleClickGoToProspect(element)}>
              Ver prospecto
            </button>
          </div>
        </div>

        <div className="bar" style={{ backgroundColor: getColorBar(element) }}></div>
      </motion.div>
    </ContainerNotification>
  );
}

const ContainerNotification = styled(motion.div)`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
  .alert {
    .bar {
      height: 5px;
      background-color: #f44336;
    }
    position: absolute;
    bottom: 0;
    background-color: rgba(64, 123, 254, 1);
    position: relative;
    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      .icon_close {
        background-color: #f44336;
        width: 30px;
        height: 20px;
        height: 24px;
        border-radius: 4px;
      }
      svg {
        color: #fff;
      }
    }

    p {
      color: #000;
    }
  }
  .alert_dark {
    .bar {
      height: 5px;
      background-color: #f44336;
    }
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.82);
    position: relative;
    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;
      .icon_close {
        background-color: #f44336;
        width: 30px;
        height: 20px;
        height: 24px;
        border-radius: 4px;
      }
      svg {
        color: #fff;
      }
    }

    p {
      color: #000;
    }
  }

  .contentpending {
    padding: 10px;
    &__top {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      svg {
        margin-right: 10px;
        color: #fff;
      }
    }

    &__prospect {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      .flex {
        display: flex;
        align-items: center;

        svg {
          margin-right: 2px;
          color: ${colors.primaryColor};
        }
        p {
          margin-right: 10px;
          color: #fff;
        }
      }
    }
    p {
      color: #fff;
    }
    &__description {
      margin-bottom: 10px;
    }
    &__tracking {
      input {
        width: 100%;
        padding: 5px 0;
        border: none;
        border: 1.5px solid #ccc;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-size: 16px;
        min-height: 36px;
        resize: none;
        padding: 0px 5px;
        border: 1.5px solid ${colors.primaryColor};
        &:focus {
          outline: 1.5px solid ${colors.primaryColor};
          border: 1.5px solid ${colors.primaryColor};
        }
      }
    }

    &__actions {
      margin-top: 10px;
      display: flex;
      .btn_complete {
        width: 200px;
        display: flex;
        align-items: center;
        border: none;
        background-color: rgba(16, 60, 130, 1);
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        height: 30px;
        transition: all 0.2s ease-in-out;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          background-color: rgba(16, 60, 130, 0.6);
        }
      }
      .btn_close {
        width: 59px;
        display: flex;
        align-items: center;
        border: none;
        background-color: rgba(16, 60, 130, 1);
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        height: 30px;
        transition: all 0.2s ease-in-out;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          background-color: rgba(16, 60, 130, 0.6);
        }
      }

      .btn_complete_loader {
        display: flex;
        align-items: center;
        border: none;
        background-color: #3f51b5;
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        height: 30px;
        transition: all 0.2s ease-in-out;
        margin-right: 10px;
        width: 200px;
        justify-content: center;
        .MuiCircularProgress-root {
          width: 10px;
          height: 10px;
        }
        .loader {
          width: 10px;
          height: 10px;
          color: white;
        }
      }

      .succes {
        background-color: #4caf50;
      }

      .error {
        background-color: #f44336;
      }
      .btn_showprospect {
        display: flex;
        align-items: center;
        border: none;
        background-color: #103c82;
        box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        color: #fff;
        border-radius: 4px;
        padding: 2px 10px;
        height: 30px;
        transition: all 0.2s ease-in-out;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          background-color: rgba(16, 60, 130, 0.6);
        }
      }
    }
    .subject {
      font-weight: bold;
      color: #fff;
    }
  }
`;
