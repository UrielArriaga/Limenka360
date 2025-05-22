import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";
import { InfoProspectStyled, FieldValue } from "./styles";
import { formatNumber, formatDate } from "../../../../utils";

export default function InfoSales({ orderData }) {
  return (
    <InfoProspectStyled>
      <Typography variant="h6" gutterBottom>
        <MonetizationOn
          style={{
            fontSize: "1.8rem",
            verticalAlign: "middle",
            marginRight: 8,
            color: "#C2B600",
          }}
        />{" "}
        Datos de venta
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Concepto:</span>{" "}
          <FieldValue>{orderData?.oportunity?.concept || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Monto:</span>{" "}
          <FieldValue>{formatNumber(orderData?.oportunity?.amount)}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Comisión:</span>{" "}
          <FieldValue>
            {formatNumber(orderData?.oportunity?.comission) || "N/A"}
          </FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Fecha de venta:</span>{" "}
          <FieldValue>
            {formatDate(orderData?.oportunity?.soldat) || "N/A"}
          </FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="itemData">
          <span className="label">Observaciones:</span>{" "}
          <FieldValue>
            {orderData?.oportunity?.generalobservations || "N/A"}
          </FieldValue>
        </Grid>
      </Grid>
    </InfoProspectStyled>
  );
}
