import React, { useContext, useEffect, useState } from "react";

import { toUpperCaseChart, handleGlobalAlert, formatNumber } from "../../utils";
import { IconButton, Dialog, CircularProgress, Grid, Button, Box, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { AccountBox, AttachMoney, Note, Person, PhoneTwoTone, TodayOutlined } from "@material-ui/icons";
import { DialogCompleteApproved } from "./styles";
import Select from "react-select";
export default function ConfirmShipment({
  setLoaderCompleteApproved,
  dataShipping,
  close,
  open,
  loaderCompleteApproved,
  toggleApprovedModal,
  refetch,
  setRefetch,
}) {
  const dispatch = useDispatch();
  const [viewMore, setViewMore] = useState(false);

  const approveOrder = async () => {
    setLoaderCompleteApproved(true);
    try {
    } catch (error) {
      console.log("errpr", error);
      handleGlobalAlert("error", "Envio - ocurrio un error al marcar como confirmado", "basic", dispatch, 6000);
      setLoaderCompleteApproved(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogCompleteApproved>
        <div className="title">
          <p>¿Estás Seguro de confirmar el envío?</p>
          {loaderCompleteApproved && <CircularProgress className="title__loader" />}
        </div>
        <div className="containerBody">
          <Grid container>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            {/* <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <p className="content">E.</p>
                </div>
              </div>
            </Grid> */}
            <Grid item md={12}>
              <div className="column">
                <p className="content">Datos de Envío:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio</p>
                </div>
                <p className="content"> {dataShipping?.itemBD?.order?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Person />

                  <p className="label">Recibe</p>
                </div>
                {console.log("dataShipping", dataShipping)}
                <p className="content"> {toUpperCaseChart(dataShipping?.itemBD?.receive)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <PhoneTwoTone />
                  <p className="label">Télefono</p>
                </div>

                <p className="content"> {dataShipping?.itemBD?.phone} </p>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <p className="content">Direccion:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Calle</p>
                </div>
                <p className="content"> {toUpperCaseChart(dataShipping?.itemBD?.address?.street)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Número Interior y Exteriror</p>
                </div>
                <p className="content">
                  Numero Int:{dataShipping?.itemBD?.address?.int_number}, Numero Ext:
                  {dataShipping?.itemBD?.address?.int_number}.
                </p>
              </div>
            </Grid>
            {viewMore ? (
              <>
                <Grid item md={6}>
                  <div className="column">
                    <div className="row">
                      <Note />
                      <p className="label">Colonia</p>
                    </div>
                    <p className="content">{toUpperCaseChart(dataShipping?.itemBD?.address?.settlement)}</p>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="column">
                    <div className="row">
                      <Note />
                      <p className="label">Codigo Postal</p>
                    </div>
                    <p className="content">{dataShipping?.itemBD?.address?.postal?.postal_code}</p>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="column">
                    <div className="row">
                      <Note />
                      <p className="label">Estado</p>
                    </div>
                    <p className="content">{toUpperCaseChart(dataShipping?.itemBD?.address?.entity?.name)}</p>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="column">
                    <div className="row">
                      <Note />
                      <p className="label">Municipio</p>
                    </div>
                    <p className="content">{toUpperCaseChart(dataShipping?.itemBD?.address?.city?.name)}</p>
                  </div>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Link className="link" onClick={() => setViewMore(false)}>
                    Ver menos
                  </Link>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={12}>
                  <Link className="link" onClick={() => setViewMore(true)}>
                    Ver más información
                  </Link>
                </Grid>
              </>
            )}

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Elige una opción de Confirmación</p>
                </div>
                <Select
                  maxMenuHeight={220}
                  className="dialogContainer__item__select"
                  placeholder="Selecciona una opción"
                  options={statusConfirm}
                  onChange={e => setRejectedOptionSelected(e.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
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
const statusConfirm = [
  {
    id: "62dHzqoSCj0ktjoy1sUAEzba",
    reason: "Enviado",
    system: true,
  },
  {
    id: "62dHzqoSCj0ktjoy1sUAEzbb",
    reason: "Pospuesto",
    system: true,
  },
  {
    id: "62dHzqoSCj0ktjoy1sUAEzbb",
    reason: "Entregado",
    system: true,
  },
];
