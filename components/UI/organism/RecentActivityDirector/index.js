import { Avatar, Box, Button, Grid, IconButton, LinearProgress, Modal, Tooltip, withStyles } from "@material-ui/core";
import {
  AddCircle,
  ArrowBackIos,
  ArrowForwardIos,
  AttachMoney,
  Cached,
  CalendarToday,
  Close,
  CreditCard,
  Delete,
  Edit,
  Email,
  Help,
  LocalAtm,
  LocationOn,
  Message,
  People,
} from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SocketContext } from "../../../../context/socketContext";
import { api } from "../../../../services/api";
import LoaderSuggestions from "../../atoms/LoaderSuggestions";
import { colors } from "../../../../styles/global.styles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { dialogSelector, handleToggleActivities } from "../../../../redux/slices/dialogSlice";
import RecentActivities from "../../molecules/RecentActivities";
import { formatNumber } from "../../../../utils";
import PaymentCard from "../../molecules/PaymentCard";
import Target from "../../molecules/Target";

export default function RecentActivityDirector({ open = false, toogleOpen, noSide }) {
  const { socket } = useContext(SocketContext);
  const { openRecentActivities } = useSelector(dialogSelector);
  const dispatch = useDispatch();

  const router = useRouter();

  const [activitiesList, setActivitiesList] = useState([]);
  const [openActivity, setOpenActivity] = useState(false);

  const [entityName, setEntityName] = useState("");
  const [loadingEntity, setLoadingEntity] = useState(false);

  const [limit, setLimit] = useState(15);

  const [reload, setReload] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [payments, setPayments] = useState([]);
  const [fetchingPayments, setFetchingPayments] = useState(false);

  useEffect(() => {
    if (noSide) {
      setIsOpen(true);
    }
  }, [noSide]);

  const [currentActivity, setCurrentActivity] = useState({
    type: "",
    ejecutive: { photo: "", fullname: "", email: "" },
    data: {},
    from: "",
    createdAt: "",
    message: "",
  });

  useEffect(() => {
    getPayments();
  }, [currentActivity]);

  const handlerSocketOn = useCallback(data => {
    setActivitiesList(oldArray => [data.data, ...oldArray]);
  }, []);

  useEffect(() => {
    const getLocalStorage = () => {
      let openFromLocal = localStorage.getItem("isopen-activities-menu");
      if (openFromLocal) {
        setIsOpen(JSON.parse(openFromLocal));
      }
    };
    getLocalStorage();
  }, []);

  useEffect(() => {
    const getActivities = async () => {
      setLoadingActivities(true);
      try {
        let activies = await api.get(`activities?include=ejecutive&limit=${limit}&order=-createdAt`);
        setActivitiesList(activies.data.results);
      } catch (error) {
        console.log(error);
      }
      setLoadingActivities(false);
    };

    getActivities();
  }, [reload]);

  useEffect(() => {
    socket?.on("recivenotify_activity", data => {
      handlerSocketOn(data);
    });

    socket?.on("error_event", data => {
      console.log("ERROR EN SOCKET", data);
    });

    return () => {
      socket?.off("recivenotify_activity", data => {
        handlerSocketOn(data);
      });
    };
  }, [socket]);

  useEffect(() => {
    const getEntities = async () => {
      setLoadingEntity(true);
      if (!currentActivity?.data?.entityId) {
        setEntityName("N/A");
        setLoadingEntity(false);
        return;
      }
      try {
        let query = {};
        query.id = currentActivity?.data?.entityId;
        let entities = await api.get(`entities?where=${JSON.stringify(query)}`);
        setEntityName(entities.data?.results[0]?.name);
      } catch (error) {
        console.log(error);
        setEntityName("N/A");
      }
      setLoadingEntity(false);
    };
    getEntities();
  }, [currentActivity]);

  const renderIconType = {
    create: (
      <IconBG className="create">
        <AddCircle className="icon create" />
      </IconBG>
    ),
    update: (
      <IconBG className="update">
        <Edit className="icon update" />
      </IconBG>
    ),
    delete: (
      <IconBG className="">
        <Delete className="icon delete" />
      </IconBG>
    ),
  };

  const renderOpenCloseMenu = {
    true: <ArrowForwardIos onClick={() => dispatch(handleToggleActivities(!openRecentActivities))} className="icon" />,
    false: <ArrowBackIos onClick={() => dispatch(handleToggleActivities(!openRecentActivities))} className="icon" />,
  };

  const renderTypeText = {
    create: <p className="text">Creación</p>,
    update: <p className="text">Actualización</p>,
    delete: <p className="text">Descartado</p>,
  };

  const handleCloseActivity = () => {
    setOpenActivity(false);
  };

  const handleOpenActivity = activity => {
    setOpenActivity(true);
    setCurrentActivity(activity);
  };

  const getFormatedString = oldString => {
    if (!oldString || oldString === "" || oldString === null) {
      return "N/A";
    }
    return oldString;
  };

  const handleReload = () => {
    setReload(!reload);
  };

  const redirect = ulrMain => {
    router.push(`${ulrMain}/${currentActivity.id}`);
  };

  const renderActionButton = {
    prospects: (
      <Button variant="contained" color="primary" onClick={() => router.push(`prospectos/${currentActivity.data?.id}`)}>
        Ver prospecto completo
      </Button>
    ),
    oportunities: (
      <Button variant="contained" color="primary" onClick={() => redirect("oportunidades")}>
        Ver oportunidad completa
      </Button>
    ),
    clients: (
      <Button variant="contained" color="primary" onClick={() => redirect("clientes")}>
        Ver cliente completo
      </Button>
    ),
    payments: (
      <Button variant="contained" color="primary" onClick={() => redirect("pagos")}>
        Ver pago completo
      </Button>
    ),
  };

  const getActionButton = currentActivityFrom => {
    return renderActionButton[currentActivityFrom];
  };

  const convertPercentToNumber = toConvert => {
    if (!toConvert) return 0;
    return +toConvert?.replace("%", "");
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <BorderLinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>{`${Math.round(props.value)}%`}</Box>
      </Box>
    );
  }

  const getPayments = async () => {
    setFetchingPayments(true);
    let params = {
      where: { oportunityId: currentActivity.data.oportunityId },
      order: "date",
    };
    let res = await api.get("salespayments", { params });

    setPayments(res.data.results);
    setFetchingPayments(false);
  };

  const sumPayments = arr => {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hasOwnProperty("payment")) {
        suma += arr[i].payment;
      }
    }
    return suma;
  };

  const sumIsPaid = (arr, isPaid) => {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ispaid === isPaid && arr[i].hasOwnProperty("payment")) {
        suma += arr[i].payment;
      }
    }
    return suma;
  };

  function calculateProgressPercentage(paidAmount, unpaidAmount) {
    const totalAmount = paidAmount + unpaidAmount;
    const progressPercentage = (paidAmount / totalAmount) * 100;
    return progressPercentage ? progressPercentage : 0;
  }

  const sumQuantities = array => {
    let sum = 0;
    if (!array) return sum;
    return (sum = array.reduce((aux, obj) => aux + obj.quantity, 0));
  };

  return (
    <RecentActivityStyled open={open} onClose={toogleOpen} anchor="right" isOpen={openRecentActivities} noSide={noSide}>
      <div className="head">
        {!noSide && <div className="head-actions">{renderOpenCloseMenu[openRecentActivities]}</div>}
        {isOpen && (
          <p className="txt_title">
            Actividad Reciente
            <Tooltip title="Recargar lista de actividades">
              <Cached onClick={handleReload} className="icon" />
            </Tooltip>
          </p>
        )}
      </div>

      {loadingActivities ? (
        <LoaderSuggestions className="loader" />
      ) : (
        <div>
          {activitiesList.length === 0 ? (
            <div>Sin elementos</div>
          ) : (
            <RecentActivities activitiesList={activitiesList} showInfo={true} handleOpenActivity={handleOpenActivity} />
          )}
        </div>
      )}

      <ModalActivity open={openActivity} onClose={handleCloseActivity} disableRestoreFocus={true}>
        <div className="modal">
          <div className={`estructure modal-header type-${currentActivity?.type}`}>
            <div className="modal-header__title">
              {renderIconType[currentActivity?.type]}
              {renderTypeText[currentActivity?.type] || <p className="text">Otro</p>}
            </div>
            <Tooltip title="Cerrar actividad">
              <IconButton onClick={handleCloseActivity}>
                <Close />
              </IconButton>
            </Tooltip>
          </div>

          <div className="estructure modal-body">
            <p className="title">Información ejecutivo</p>

            <div className="executive">
              <Avatar src={currentActivity?.ejecutive?.photo ? currentActivity?.ejecutive?.photo : ""} />
              <div>
                <p className="text">
                  <b>Nombre: </b>
                  {getFormatedString(currentActivity?.ejecutive?.fullname)}
                </p>
                <p className="text">
                  <b>Email: </b>
                  {getFormatedString(currentActivity?.ejecutive?.email)}
                </p>
              </div>
            </div>

            {currentActivity?.from !== "pendings" && (
              <>
                <p className="title">Información actividad</p>

                <div className="location">
                  <Email className="icon-big" />
                  <p className="text">
                    <b>Mensaje: </b>
                    {getFormatedString(currentActivity?.message)}
                  </p>
                </div>

                <div className="location">
                  <Message className="icon-big" />
                  <p className="text">
                    <b>Observaciones: </b>
                    {getFormatedString(
                      currentActivity?.data?.observations
                        ? currentActivity?.data?.observations
                        : currentActivity?.data.xxx
                    )}
                  </p>
                </div>

                <div className="location">
                  <LocationOn className="icon-big" />
                  <p className="text">
                    <b>Lugar: </b>
                    {loadingEntity ? <LinearProgress /> : getFormatedString(entityName)}
                  </p>
                </div>

                <div className="location">
                  <Help className="icon-big" />
                  <p className="text">
                    <b>Origen: </b>
                    {currentActivity?.from}
                  </p>
                </div>
              </>
            )}

            {currentActivity?.from === "pendings" ? (
              <PendingInfo>
                <p className="title">Información del pendiente</p>
                <div className="container__body">
                  <Grid className="pending_data" container>
                    <Grid item sm={6} xs={12} className="itemGrid">
                      <p className="subtitle">Tipo de Pendiente</p>
                      <p className="title">{getFormatedString(currentActivity?.data.pendingstype?.name)}</p>
                    </Grid>

                    <Grid item sm={6} xs={12} className="itemGrid">
                      <p className="subtitle">Titulo</p>
                      <p className="title">{getFormatedString(currentActivity?.data.subject)}</p>
                    </Grid>

                    <Grid item sm={6} xs={12} className="itemGrid">
                      <p className="subtitle">Inicio</p>
                      <p className="title capitalize">
                        {dayjs(currentActivity?.data.date_from).format("DD MMMM YYYY")}
                      </p>
                    </Grid>
                    <Grid item sm={6} xs={12} className="itemGrid">
                      <p className="subtitle">Fin</p>
                      {currentActivity?.data.date_to ? (
                        <p className="title capitalize">
                          {dayjs(currentActivity?.data.date_to).format("DD MMMM YYYY")}
                        </p>
                      ) : (
                        <p className="title">Sin Fecha Limite</p>
                      )}
                    </Grid>
                    <Grid item md={12} className="itemGrid">
                      <p className="subtitle">Descripción del Pendiente</p>
                      <p className="description">{getFormatedString(currentActivity?.data.description)}</p>
                    </Grid>
                  </Grid>
                </div>
              </PendingInfo>
            ) : (
              <>
                <p className="title">Información de fase</p>
                <PhaseContainer>
                  <div className={`stepper-item ${currentActivity?.from === "prospects" ? "completed" : ""} `}>
                    <div className={`step-counter phase-${currentActivity?.from}`}>
                      <People className="step-icon" />
                    </div>
                    <div className="step-name">Prospecto</div>
                  </div>

                  <div className={`stepper-item ${currentActivity?.from === "oportunities" ? "completed" : ""} `}>
                    <div className={`step-counter phase-${currentActivity?.from}`}>
                      <AttachMoney className="step-icon" />
                    </div>
                    <div className="step-name">Cotizado</div>
                  </div>

                  <div className={`stepper-item ${currentActivity?.from === "clients" ? "completed" : ""} `}>
                    <div className={`step-counter phase-${currentActivity?.from}`}>
                      <CreditCard className="step-icon" />
                    </div>
                    <div className="step-name">Venta</div>
                  </div>

                  <div className={`stepper-item ${currentActivity?.from === "payments" ? "completed" : ""} `}>
                    <div className={`step-counter phase-${currentActivity?.from}`}>
                      <LocalAtm className="step-icon" />
                    </div>
                    <div className="step-name">Pago</div>
                  </div>
                </PhaseContainer>

                {/* Mostrar los productos */}
                {currentActivity?.from == "oportunities" && (
                  <PendingInfo>
                    <div className="container__body">
                      <Grid className="pending_data" container>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Cantidad:</p>
                          <p className="container__body-title">{sumQuantities(currentActivity?.data?.products)}</p>
                        </Grid>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Monto:</p>
                          <p className="container__body-title">{currentActivity?.data?.oportunity?.monto}</p>
                        </Grid>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Comisión:</p>
                          <p className="container__body-title">{formatNumber(currentActivity?.ejecutive?.comission)}</p>
                        </Grid>
                        <Grid item xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Certeza:</p>
                          <LinearProgressWithLabel
                            variant="determinate"
                            value={convertPercentToNumber(currentActivity?.data?.oportunity?.certeza)}
                          />
                        </Grid>
                        <Grid item xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Pagos:</p>
                          <Target products={currentActivity?.data?.products} />
                        </Grid>
                      </Grid>
                    </div>
                  </PendingInfo>
                )}

                {currentActivity?.from == "clients" && (
                  <PendingInfo>
                    <div className="container__body">
                      <Grid className="pending_data" container>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Cantidad:</p>
                          <p className="container__body-title">{sumQuantities(currentActivity?.data?.products)}</p>
                        </Grid>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Monto:</p>
                          <p className="container__body-title">{formatNumber(currentActivity?.data?.amount)}</p>
                        </Grid>
                        <Grid item sm={4} xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Comisión:</p>
                          <p className="container__body-title">{formatNumber(currentActivity?.data?.comission)}</p>
                        </Grid>

                        <Grid item xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Certeza:</p>
                          <LinearProgressWithLabel variant="determinate" value={currentActivity?.data?.certainty} />
                        </Grid>
                      </Grid>
                    </div>
                  </PendingInfo>
                )}

                {currentActivity?.from == "payments" && (
                  <PendingInfo>
                    <div className="container__body">
                      <Grid className="pending_data" container>
                        <Grid item xs={3} className="itemGrid">
                          <p className="container__body-subtitle">Pagos:</p>
                          <p className="container__body-title">
                            {fetchingPayments ? "-" : payments.length ? payments.length : 0}
                          </p>
                        </Grid>
                        <Grid item xs={3} className="itemGrid">
                          <p className="container__body-subtitle">Pagado: </p>
                          <p className="container__body-title">{formatNumber(sumIsPaid(payments, true))}</p>
                        </Grid>
                        <Grid item xs={3} className="itemGrid">
                          <p className="container__body-subtitle">Pendiente:</p>
                          <p className="container__body-title">{formatNumber(sumIsPaid(payments, false))}</p>
                        </Grid>
                        <Grid item xs={3} className="itemGrid">
                          <p className="container__body-subtitle">Total: </p>
                          <p className="container__body-title">{formatNumber(sumPayments(payments))}</p>
                        </Grid>
                        <Grid item xs={12} className="itemGrid">
                          <p className="container__body-subtitle">Avance de los pagos:</p>
                          <LinearProgressWithLabel
                            variant="determinate"
                            value={calculateProgressPercentage(sumIsPaid(payments, true), sumIsPaid(payments, false))}
                          />
                        </Grid>
                        <Grid item sm={12} xs={12} className="itemGrid">
                          <div className="container__body-target_payments">
                            <PaymentCard payment={payments} fetching={fetchingPayments} />
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </PendingInfo>
                )}
              </>
            )}
          </div>

          <div className="estructure modal-footer">
            <div className="info">
              <div>
                <CalendarToday className="icon-big" />
              </div>

              <div className="date">
                <p className="text text-main ">
                  <b>Día: </b>
                  {dayjs(currentActivity?.createdAt).format("DD/MM/YY")}
                </p>
                <p className="text text-sub">
                  <b>Hora: </b>
                  {dayjs(currentActivity?.createdAt).format("HH:mmA")}
                </p>
              </div>
            </div>
            <div>{getActionButton(currentActivity?.from)}</div>
          </div>
        </div>
      </ModalActivity>
    </RecentActivityStyled>
  );
}

