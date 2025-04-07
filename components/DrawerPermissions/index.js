import React, { useEffect, useState } from "react";
import { Grid, IconButton, Tooltip, CircularProgress, LinearProgress } from "@material-ui/core";
import { CachedRounded, Close, DateRangeRounded, PersonRounded } from "@material-ui/icons";
import { DrawerPermissions } from "../DrawerPermissions/styles.styled";
import dayjs from "dayjs";
import { api } from "../../services/api";
import { returnFomatTime } from "../../utils";
import NumberFormat from "react-number-format";
export default function DrawPermissions(data) {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [idRequest, setIdRequest] = useState("");
  const [dataRequest, setDataRequest] = useState({});
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  useEffect(() => {
    if (data.open === true) {
      validateRequestPending();
    }
  }, [data.open]);
  const validateApprobationHead = (aprovate, denied) => {
    if (aprovate === true) return <p className="contenedor__body__card__head__permit">Aprobada</p>;
    if (denied === true) return <p className="contenedor__body__card__head__denied">Denegada</p>;
    if (aprovate === false && denied === false) return <p className="contenedor__body__card__head__pending">Pendiente</p>;
  };
  const validateApprobationBody = (item) => {
    if (item.approved === true) return <p className="contenedor__body__card__body__allowBy__title">Aprobada por:</p>;
    if (item.denied === true) return <p className="contenedor__body__card__body__allowBy__title">Denegada por:</p>;
    if (item.approved === false && item.denied === false) return <p className="contenedor__body__card__body__concept">A espera de Aprobación</p>;
  };
  const validateRequestPending = async () => {
    setIsLoadingRequest(true);
    data.setRefetch(!data.refetch);
    try {
      let query = {};
      query.concept = data.request.concept;
      let validateInfo = await api.get(`ejecutivediscounts?where=${JSON.stringify(query)}`);
      if (validateInfo.data.results.length >= 1) {
        let requestInfo = validateInfo.data.results[0];
        setIdRequest(validateInfo.data.results[0].id);
        setIsRequestPending(true);
        setDataRequest(validateInfo.data.results[0]);
        setIsLoadingRequest(false);
        if (requestInfo.approved === true) data.setRequestAprobate(true);
        if (requestInfo.denied === true) data.setRequestAprobate(false);
      } else {
        data.setRequestAprobate(false);
        setIsRequestPending(false);
        setIsLoadingRequest(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async () => {
    if (isRequestPending === false) {
      try {
        await api.post(`ejecutivediscounts`, data.request);
        validateRequestPending();
        data.handleAlert("success", "Solicitud Enviada", "basic", data.setAlert);
        data.setRefetch(!data.refetch);
        data.close(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Esperando Aprobación");
    }
  };
  const deleteRequest = async () => {
    try {
      let deleteReques = await api.delete(`ejecutivediscounts/${idRequest}`);
      data.handleAlert("success", "Solicitud Eliminada", "basic", data.setAlert);
      data.setRefetch(!data.refetch);
      validateRequestPending();
      data.close(false);
      setDataRequest({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerPermissions open={data.open} onClose={() => data.close(!data.open)} anchor="right">
      <div className="contenedor">
        <div className="contenedor__head">
          <p className="contenedor__head__title">
            Permisos
            <Tooltip title="Recargar Datos" arrow>
              <CachedRounded className="iconReload" onClick={() => data.setRefetch(!data.refetch)} />
            </Tooltip>
          </p>
          <IconButton className="contenedor__head__icon" onClick={() => data.close(false)}>
            <Close />
          </IconButton>
        </div>
        <div className="contenedor__body">
          <Grid container spacing={2} className="contenedor__body__formRequest">
            <Grid item md={6} xs={6} s={6}>
              <p className="contenedor__body__formRequest__title">Concepto</p>
              <p className="contenedor__body__formRequest__info">{dataRequest.id !== undefined ? dataRequest.concept : data.request.concept}</p>
            </Grid>
            <Grid item md={6} xs={6} s={6}>
              <p className="contenedor__body__formRequest__title">IVA</p>
              <p className="contenedor__body__formRequest__info">
                <NumberFormat prefix="$" displayType="text" value={dataRequest.id !== undefined ? dataRequest.ivatotal : data.request.ivatotal} thousandSeparator={true} />
              </p>
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <p className="contenedor__body__formRequest__title">Descuento</p>
              <p className="contenedor__body__formRequest__info">
                {dataRequest.id !== undefined ? dataRequest.dispercentage : data.request.dispercentage}% -{" "}
                <NumberFormat prefix="$" displayType="text" value={dataRequest.id !== undefined ? dataRequest.discount : data.request.discount} thousandSeparator={true} decimalScale={2} />
              </p>
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <p className="contenedor__body__formRequest__title">Comisión</p>
              <p className="contenedor__body__formRequest__info">
                {dataRequest.id !== undefined ? dataRequest.compercentage : data.request.compercentage}% -{" "}
                <NumberFormat prefix="$" displayType="text" value={dataRequest.id !== undefined ? dataRequest.comission : data.request.comission} thousandSeparator={true} decimalScale={2} />
              </p>
            </Grid>
            <Grid item md={6} xs={6} s={6}>
              <p className="contenedor__body__formRequest__title">Total</p>
              <p className="contenedor__body__formRequest__info">
                <NumberFormat prefix="$" displayType="text" value={dataRequest.id !== undefined ? dataRequest.total : data.request.total} thousandSeparator={true} decimalScale={2} />
              </p>
            </Grid>
            <Grid item md={6} xs={6} s={6}>
              <p className="contenedor__body__formRequest__title">Subtotal</p>
              <p className="contenedor__body__formRequest__info">
                <NumberFormat prefix="$" displayType="text" value={dataRequest.id !== undefined ? dataRequest.subtotal : data.request.subtotal} thousandSeparator={true} decimalScale={2} />
              </p>
            </Grid>

            <Grid item md={12} xs={12} sm={12} className="contenedor__body__formRequest__buttons">
              {isLoadingRequest === true ? (
                <CircularProgress size={25} solor="secondary" />
              ) : isRequestPending === true ? (
                <button className="delete" onClick={() => deleteRequest()}>
                  Eliminar Solicitud
                </button>
              ) : (
                <button className="send" onClick={() => sendRequest()}>
                  Solicitar Descuento
                </button>
              )}
            </Grid>
          </Grid>
          {data.isLoadingDataRequest ? (
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          ) : (
            data.discountsEjecutive?.map((item, index) => (
              <div className="contenedor__body__card" key={index}>
                <div className="contenedor__body__card__head">
                  <p className="contenedor__body__card__head__title">Folio {item.concept}</p>
                  {validateApprobationHead(item.approved, item.denied)}
                </div>
                <div className="contenedor__body__card__body">
                  <div className="contenedor__body__card__body__allowBy">{validateApprobationBody(item)}</div>
                  <div className="contenedor__body__card__body__date">
                    <DateRangeRounded className="contenedor__body__card__body__date__icon" />
                    <p className="contenedor__body__card__body__date__dateSoli">
                      Fecha de Solicitud: <span className="info">{dayjs(item.createdAt).format("DD/MM/YYYY") + " " + returnFomatTime(item.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="contenedor__footer"></div>
      </div>
    </DrawerPermissions>
  );
}
