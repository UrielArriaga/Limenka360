import { Grid } from "@material-ui/core";
import React from "react";
import { StylesContainer } from "./styled";
import { Assignment } from "@material-ui/icons";
import { Skeleton } from "@mui/material";

export default function InformationProvider({ data }) {
  const renderContent = content => {
    if (data) {
      return content;
    } else {
      return <Skeleton variant="text" width={100} />;
    }
  };

  return (
    <StylesContainer>
      <Grid container spacing={2} className="dataOportunity">
        <Grid md={12} item>
          <div className="header">
            <Assignment className="icon" />
            <p className="titleHead">Datos de Proveedor Seleccionado</p>
          </div>
        </Grid>
        <Grid md={2} item>
          <p className="title">RFC</p>
          {renderContent(data?.rfc || "N/A")}
        </Grid>
        <Grid md={2} item>
          <p className="title">Contacto</p>
          {renderContent(data?.fullname || "N/A")}
        </Grid>
        <Grid md={2} item>
          <p className="title">Correo</p>
          {renderContent(data?.email || "N/A")}
        </Grid>
        <Grid md={2} item>
          <p className="title">Telefono</p>
          {renderContent(data?.phone || "N/A")}
        </Grid>
        <Grid md={2} item>
          <p className="title">Tipo</p>
          {renderContent(data?.type || "N/A")}
        </Grid>
        <Grid md={2} item>
          <p className="title">Identificador</p>
          {renderContent(data?.identifier || "N/A")}
        </Grid>
      </Grid>
    </StylesContainer>
  );
}