export const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === "light" ? 300 : 900],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
}))(LinearProgress);

export const PendingInfo = styled.div`
  .container {
    &__header {
      background-color: #405189;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title_header {
        color: #fff;
        font-weight: 500;
        word-break: break-all;
      }
    }
    &__body {
      padding: 10px;
      .itemGrid {
        margin-bottom: 15px;
      }
      .title_body {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 8px;
        .seeMore {
          font-size: 13px;
          font-weight: 400;
          color: #405189;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
            .iconSeeUp {
              transform: translateY(-3px);
            }
            .iconSeeDown {
              transform: translateY(3px);
            }
          }
          .iconSeeUp {
            transition: 0.3s;
            margin-bottom: -10px;
            font-size: 25px;
            margin-right: -2px;
          }
          .iconSeeDown {
            transition: 0.3s;
            margin-bottom: -8px;
            font-size: 25px;
            margin-right: -2px;
          }
        }
      }
      &-target_payments {
        font-size: 0.8em;
        margin-top: 5px;
      }

      &-title {
        font-size: 0.8em;
        font-weight: 500;
      }
      &-subtitle {
        font-size: 0.8em;
        color: grey;
        word-break: break-all;
      }
      .pending_data {
      }
      .divider {
        margin: 5px 0px;
      }
      .capitalize {
        text-transform: capitalize;
      }
      .description {
        border: 1px solid #d3d3d3;
        margin-top: 5px;
        border-radius: 5px;
        padding: 5px;
        font-size: 12.5px;
        word-break: break-word;
      }
      .header_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .button_seeComplete {
        height: fit-content;
        width: fit-content;
        padding: 5px;
        border: 1px solid;
        text-transform: capitalize;
        border-radius: 6px;
        font-size: 11px;
        color: #fff;
        background-color: #405189;
      }
    }
    &__footer {
      display: flex;
      flex-direction: row-reverse;
      padding: 5px;
      align-items: center;

      .button_seeComplete {
        height: fit-content;
        width: fit-content;
        padding: 5px;
        border: 1px solid;
        text-transform: capitalize;
        border-radius: 6px;
        font-size: 11px;
        color: #fff;
        background-color: #405189;
      }
    }
  }
`;

