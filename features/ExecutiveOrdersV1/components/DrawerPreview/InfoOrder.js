import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { InfoProspectStyled, FieldValue } from "./styles";

export default function InfoOrder({ orderData }) {
  return (
    <InfoProspectStyled>
      <Typography variant="h6" gutterBottom>
        <ListAlt
          style={{
            fontSize: "1.8rem",
            verticalAlign: "middle",
            marginRight: 8,
            color: "#C05100",
          }}
        />{" "}
        Datos del pedido
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Folio:</span>{" "}
          <FieldValue>{orderData?.folio || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Estatus del pedido:</span>{" "}
          <FieldValue>{orderData?.orderstatus?.name || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="itemData">
          <span className="label">Cuenta de pago:</span>{" "}
          <FieldValue>{orderData?.paymentaccount?.name || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Observaciones generales:</span>{" "}
          <FieldValue>{orderData?.observations || "N/A"}</FieldValue>
        </Grid>
      </Grid>
    </InfoProspectStyled>
  );
}
