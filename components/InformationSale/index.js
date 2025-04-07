import React, { useState } from "react";
import { InfoStyled, LabelContainer, LindeDivider } from "./style";
import { Grid } from "@material-ui/core";
import { formatNumber } from "../../utils";
import { Cancel } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

export default function InfoSale(props) {
  const { oportunity, close, loader } = props;

  const validateData = (info, typeData) => {
    if (loader) return <Skeleton variant="text" animation="wave" />;
    if (info) {
      switch (typeData) {
        case "number":
          return formatNumber(info);

        default:
          return info;
      }
    } else {
      return "N/A";
    }
  };
  return (
    <InfoStyled>
      <Grid container={true} spacing={2} className="info_prospect">
        <Grid item={true} md={12} sm={12} xs={12}>
          <div className="info_prospect_title">
            {close && <Cancel className="icon" fontSize="medium" onClick={() => close()} />}
            <p>Información de la venta</p>
          </div>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Concepto</p>
          <p className="data capitalize">{validateData(oportunity?.concept)}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Monto Total</p>
          <p className="data capitalize">{validateData(oportunity?.amount, "number")}</p>
        </Grid>

        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Comisión Total</p>
          <p className="data capitalize">{validateData(oportunity?.comission, "number")}</p>
        </Grid>
        <Grid item={true} md={4} sm={6} xs={6}>
          <p className="title">Num. Pagos</p>
          <p className="data capitalize">{validateData(oportunity?.payments)}</p>
        </Grid>
      </Grid>
    </InfoStyled>
  );
}