export const ModalActivity = styled(Modal)`
  display: flex;
  justify-content: center;
  top: 0px;
  overflow: auto;

  @media (min-width: 800px) {
    align-items: center;
  }

  .modal {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    min-width: 400px;
    max-width: 600px;

    &:focus {
      outline: none;
      border: none;
    }
    overflow: auto;
    .local {
      display: flex;
      align-items: center;
    }
    .icon-big {
      font-size: 1.5em;
      color: ${colors.primaryColor};
    }
    .estructure {
      padding: 1em;
    }
    /* Modal header */
    &-header {
      font-size: 1.5em;
      display: flex;
      justify-content: space-between;
      &__title {
        display: flex;
        align-items: center;
      }
    }
    .type {
      &-create {
        background-color: #6adebb;
      }
      &-update {
        background-color: #3d85c6;
      }
      &-delete {
        background-color: #d63c5d;
      }
    }
    .title {
      border-bottom: 1px solid ${colors.primaryColor};
      margin: 1em 0;
      color: #757575;
    }

    /* Modal body */
    &-body {
      max-height: 700px;
      overflow-y: auto;
      font-size: 1.2em;
      background-color: #f4f5fa;
      .executive {
        display: flex;
        margin-bottom: 1em;
      }
      .location {
        display: flex;
        align-items: center;
      }
    }

    &-body::-webkit-scrollbar {
      width: 6px; /* Ancho de la barra de desplazamiento */
    }

    &-body::-webkit-scrollbar-track {
      background-color: #f2f2f2; /* Color de fondo de la barra de desplazamiento */
    }

    &-body::-webkit-scrollbar-thumb {
      background-color: #3f51b5; /* Color del pulgar de la barra de desplazamiento */
    }

    /* Modal footer */
    &-footer {
      display: flex;
      justify-content: space-between;
      background-color: white;
      .info {
        display: flex;
        align-items: center;
      }
    }

    /* Type of modal text */
    .text {
      margin-left: 1rem;

      &-main {
        font-size: 1.2em;
      }
      &-sub {
        font-size: 1em;
        color: #757575;
      }
    }
  }
`;

