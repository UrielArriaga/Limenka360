import { Box, Button, CircularProgress, Dialog, Grid } from "@material-ui/core";
import { AccountBox, AttachMoney, Note } from "@material-ui/icons";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../../context/socketContext";
import { createNewTracking } from "../../../../redux/slices/trackingSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../../../services/api";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { DialogCompleteApproved } from "./styles";

export default function ApprovedOrder({
  setLoaderCompleteApproved,
  ordersApproved,
  close,
  open,
  loaderCompleteApproved,
  toggleApprovedModal,
  refetch,
}) {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const { socket, online } = useContext(SocketContext);

  const approveOrder = async () => {
    setLoaderCompleteApproved(true);
    try {
      let bodyNewTrackingChange = {
        prospectId: ordersApproved?.data?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: ordersApproved?.data?.oportunityId,
        orderId: ordersApproved?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${ordersApproved?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let data = {
        orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
      };
      let responseApproved = await api.put(`orders/${ordersApproved?.id}`, data);
      if (responseApproved.status === 200) {
        handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
        toggleApprovedModal();
        setLoaderCompleteApproved(false);
        sendNotifyOrder(ordersApproved);
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
      refetch();
    } catch (error) {
      handleGlobalAlert("error", "Pedido - ocurrio un error al marcar como aprobado", "basic", dispatch, 6000);
      setLoaderCompleteApproved(false);
    }
  };

  const sendNotifyOrder = item => {
    socket?.emit("send_notify_individual_order", {
      to: item?.oportunity?.soldbyId,
      orderId: item?.id,
      type: "approve",
    });

    socket?.emit("newnotification", {
      orderId: item?.id,
      notificationtype: "pedidonuevo",
      message: "Pedido Nuevo aprobado por administraciòn",
    });
  };
  return (
    <Dialog onClose={close} open={open}>
      <DialogCompleteApproved>
        <div className="title">
          <p>¿Estás Seguro de esto?</p>
          {loaderCompleteApproved && <CircularProgress className="title__loader" />}
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
                <div className="row">
                  <p className="content">El pedido {ordersApproved?.data?.folio} se marcara como aprobado.</p>
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <p className="content">Datos de pedido:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AccountBox />
                  <p className="label">Nombre Ejecutivo</p>
                </div>

                <p className="content">{toUpperCaseChart(ordersApproved?.data?.oportunity?.soldby?.fullname)} </p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio Pedido</p>
                </div>
                <p className="content"> {ordersApproved?.data?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Monto Total</p>
                </div>
                <p className="content"> {ordersApproved?.data?.oportunity?.amount} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Comisión Total</p>
                </div>
                <p className="content"> {formatNumber(ordersApproved?.data?.oportunity?.comission)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Factura</p>
                </div>
                <p className="content">{ordersApproved?.data?.billing ? "Facturado" : "No Factura"}</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Estado de la orden</p>
                </div>
                <p className="content">{ordersApproved?.data?.orderstatus?.name}</p>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Observaciones</p>
                </div>
                <p className="content"> {ordersApproved?.data?.observations} </p>
              </div>
            </Grid>
          </Grid>

          <div className="buttons">
            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__cancel ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__acept ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={approveOrder}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogCompleteApproved>
    </Dialog>
  );
}
