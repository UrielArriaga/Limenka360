import React, { useContext, useEffect, useState } from "react";

import { toUpperCaseChart, handleGlobalAlert, formatNumber, formatDate } from "../../../../utils";
import { IconButton, Dialog, CircularProgress, Grid, Button, Box, Link } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AccountBox, AttachMoney, CalendarToday, Note, Person, PhoneTwoTone, TodayOutlined } from "@material-ui/icons";
import { DialogModify } from "./styles";
import Select from "react-select";
import { api } from "../../../../services/api";
export default function ModifyPhase({
  setLoaderCompletephase,
  loaderCompletephase,
  dataShipping,
  close,
  open,
  refetch,
  setRefetch,
}) {
  const dispatch = useDispatch();
  const [modifyPhase, setModifyPhase] = useState("");
  const [phases, setPhases] = useState([]);
  useEffect(() => {
    getShippins();
  }, []);
  const getShippins = async () => {
    try {
      let res = await api.get("/shippingphases");
      setPhases(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const ModifyPhase = async () => {
    setLoaderCompletephase(true);
    try {
    } catch (error) {
      console.log("error", error);
      handleGlobalAlert("error", "Envio - ocurrio un error al modificar la fase", "basic", dispatch, 6000);
      setLoaderCompletephase(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogModify>
        <div className="title">
          <p>Envio</p>
          {loaderCompletephase && <CircularProgress className="title__loader" />}
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
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <p className="label">Nombre Producto</p>
                </div>

                <p className="content"> {toUpperCaseChart(dataShipping?.itemBD?.productsoportunity?.product?.name)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <p className="label">Codigo Producto</p>
                </div>

                <p className="content"> {toUpperCaseChart(dataShipping?.itemBD?.productsoportunity?.product?.code)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <CalendarToday />
                  <p className="label">Fecha de Creación</p>
                </div>
                <p className="content"> {formatDate(dataShipping?.createdAt)} </p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Fase</p>
                </div>
                <Select
                  //   maxMenuHeight={220}
                  className="dialogContainer__item__select"
                  placeholder="Selecciona una opción"
                  options={phases}
                  onChange={e => setModifyPhase(e.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
              disabled={loaderCompletephase}
              className={`dialogContainer__buttons__cancel ${loaderCompletephase && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderCompletephase}
              className={`dialogContainer__buttons__acept ${loaderCompletephase && "disabled"}`}
              color="primary"
              onClick={ModifyPhase}
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogModify>
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
    id: "62dHzqoSCj0ktjoy1sUAEzbba",
    reason: "Entregado",
    system: true,
  },
];
