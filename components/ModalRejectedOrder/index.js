import React, { useEffect, useState } from "react";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../services/api";
import { toUpperCaseChart, handleGlobalAlert, formatNumber } from "../../utils";
import { IconButton, Dialog, CircularProgress, Grid, Button, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import {
  AccountBox,
  AttachMoney,
  Create,
  DoubleArrowOutlined,
  ListOutlined,
  Note,
  TodayOutlined,
} from "@material-ui/icons";
import { createNewTracking } from "../../redux/slices/trackingSlice";
import { DialogComplete } from "./styles";
import Select from "react-select";
import { SocketContext } from "../../context/socketContext";
import { useContext } from "react";
export default function RejectedOrder({
  ordersReject,
  close,
  open,
  toggleRejectedModal,
  refetch,
  setRefetch,
  loaderCompleteRejected,
  setLoaderCompleteRejected,
}) {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  //rechazar
  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const [rejectedReasons, setRejectedReasons] = useState([]);
  const { socket, online } = useContext(SocketContext);
  //Carga los datos de los select
  useEffect(() => {
    getRejectReasons();
  }, []);
  // funcion para obtener opciones de rechazo
  const getRejectReasons = () => {
    api
      .get("orderrejected", { params: {} })
      .then(res => setRejectedReasons(res.data.results))
      .catch(err => console.log(err));
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
        prospectId: ordersReject?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: ordersReject?.oportunity?.id,
        orderId: ordersReject?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${ordersReject?.folio} fue rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      // sendNotifyOrder(ordersReject);
      // return;
      let responseRejected = await api.put(`orders/reject/${ordersReject.id}`, data);
      if (responseRejected.status === 200) {
        handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
        toggleRejectedModal();
        setRefetch(!refetch);
        setRejectedOptionSelected("");
        setLoaderCompleteRejected(false);
        sendNotifyOrder(ordersReject);
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
      type: "reject",
    });
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogComplete>
        <div className="title">
          <p>Rechazar Pedido.</p>
          {loaderCompleteRejected && <CircularProgress className="title__loader" />}
        </div>
        <div className="containerBody">
          <Grid container>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <p className="content">Datos de Pedido:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio Pedido</p>
                </div>
                <p className="content"> {ordersReject?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Monto Total</p>
                </div>
                <p className="content"> {formatNumber(ordersReject?.oportunity?.amount)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Comisión Total</p>
                </div>
                <p className="content"> {formatNumber(ordersReject?.oportunity?.comission)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Factura</p>
                </div>
                <p className="content">{ordersReject?.billing ? "Facturado" : "No Factura"}</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Estado de la orden</p>
                </div>
                <p className="content">{ordersReject?.orderstatus?.name}</p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Razon</p>
                </div>
                <Select
                  maxMenuHeight={220}
                  className="dialogContainer__item__select"
                  placeholder="Selecciona una opción"
                  options={rejectedReasons}
                  onChange={e => setRejectedOptionSelected(e.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
                />
              </div>
            </Grid>
          </Grid>

          <div className="buttons">
            <Button
              disabled={loaderCompleteRejected}
              className={`dialogContainer__buttons__cancel ${loaderCompleteRejected && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderCompleteRejected}
              className={`dialogContainer__buttons__cancel ${loaderCompleteRejected && "disabled"}`}
              color="primary"
              onClick={rejectOrder}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogComplete>
    </Dialog>
  );
}
