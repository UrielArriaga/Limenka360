import React, { useContext, useEffect, useState } from "react";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../services/api";
import { toUpperCaseChart, handleGlobalAlert, formatNumber } from "../../utils";
import { Dialog, CircularProgress, Grid, Button, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { AccountBox, AttachMoney, Note } from "@material-ui/icons";
import { createNewTracking } from "../../redux/slices/trackingSlice";
import { DialogCompleteApproved } from "./styles";
export default function RemoveVerifyOrder({ ordersVerify, close, open, toggleVerify, refetch, setRefetch }) {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const removeVerifiedOrder = async () => {
    setLoaderComplete(true);
    try {
      let bodyNewTrackingChange = {
        prospectId: ordersVerify?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: ordersVerify?.oportunity?.id,
        orderId: ordersVerify?.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${ordersVerify?.folio} fue removido de verificados.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let data = {
        isverified: false,
      };

      let responseApproved = await api.put(`orders/${ordersVerify?.id}`, data);
      if (responseApproved.status === 200) {
        handleGlobalAlert("success", "El Pedido fue Removido de verificados - Correctamente", "basic", dispatch, 6000);
        toggleVerify();
        setLoaderComplete(false);
        setRefetch(!refetch);
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Pedido - ocurrio un error al verificar el pedido", "basic", dispatch, 6000);
      setLoaderComplete(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogCompleteApproved>
        <div className="title">
          <p>¿Estás Seguro de esto?</p>
          {loaderComplete && <CircularProgress className="title__loader" />}
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
                  <p className="content">El pedido {ordersVerify?.folio} se removera de verificados.</p>
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

                <p className="content">{toUpperCaseChart(ordersVerify?.oportunity?.soldby?.fullname)} </p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio Pedido</p>
                </div>
                <p className="content"> {ordersVerify?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Monto Total</p>
                </div>
                <p className="content"> {ordersVerify?.oportunity?.amount} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Comisión Total</p>
                </div>
                <p className="content"> {formatNumber(ordersVerify?.oportunity?.comission)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Factura</p>
                </div>
                <p className="content">{ordersVerify?.data?.billing ? "Facturado" : "Sin Factura"}</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Estado de la orden</p>
                </div>
                <p className="content">{ordersVerify?.orderstatus?.name}</p>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Observaciones</p>
                </div>
                <p className="content"> {ordersVerify?.observations} </p>
              </div>
            </Grid>
          </Grid>

          <div className="buttons">
            <Button
              disabled={loaderComplete}
              className={`dialogContainer__buttons__cancel ${loaderComplete && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderComplete}
              className={`dialogContainer__buttons__acept ${loaderComplete && "disabled"}`}
              color="primary"
              onClick={removeVerifiedOrder}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogCompleteApproved>
    </Dialog>
  );
}
