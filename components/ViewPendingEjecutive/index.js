import { Divider, Fade, Grid, IconButton, Button } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp, ArrowRight, Close } from "@material-ui/icons";
import React, { useState } from "react";
import dayjs from "dayjs";
import { PendingDialog } from "./style";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
export default function ViewInfoPending(props) {
  const router = useRouter();
  const { open, onClose, pending } = props;
  const [isSeeMoreProspect, setIsSeeMoreProspect] = useState(false);
  const [isSeeMoreOportunity, setIsSeeMoreOportunity] = useState(false);
  const validateData = data => {
    if (data === null || data === "" || data === undefined) {
      return "N/A";
    } else {
      return data;
    }
  };
  const validateButton = item => {
    if (item.oportunityId === null && item.prospect.isclient === false) {
      return (
        <Button
          className="button_seeComplete"
          onClick={() => {
            router.push("prospectos");
          }}
        >
          Ver Prospecto Completo
        </Button>
      );
    }
    if (item.oportunityId !== null) {
      return (
        <Button
          className="button_seeComplete"
          onClick={() => {
            router.push("oportunidades");
          }}
        >
          Ver Oportunidad Completa
        </Button>
      );
    }
    if (item.oportunityId === null && item.prospect.isclient === true) {
      return (
        <Button
          className="button_seeComplete"
          onClick={() => {
            router.push("clientes");
          }}
        >
          Ver Cliente Completo
        </Button>
      );
    }
  };
  return (
    <PendingDialog open={open} onClose={onClose}>
      <div className="container">
        <div className="container__header">
          <p className="title_header">Pendiente</p>
          <IconButton className="iconButton" onClick={onClose}>
            <Close className="icon" />
          </IconButton>
        </div>
        <div className="container__body">
          <p className="title_body">Datos del Pendiente</p>
          <Grid className="pending_data" container>
            <Grid item md={4} sm={4} xs={12} className="itemGrid">
              <p className="subtitle">Ejecutivo</p>
              <p className="title capitalize">{pending.ejecutive?.fullname}</p>
            </Grid>
            <Grid item md={4} sm={4} xs={12} className="itemGrid">
              <p className="subtitle">Grupo del Ejecutivo</p>
              <p className="title capitalize">{pending.ejecutive?.group?.name}</p>
            </Grid>
            <Grid item md={4} sm={4} xs={12} className="itemGrid">
              <p className="subtitle">Tipo de Pendiente</p>
              <p className="title">{pending.pendingstype?.name}</p>
            </Grid>

            <Grid item md={6} sm={6} xs={12} className="itemGrid">
              <p className="subtitle">Titulo</p>
              <p className="title">{pending.subject}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="itemGrid">
              <p className="subtitle">Correo del Ejecutivo</p>
              <p className="title">{pending.ejecutive?.email}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="itemGrid">
              <p className="subtitle">Inicio</p>
              <p className="title capitalize">{dayjs(pending.date_from).format("DD MMMM YYYY")}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="itemGrid">
              <p className="subtitle">Fin</p>
              {pending.date_to ? (
                <p className="title capitalize">{dayjs(pending.date_to).format("DD MMMM YYYY")}</p>
              ) : (
                <p className="title">Sin Fecha Limite</p>
              )}
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="itemGrid">
              <p className="subtitle">Descripción del Pendiente</p>
              <p className="description">{pending.description}</p>
            </Grid>
          </Grid>
          <Divider className="divider" />
          <p className="title_body">
            {pending.prospect?.isclient ? "Datos del Cliente" : "Datos del Prospecto"}
            <span className="seeMore" onClick={() => setIsSeeMoreProspect(!isSeeMoreProspect)}>
              {isSeeMoreProspect ? "Ver Menos" : "Ver Datos"}
              {isSeeMoreProspect ? <ArrowDropUp className="iconSeeUp" /> : <ArrowDropDown className="iconSeeDown" />}
            </span>
          </p>
          {isSeeMoreProspect && (
            <Fade in={isSeeMoreProspect}>
              <Grid className="prospect_data" container>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Nombre Completo</p>
                  <p className="title capitalize">{pending.prospect?.fullname}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Teléfono</p>
                  <p className="title">{validateData(pending.prospect?.phone)}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Correo</p>
                  <p className="title">{validateData(pending.prospect?.email)}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Tipo de Cliente</p>
                  <p className="title">{validateData(pending.prospect?.clienttype?.name)}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Entidad</p>
                  <p className="title">{validateData(pending.prospect?.entity?.name)}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Ciudad / Municipio</p>
                  <p className="title">{validateData(pending.prospect?.city?.name)}</p>
                </Grid>
                <Grid item md={4} sm={4} xs={12} className="itemGrid">
                  <p className="subtitle">Fase</p>
                  <p className="title capitalize">{validateData(pending.prospect?.phase?.name)}</p>
                </Grid>
              </Grid>
            </Fade>
          )}
          {pending.oportunityId && (
            <>
              <Divider className="divider" />
              <p className="title_body">
                Datos de la Oportunidad
                <span className="seeMore" onClick={() => setIsSeeMoreOportunity(!isSeeMoreOportunity)}>
                  {isSeeMoreOportunity ? "Ver Menos" : "Ver Datos"}
                  {isSeeMoreOportunity ? (
                    <ArrowDropUp className="iconSeeUp" />
                  ) : (
                    <ArrowDropDown className="iconSeeDown" />
                  )}
                </span>
              </p>
              {isSeeMoreOportunity && (
                <Fade in={isSeeMoreOportunity}>
                  <Grid className="prospect_data" container>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Concepto</p>
                      <p className="title">{pending.oportunity?.concept}</p>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Fecha de Cotización</p>
                      <p className="title capitalize">{dayjs(pending.oportunity?.soldat).format("DD MMMM YYYY")}</p>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Fecha Estimada de Cierre</p>
                      <p className="title capitalize">
                        {dayjs(pending.oportunity?.estimatedclossing).format("DD MMMM YYYY")}
                      </p>
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Monto Total</p>
                      <NumberFormat
                        value={pending.oportunity?.amount}
                        displayType="text"
                        prefix="$"
                        thousandSeparator={true}
                        className="title"
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Comisión</p>
                      <NumberFormat
                        value={pending.oportunity?.comission}
                        displayType="text"
                        prefix="$"
                        thousandSeparator={true}
                        className="title"
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Certeza de Venta</p>
                      <NumberFormat
                        value={pending.oportunity?.certainty}
                        displayType="text"
                        prefix="%"
                        thousandSeparator={true}
                        className="title"
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12} className="itemGrid">
                      <p className="subtitle">Fase Oportunidad</p>
                      <p className="title capitalize">{pending?.oportunity?.phase?.name}</p>
                    </Grid>
                  </Grid>
                </Fade>
              )}
            </>
          )}
        </div>
        <div className="container__footer">{validateButton(pending)}</div>
      </div>
    </PendingDialog>
  );
}
