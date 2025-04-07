import React from "react";
import { Grid } from "@material-ui/core";
import { PersonOutlineOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import { DataViewDemoStyled } from "./styled";

export default function DataViewDemo({ demos, userData }) {
  const location = demos?.data?.address;
  const entity = demos?.data?.address?.entity;
  const city = demos?.data?.address?.city;
  const postal = demos?.data?.address?.postal;
  const assignedinstructor = demos?.data?.assignedinstructor;
  const expensebudget = demos?.data?.expensebudget;
  const dessignatedunit = demos?.data?.dessignatedunit;
  const date = demos?.data?.date;

  return (
    <DataViewDemoStyled>
      <div className="ctr_prospect__info">
        <div className="ctr_prospecto__info__ctr_title__title" >
          <PersonOutlineOutlined />
          <p>Datos </p>
        </div>
        <Grid container={true} spacing={3} className="ctr_prospect__div">
          <Grid item={true} lg={3} md={4} xs={12} >
            <b  >Calle:</b>
            <p className="ctr_prospect__div__border" >{location?.street}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Numero int:</b>
            <p className="ctr_prospect__div__border" >{location?.int_number}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Numero ext.</b>
            <p className="ctr_prospect__div__border" >{location?.ext_number}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Ciudad:</b>
            <p className="ctr_prospect__div__border" > {city?.name} </p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Estado:</b>
            <p className="ctr_prospect__div__border">{entity?.name}</p>
          </Grid>

          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Referencia:</b>
            <p className="ctr_prospect__div__border" >{location?.references ? location.references : "No hay referencia"}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Colonia:</b>
            <p className="ctr_prospect__div__border">{location?.settlement}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Código Postal:</b>
            <p className="ctr_prospect__div__border"> {postal?.postal_code} </p>
          </Grid>
        </Grid>

        <Grid container={true} style={{ marginBlock: "25px" }}>
          <h4> Datos adicionales </h4>
        </Grid>

        <Grid container={true} spacing={3} style={{ marginTop: "8px" }}>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Instructor:</b>
            <p className="ctr_prospect__div__border" > {assignedinstructor} </p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Viáticos:</b>
            <p className="ctr_prospect__div__border">${expensebudget} </p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Ejecutivo:</b>
            <p className="ctr_prospect__div__border" >{userData?.name}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Esfera:</b>
            <p className="ctr_prospect__div__border"> {userData?.groupName} </p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Unidad asignada:</b>
            <p className="ctr_prospect__div__border" > {dessignatedunit} </p>
          </Grid>
        </Grid>

        <Grid container={true} style={{ marginBlock: "25px" }}>
          <h4> Demostración: </h4>
        </Grid>

        <Grid container={true} spacing={3} styled={{ marginBlock: "25px" }}>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Fecha de Demostración </b>
            <p className="ctr_prospect__div__border" >{dayjs(date).format("DD MMMM YYYY H:mm A")}</p>
          </Grid>
          <Grid item={true} lg={3} md={4} xs={12}>
            <b>Hora :</b>
            <p className="ctr_prospect__div__border" >{dayjs(date).format("H:mm A")}</p>
          </Grid>
        </Grid>
      </div>
    </DataViewDemoStyled>
  );
}
