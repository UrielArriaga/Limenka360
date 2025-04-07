import { Avatar, Button, CircularProgress, Container, Fade, Grid, IconButton } from "@material-ui/core";
import { Close, ExpandLess, ExpandMore, PhoneCallback, ShoppingBasket } from "@material-ui/icons";
import Select from "react-select";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../services/api";
import { ContainerOrder } from "../NotificationOrder/styles";
import { handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { createNewTracking } from "../../redux/slices/trackingSlice";
import { useContext } from "react";
import { SocketContext } from "../../context/socketContext";
import { useEffect } from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import { getOrders, refetchOrdersNotification } from "../../redux/slices/orders";
import { colors } from "../../styles/global.styles";

export default function InformationNotificationOrders({ element }) {
  const { id_user, roleId } = useSelector(userSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const { socket, online } = useContext(SocketContext);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoaderOrder, setIsLoaderOrder] = useState(false);
  const [isShowBill, setIsShowBill] = useState(false);
  const [reverseAnimation, setReverseAnimation] = useState(false);
  const [showAll, setShowAll] = useState(false);
  //Rechazar
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const [rejectedReasons, setRejectedReasons] = useState([]);
  //Aprobar
  const [loaderCompleteAccept, setLoaderCompleteAccept] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  //Carga los datos de los select
  useEffect(() => {
    getRejectReasons();
  }, []);

  // Funcion para obtener opciones de rechazo
  const getRejectReasons = () => {
    api
      .get("orderrejected", { params: {} })
      .then(res => setRejectedReasons(res.data.results))
      .catch(err => console.log(err));
  };

  const handleClickRejectOrder = item => {
    if (item?.orderstatus?.name !== "Rechazado") {
      setActiveStep(1);
    } else {
      return handleGlobalAlert("error", "El pedido ya fue Rechazado", "basic", dispatch, 6000);
    }
  };

  const handleClickapproveOrder = item => {
    if (item?.orderstatus?.name !== "Aprobado") {
      setActiveStep(2);
    } else {
      return handleGlobalAlert("error", "El pedido ya fue Aprobado", "basic", dispatch, 6000);
    }
  };

  const handleClickOrderGoBack = () => {
    setActiveStep(0);
    setRejectedOptionSelected("");
  };

  const rejectOrder = async item => {
    if (rejectedOptionSelected === "") {
      handleGlobalAlert("error", "Selecciona una opción de rechazo", "basic", dispatch, 6000);
      return;
    }
    setLoaderCompleteRejected(true);
    try {
      let data = {
        rejectedreason: "",
        orderrejectId: rejectedOptionSelected,
        rejectbyId: id_user,
      };
      let bodyNewTrackingChange = {
        prospectId: item?.oportunity?.prospect?.id,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: item?.oportunity?.id,
        orderId: item?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${item?.folio} fue rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      let responseRejected = await api.put(`orders/reject/${item.id}`, data);
      if (responseRejected.status === 200) {
        handleGlobalAlert("success", "El pedido se marco como rechazado con exito", "basic", dispatch, 6000);
        setRejectedOptionSelected("");
        setLoaderCompleteRejected(false);
        sendNotifyOrder(item);
        setShowAlert(false);

        dispatch(refetchOrdersNotification());
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
    } catch (error) {
      console.log("errror", error);
      handleGlobalAlert("error", "Pedido - ocurrio un error al marcar como rechazado", "basic", dispatch, 6000);
      setLoaderCompleteRejected(false);
    }
  };

  const sendNotifyOrder = item => {
    socket?.emit("send_notify_individual_order", {
      to: item?.oportunity?.soldbyId,
      orderId: item?.id,
      type: "approve",
    });
  };
  const handleClickOrder = item => {
    if (roleId === "compras") {
      router.push({
        pathname: "/compras/pedidos/pedido",
        query: { pe: item.id, pr: item?.oportunity?.prospect?.id },
      });
    } else {
      router.push({
        pathname: "/administracion/pedidos/pedido",
        query: { pe: item.id, pr: item?.oportunity?.prospect?.id },
      });
    }
  };

  const approveOrder = async item => {
    setLoaderCompleteAccept(true);
    try {
      let bodyNewTrackingChange = {
        prospectId: item?.oportunity?.prospect?.id,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: item?.oportunity?.id,
        orderId: item?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${item?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let data = {
        orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
      };
      let responseApproved = await api.put(`orders/${item?.id}`, data);
      if (responseApproved.status === 200) {
        handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
        setLoaderCompleteAccept(false);
        sendNotifyOrderApprobed(item);
        setShowAlert(false);
        dispatch(refetchOrdersNotification());
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
    } catch (error) {
      console.log("errpr", error);
      handleGlobalAlert("error", "Pedido - ocurrio un error al marcar como aprobado", "basic", dispatch, 6000);
      setLoaderCompleteAccept(true);
    }
  };
  const sendNotifyOrderApprobed = item => {
    socket?.emit("send_notify_individual_order", {
      to: item?.oportunity?.soldbyId,
      orderId: item?.id,
      type: "approve",
    });
  };

  const thereIsData = data => {
    if (data) {
      return <p className="info">{toUpperCaseChart(data)}</p>;
    } else {
      return <span className="info">N/A</span>;
    }
  };
  function InformationOrder() {
    return (
      <Grid container spacing={1} className="alert__content__body">
        <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
          <p className="title">Nombre del Ejecutivo</p>
          <div className="avatarEjecutive">
            {/* <Avatar className="avatarEjecutive__avatar" /> */}
            {thereIsData(element?.oportunity?.prospect?.ejecutive?.fullname)}
          </div>
        </Grid>
        <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
          <p className="title">Grupo del Ejecutivo</p>
          {thereIsData(element?.oportunity?.prospect?.ejecutive?.group?.name)}
        </Grid>
        <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
          <p className="title">Folio</p>
          {thereIsData(element?.folio)}
        </Grid>
        <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
          <p className="title">Estatus</p>
          {thereIsData(element?.orderstatus?.name)}
        </Grid>
        <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
          <p className="title">Cuenta de Pago</p>
          {thereIsData(element?.paymentaccount?.name)}
        </Grid>
        <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
          <p className="title">Datos de Envió</p>
          <p className="info">
            <span className="info__subTitle">Recibe:</span>
            {element?.receive ? element?.receive : "N/A"}
          </p>

          {showAll && (
            <>
              <p className="info">
                <span className="info__subTitle">Dirección de Envio:</span>
                {element?.address?.street ? element?.address?.street : "N/A"}, #Ext:
                {element?.address?.ext_number ? element?.address?.ext_number : "N/A"}, #Int:{" "}
                {element?.address?.city?.name ? element?.address?.city?.name : "N/A"}, Estado:{" "}
                {element?.address?.int_number ? element?.address?.int_number : "N/A"}, Municipio:{" "}
                {element?.address?.entity?.name ? element?.address?.entity?.name : "N/A"}, CP:{" "}
                {element?.address?.postal?.postal_code ? element?.address?.postal?.postal_code : "N/A"}.
              </p>
              <p className="info">
                <span className="info__subTitle">Referencias:</span>
                {element?.address?.references ? element?.address?.references : "N/A"}
              </p>
            </>
          )}

          <span className="titleBill" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                Ocultar Datos de Envio <ExpandLess className="iconShowMore" />
              </>
            ) : (
              <>
                Ver Datos de Envio <ExpandMore className="iconShowMore" />
              </>
            )}
          </span>
        </Grid>
        <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
          <p className="title">Factura</p>
          <p className="info">{element?.billing ? "Facturado" : "Sin Factura"}</p>
          {element?.billing && (
            <>
              {isShowBill && (
                <Fade in={isShowBill}>
                  <Grid container spacing={1}>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">Razón Social</p>
                      {thereIsData(element?.bill?.businessname)}
                    </Grid>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">RFC</p>
                      {thereIsData(element?.bill?.rfc)}
                    </Grid>

                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">Teléfono</p>
                      {thereIsData(element.phone)}
                    </Grid>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">Forma de Pago</p>
                      {thereIsData(element?.bill?.paymentway?.name)}
                    </Grid>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">Método de Pago</p>
                      {thereIsData(element.bill?.paymentmethod?.name)}
                    </Grid>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">CFDI</p>
                      {thereIsData(element.bill?.cfdi?.name)}
                    </Grid>
                    <Grid item md={4} xs={4} sm={4}>
                      <p className="title">Regimen Fiscal</p>
                      {thereIsData(element.bill?.taxregime?.name)}
                    </Grid>
                  </Grid>
                </Fade>
              )}
              <span className="titleBill" onClick={() => setIsShowBill(!isShowBill)}>
                {isShowBill ? (
                  <>
                    Ocultar Datos de Factura <ExpandLess className="iconShowMore" />
                  </>
                ) : (
                  <>
                    Ver Datos de Factura <ExpandMore className="iconShowMore" />
                  </>
                )}
              </span>
            </>
          )}
        </Grid>
      </Grid>
    );
  }
  const closeAlert = item => {
    setShowAlert(false);
  };
  if (showAlert == false) return null;
  return (
    <ContainerNotification>
      <motion.div
        className="alert"
        initial={{ opacity: reverseAnimation ? 1 : 0, scale: 0.5, right: reverseAnimation ? 0 : -200 }}
        animate={{ opacity: reverseAnimation ? 0 : 1, scale: 1, right: reverseAnimation ? -200 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeStep === 0 && (
          <div className="alert__content">
            <div className="alert__content__header">
              <div className="icon">
                <ShoppingBasket className="icon__purchaseIcon" />
                <p className="icon__title">Nuevo Pedido {element?.folio}</p>
              </div>
              <IconButton className="button" onClick={() => closeAlert(element)}>
                <Close className="icon" />
              </IconButton>
            </div>
            <InformationOrder />
            <div className="alert__content__footer">
              <div className="button">
                {isLoaderOrder === false && (
                  <Button
                    className="button__btAll"
                    onClick={() => {
                      handleClickOrder(element);
                    }}
                  >
                    Ver Pedido
                  </Button>
                )}
              </div>

              <div className="buttonsAction">
                {isLoaderOrder ? (
                  <CircularProgress className="buttonsAction__loader" />
                ) : (
                  <>
                    <Button className={`buttonsAction__bt aproved`} onClick={() => handleClickapproveOrder(element)}>
                      Aprobar
                    </Button>
                    <Tooltip title="Rechazar Pedido">
                      <Button className={`buttonsAction__bt denied`} onClick={() => handleClickRejectOrder(element)}>
                        Rechazar
                      </Button>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="alert__content">
            <div className="alert__content__headerRejected">
              <div className="icon">
                <ShoppingBasket className="icon__purchaseIcon" />
                <p className="icon__title">Rechazar Pedido</p>
                {loaderCompleteRejected && (
                  <CircularProgress style={{ width: 22, height: 22 }} className="icon__loader" />
                )}
              </div>
              <IconButton className="button" onClick={() => closeAlert()}>
                <Close className="icon" />
              </IconButton>
            </div>
            <p className="titleOrder">El pedido {element?.folio} se marcara como rechazado.</p>
            <InformationOrder />
            <Grid item md={12} className="alert__content__body__item">
              <p className="title">Selecciona una Opción de rechazo</p>
              <Select
                maxMenuHeight={220}
                className="selectReasons"
                placeholder="Selecciona una opción"
                options={rejectedReasons}
                onChange={e => setRejectedOptionSelected(e.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
              />
            </Grid>
            <div className="alert__content__footer">
              <div className="button">
                {isLoaderOrder === false && (
                  <Button
                    className="button__btAll"
                    onClick={() => {
                      handleClickOrder(element);
                    }}
                  >
                    Ver Pedido
                  </Button>
                )}
              </div>
              <div className="buttonsAction">
                {isLoaderOrder ? (
                  <CircularProgress className="buttonsAction__loader" />
                ) : (
                  <>
                    <Button
                      disabled={loaderCompleteRejected}
                      className={`buttonsAction__bt accept ${loaderCompleteRejected && "disabled"}`}
                      onClick={() => rejectOrder(element)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      disabled={loaderCompleteRejected}
                      className={`buttonsAction__bt goBack ${loaderCompleteRejected && "disabled"}`}
                      onClick={handleClickOrderGoBack}
                    >
                      Regresar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="alert__content">
            <div className="alert__content__headerApproved">
              <div className="icon">
                <ShoppingBasket className="icon__purchaseIcon" />
                <p className="icon__title">Aprobar Pedido</p>
                {loaderCompleteAccept && (
                  <CircularProgress style={{ width: 22, height: 22 }} className="icon__loader" />
                )}
              </div>
              <IconButton className="button" onClick={() => closeAlert()}>
                <Close className="icon" />
              </IconButton>
            </div>
            <p className="titleOrder">El pedido {element?.folio} se marcara como aprobado.</p>
            <InformationOrder />

            <div className="alert__content__footer">
              <div className="button">
                {isLoaderOrder === false && (
                  <Button
                    className="button__btAll"
                    onClick={() => {
                      handleClickOrder(element);
                    }}
                  >
                    Ver Pedido
                  </Button>
                )}
              </div>
              <div className="buttonsAction">
                {isLoaderOrder ? (
                  <CircularProgress className="buttonsAction__loader" />
                ) : (
                  <>
                    <Button
                      className={`buttonsAction__bt accept ${loaderCompleteAccept && "disabled"}`}
                      onClick={() => approveOrder(element)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      className={`buttonsAction__bt goBack ${loaderCompleteAccept && "disabled"}`}
                      onClick={() => setActiveStep(0)}
                    >
                      Regresar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </ContainerNotification>
  );
}
const ContainerNotification = styled(motion.div)`
  margin: 10px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  .alert {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    position: relative;
    transition: 0.3s;
    &__close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      cursor: pointer;

      svg {
        color: #fff;
      }
    }

    p {
      color: #000;
    }
    &__content {
      .titleOrder {
        font-weight: 600;
        margin: 5px;
        font-size: 14px;
      }
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1px 2px;
        /* background-color: rgb(16, 60, 130); */
        border-radius: 3px;
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: rgb(16, 60, 130);
            font-weight: 500;
            font-size: 14px;
          }
          &__purchaseIcon {
            font-size: 16px;
            color: #fff;
            margin-right: 10px;
            width: 25px;
            height: 25px;
            padding: 5px;
            margin-right: 5px;
            background: rgb(220, 225, 246);
            color: rgb(12, 32, 59);
            border-radius: 50%;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 19px;
            font-weight: bolder;
            color: #c10d0d;
          }
        }
      }
      &__headerRejected {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 1px 2px 4px;
        border-radius: 3px;
        background-color: #c10d0d;
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: #fff;
            font-weight: 500;
            font-size: 14px;
          }
          &__purchaseIcon {
            font-size: 22px;
            color: #fff;
            margin-right: 10px;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      &__headerApproved {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 1px 2px 4px;
        border-radius: 3px;
        background-color: #409118;
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: #fff;
            font-weight: 500;
            font-size: 14px;
          }
          &__purchaseIcon {
            font-size: 22px;
            color: #fff;
            margin-right: 10px;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      &__body {
        margin: 0px;
        &__item {
          width: 100%;
          padding: 0px 0px 2px 4px;
          .title {
            font-weight: 500;
            font-size: small;
            color: rgba(64, 123, 254, 1);
          }
          .selectReasons {
            margin-bottom: 9px;
            margin-top: 7px;
          }
          .view {
            font-size: 14px;
            color: #0c203b;
            font-weight: 500;
            cursor: pointer;
            text-decoration: underline;
          }
          .avatarEjecutive {
            display: flex;
            align-items: center;
            &__avatar {
              width: 20px;
              height: 20px;
              margin-right: 5px;
              background-color: rgba(64, 123, 254, 1);
            }
          }
          .info {
            font-weight: 500;
            font-size: 13px;
            &__subTitle {
              color: grey;
              margin-right: 5px;
            }
          }
          .titleBill {
            width: fit-content;
            display: flex;
            align-items: center;
            /* margin: 10px 0px; */
            font-size: 13px;
            transition: 0.3s;
            color: grey;
            &:hover {
              cursor: pointer;
              color: rgba(64, 123, 254, 1);
              .iconShowMore {
                transform: translateY(2px);
              }
            }
            .iconShowMore {
              transition: 0.1s;
              margin-bottom: -1px;
            }
          }
          .onlyRow {
            white-space: nowrap;
          }
        }
      }
      &__footer {
        display: flex;
        justify-content: space-between;

        .button {
          &__btAll {
            font-size: 12px;
            border: 1px solid rgb(16, 60, 130);
            background-color: rgb(16, 60, 130);
            color: #fff;
            text-transform: capitalize;
            height: 27px;
            &:hover {
              color: rgb(16, 60, 130);
              background-color: #fff;
            }
          }
        }
        .buttonsAction {
          display: flex;
          flex-direction: row-reverse;
          &__bt {
            text-transform: capitalize;
            font-weight: 500;
            font-size: 12px;
          }
          .denied {
            border: 1px solid #c10d0d;
            background-color: #c10d0d;
            color: #fff;
            margin-right: 10px;
            height: 27px;
            &:hover {
              color: #c10d0d;
              background-color: #fff;
            }
          }
          .aproved {
            border: 1px solid #409118;
            background-color: #409118;
            color: #fff;
            height: 27px;
            &:hover {
              color: #409118;
              background-color: #fff;
            }
          }
          .goBack {
            border: 1px solid #103c82;
            background-color: #fff;
            color: #103c82;
            margin-right: 11px;
          }
          .accept {
            border: 1px solid #103c82;
            background-color: #103c82;
            color: #fff;
          }
          .disabled {
            background-color: rgba(0, 0, 0, 0.26);
            color: white;
            border: none;
          }
          &__loader {
            margin-top: -5px;
            margin-right: 25px;
          }
        }
      }
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

    margin-bottom: 5px;

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
        height: 27px;
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
        height: 27px;
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
