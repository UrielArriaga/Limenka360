import { CircularProgress } from "@material-ui/core";
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
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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
import { colors } from "../../styles/global.styles";
import { isEmpty } from "../../utils";
import { Howl, Howler } from "howler";
import Notification from "./notification";
// import { BroadcastChannel } from "broadcast-channel";

// const channel = new BroadcastChannel("closealerts");
export default function AlertPendings() {
  const {
    slopesresults,
    totalSlopes,
    isFetchingSlopes,
    isErrorSlopes,
    isSuccesSlopes,
    reloadFething,
    messageError,
    slopeSelected,
    // ! Others
    slopesTodayResults,
    countSlopesToday,
    isSuccesSlopesToday,
    isFetchingSlopesToday,
    isErrorSlopesToday,
    reloadFethingToday,
    messageErrorToday,
  } = useSelector(slopesSelector);
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [pendingSelect, setPendingSelect] = useState();
  const [messageTracking, setMessageTracking] = useState("");

  // * 1 loading 2 isSucces 3 isError
  const [statusUpdate, setStatusUpdate] = useState(0);
  const [reverseAnimation, setReverseAnimation] = useState(false);

  const [isUpdating, seIsUpdating] = useState(false);

  const [isSuccesUpdate, setIsSuccesUpdate] = useState(false);

  const [isErrorUpdate, setIsErrorUpdate] = useState(false);

  const [pendingsParallel, setPendingsParallel] = useState([]);

  const [milisecondsInterval, setMilisecondsInterval] = useState(1000);

  const [firstLap, setFirstLap] = useState();

  const [theme, setTheme] = useState(true);

  const audioClip = {
    sound: "https://notificationsounds.com/storage/sounds/file-sounds-1109-slow-spring-board-longer-tail.ogg",
    label: "notification",
  };
  const soundPlay = src => {
    const sound = new Howl({
      src: src,
      html5: true,
    });
    sound.play();
  };

  // useEffect(() => {
  //   channel.onmessage = (msg) => {
  //     console.log(msg);
  //     if (msg === "closeall") {
  //       closeAlert();
  //     }
  //   };
  // }, [channel]);

  useEffect(() => {
    /* console.log(countSlopesToday);
    console.log(slopesTodayResults); */
    setFirstLap(false);
    setMilisecondsInterval(1000);
  }, [countSlopesToday, isFetchingSlopes]);

  useEffect(() => {
    const interval = setInterval(() => {
      let time = new dayjs();
      let currenTime = dayjs(time).format("DD/MM/YYYY h:mm:ss");
      let seconds = currenTime.split(":")[2];
      if (milisecondsInterval !== 60000 && firstLap) {
        setMilisecondsInterval(60000);
        setFirstLap(false);
        // console.log("intervalo 1 min");
      }
      if (milisecondsInterval !== 60000 && !firstLap) {
        setMilisecondsInterval(Math.abs(seconds * 1000 - 60000));
        clearInterval(interval);
        setFirstLap(true);
      }
      if (milisecondsInterval == 60000) {
        // console.log("sin cambios en el intervalo:", currenTime);
      }
      let arrayPendings = [];
      for (let i = 0; i < slopesTodayResults?.length; i++) {
        const element = slopesTodayResults[i];
        if (dayjs(time).format("DD/MM/YYYY h:mm") === dayjs(element.date_from).format("DD/MM/YYYY h:mm")) {
          console.log("Es igualll");
          //setPendingSelect(element);
          arrayPendings.push(element);
          //dispatch(setSlopeSelected(element));
          showAlertFunction();
          soundPlay(audioClip.sound);
        }
        console.log(currenTime, dayjs(element.date_from).format("DD/MM/YYYY h:mm"));
      }
      if (arrayPendings.length != 0) {
        setPendingsParallel(arrayPendings);
      }
    }, milisecondsInterval);

    return () => clearInterval(interval);
  }, [slopesTodayResults, milisecondsInterval]);

  useEffect(() => {
    requestPendings();
  }, [id_user, reloadFethingToday]);

  function formatDate(date) {
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), "00");
    return date.toISOString();
  }

  const requestPendings = () => {
    if (id_user == null || id_user === undefined) return;

    let query = {
      ejecutiveId: id_user,
      isdone: false,
      date_from: {
        gte: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())),
        lte: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)),
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
  };
  const showAlertFunction = () => {
    setShowAlert(true);
  };

  /* const fakeAlert = () => {
    setShowAlert(false);

    setTimeout(() => {
      setShowAlert(true);
    }, 1000);
    // setPendingSelect({});

    // dispatch(cleanSlopeSelected());
  }; */

  /* const getColorBar = () => {
    // if (isEmpty(pendinse)) return;

    let color = "#f44336";
    switch (slopeSelected?.status || 0) {
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
  }; */

  /* const returnDesignType = (item) => {
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
  }; */

  // * 1 loading 2 isSucces 3 isError
  /* const renderButton = (element) => {
    switch (statusUpdate) {
      case 1:
        return (
          <div className="btn_complete_loader">
            <CircularProgress className="loader" style={{ height: 20, width: 20 }} />
          </div>
        );

      case 2:
        return (
          <button className="btn_complete succes" onClick={() => checkCurrentSlope()}>
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

      default:
        return (
          <button className="btn_complete" onClick={() => checkCurrentSlope(element)}>
            <Check />
            Marcar Como completado
          </button>
        );
    }
  };
 */
  /* const handleClickGoToProspect = (element) => {
    let prospect = element?.prospect;
    if (prospect.isoportunity === true && prospect.isclient === true) {
      router.push({ pathname: "/ventas/[prospecto]", query: { prospecto: prospect.id } });
    } else if (prospect.isoportunity === true && prospect.isclient === false) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    } else {
      router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: prospect.id } });
    }
  };

  const checkCurrentSlope = async (element) => {
    console.log(element);
    setStatusUpdate(1);
    try {
      let responseUpdate = await api.put(`pendings/${element.id}`, { isdone: true });

      console.log(responseUpdate);
      if (responseUpdate.status === 200) {
        setStatusUpdate(2);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
        createAutomaticTracking(messageTracking);
        // channel.postMessage("closeall");
      }
    } catch (error) {
      console.log(error);
      setStatusUpdate(3);
    }
  }; */

  /* const createAutomaticTracking = async (message) => {
    try {
      let data = {};
      data.prospectId = message.pending.prospectId;
      data.observations = message.message;
      data.actionId = ACTIONIDPRODUCTIONMODE;
      data.status = message.pending.prospect.status;
      data.reason = "Seguimiento automático";
      data.phaseId = message.pending.prospect.phaseId;
      data.createdbyId = id_user;
      if (message.pending.status >= 2) {
        data.oportunityId = message.pending.oportunityId;
      }

      let responseTracking = await api.post(`trackings`, data);

      console.log(responseTracking);
    } catch (error) {
      console.log(error, error?.response);
    }
  };
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
  }; */

  if (showAlert == false) return null;

  return (
    <Container>
      {pendingsParallel?.map((element, index) => (
        <Notification key={index} element={element} theme={theme} />
      ))}
      {/* 
      <motion.div
        key={index}
        className="alert"
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
                alert("asdasdas");
                // fakeAlert();
                dispatch(setSlopeSelected(element));
                // requestPendings();
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
            <input type="text" placeholder="Comentario para seguimiento" onChange={(e) => setMessageTracking({message:e.target.value, pending: element})} />
          </div>

          <p>Hora: {dayjs(element?.date_from).format("DD/MM/YYYY h:mm")}</p>
          <div className="contentpending__actions">
            {renderButton(element)}
            <button className="btn_showprospect" onClick={() => handleClickGoToProspect(element)}>
              Ver prospecto
            </button>
          </div>
        </div>

        <div className="bar" style={{ backgroundColor: getColorBar() }}></div>
      </motion.div> */}
    </Container>
  );
}

const Container = styled(motion.div)`
  position: absolute;
  z-index: 1000 !important ;
  top: 70px;
  right: 30px;
  border-radius: 8px;
  width: 480px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
`;
