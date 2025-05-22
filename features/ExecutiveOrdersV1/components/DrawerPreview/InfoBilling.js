import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Receipt } from "@material-ui/icons";
import { InfoProspectStyled, FieldValue } from "./styles";

export default function InfoBilling({ orderData }) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  return (
    <InfoProspectStyled>
      <Typography variant="h6" gutterBottom>
        <Receipt
          style={{
            fontSize: "1.8rem",
            verticalAlign: "middle",
            marginRight: 8,
            color: "#B60600",
          }}
        />{" "}
        Datos de facturación
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4} className="itemData">
          <span className="label">Facturación:</span>{" "}
          <FieldValue>{orderData?.billing ? "Si" : "No"}</FieldValue>
        </Grid>
        {showAllInfo && (
          <>
            <Grid item xs={12} sm={6} md={6} className="itemData">
              <span className="label">Razón social:</span>{" "}
              <FieldValue>{orderData?.bill?.businessname || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">RFC:</span>{" "}
              <FieldValue>{orderData?.bill?.rfc || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Uso de CFDI:</span>{" "}
              <FieldValue>{orderData?.bill?.cfdi?.name || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Método de pago:</span>{" "}
              <FieldValue>
                {orderData?.bill?.paymentmethod?.name || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Forma de pago:</span>{" "}
              <FieldValue>
                {orderData?.bill?.paymentway?.name || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Teléfono:</span>{" "}
              <FieldValue>{orderData?.bill?.phone || "N/A"}</FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Calle:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.street || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Num. Interior:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.int_number || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Num. Exterior:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.ext_number || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Colonia:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.settlement || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Códico postal:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.postal?.postal_code || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Estado:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.entity?.name || "N/A"}
              </FieldValue>
            </Grid>
            <Grid item xs={12} sm={6} md={5} className="itemData">
              <span className="label">Municipio:</span>{" "}
              <FieldValue>
                {orderData?.bill?.address?.city?.name || "N/A"}
              </FieldValue>
            </Grid>
          </>
        )}
        {orderData?.billing && (
          <Grid item xs={12}>
            <button onClick={() => setShowAllInfo(!showAllInfo)}>
              {showAllInfo ? "Ver menos" : "Ver más"}
            </button>
          </Grid>
        )}
      </Grid>
    </InfoProspectStyled>
  );
}