export const RecentActivityStyled = styled.div`
  width: 100%;
  background-color: #fff;
  padding: ${props => (props.noSide ? "20px" : "80px 20px")};
  overflow-y: scroll;
  height: 100%;
  /* @media (max-width: 900px) {
    width: ${props => (props.isOpen ? "calc(100% - 70px)" : "90px")};
    border-left: none;
    background-color: none;
  } */

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
    box-shadow: inset 0 0 20px #585858;
  }

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 20%;
    padding: 20px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-left: none;
      background-color: none;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
      box-shadow: inset 0 0 20px #585858;
    }
  }
  .loader {
    display: flex;
    justify-content: center;
  }

  .head {
    &-actions {
      padding: 1em 0;
      display: flex;
      justify-content: ${props => (props.isOpen ? "start" : "center")};
    }
    .txt_title {
      color: #8c8f9d;
      margin-bottom: 20px;
    }
    .input {
      margin-bottom: 1em;
    }
  }
  .icon {
    font-size: 0.9em;
    color: ${colors.primaryColorDark};
    :hover {
      cursor: pointer;
    }
  }
`;

export const PhaseContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .stepper-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    @media (max-width: 768px) {
      font-size: 12px;
    }
    :after {
      position: absolute;
      content: "";
      border-bottom: 2px solid #ccc;
      width: 100%;
      top: 20px;
      left: 50%;
      z-index: 2;
    }
    .step-counter {
      position: relative;
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ccc;
      margin-bottom: 6px;
    }

    &:first-child::before {
      content: none;
    }
    &:last-child::after {
      content: none;
    }
  }

  .step-name {
    color: #ccc;
  }

  .completed {
    font-weight: bold;
    .step-name {
      color: black;
    }
  }

  .stepper-item.completed .step-counter {
    width: 60px;
    height: 60px;
    bottom: 10px;

    .step-icon {
      font-size: 2em;
    }

    /* Phases colors */
    &.phase {
      &-prospects {
        background-color: #4bb543;
      }
      &-oportunities {
        background-color: #44cbe4;
      }
      &-clients {
        color: white;
        background-color: #6b34bc;
      }
      &-payments {
        background-color: #ffbb15;
      }
    }
  }
`;

export const IconBG = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  background-color: #eee;

  .icon {
    font-size: 1.5em;
  }

  /* Colors of icons */
  .create {
    color: #6adebb;
  }
  .update {
    color: #3d85c6;
  }
  .delete {
    color: #d63c5d;
  }
`;
