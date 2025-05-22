import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { LocalShipping } from "@material-ui/icons";
import { InfoProspectStyled, FieldValue } from "./styles";

export default function InfoSend({ orderData }) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  return (
    <InfoProspectStyled>
      <Typography variant="h6" gutterBottom>
        <LocalShipping
          style={{
            fontSize: "1.8rem",
            verticalAlign: "middle",
            marginRight: 8,
            color: "#878787",
          }}
        />{" "}
        Datos del envío
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Recibe:</span>{" "}
          <FieldValue>{orderData?.receive || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={5} className="itemData">
          <span className="label">Teléfono:</span>{" "}
          <FieldValue>{orderData?.phone || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="itemData">
          <span className="label">Calle:</span>{" "}
          <FieldValue>{orderData?.address?.street || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="itemData">
          <span className="label">Num. Interior:</span>{" "}
          <FieldValue>{orderData?.address?.int_number || "N/A"}</FieldValue>
        </Grid>
        <Grid item xs={12} sm={6} md={6} className="itemData">
          <span className="label">Num. Exterior:</span>{" "}
          <FieldValue>{orderData?.address?.ext_number || "N/A"}</FieldValue>
        </Grid>
        {showAllInfo && (
          <>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Código postal:</span>{" "}
              <FieldValue>
                {orderData?.address?.postal?.postal_code || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Estado:</span>{" "}
              <FieldValue>
                {orderData?.address?.entity?.name || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Municipio:</span>{" "}
              <FieldValue>{orderData?.address?.city?.name || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Colonia:</span>{" "}
              <FieldValue>{orderData?.address?.settlement || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Referencias:</span>{" "}
              <FieldValue>{orderData?.address?.references || "N/A"}</FieldValue>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <button onClick={() => setShowAllInfo(!showAllInfo)}>
            {showAllInfo ? "Ver menos" : "Ver más"}
          </button>
        </Grid>
      </Grid>
    </InfoProspectStyled>
  );
}
