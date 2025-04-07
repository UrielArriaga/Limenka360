import { Assignment } from "@material-ui/icons";
import React from "react";
import { ResumeOrderStyled } from "./styles";
import TableProducts from "./TableProducts";
import InfoAddress from "./InfoAddress";
import BillingInfo from "./BillingInfo";
import { Button, Grid } from "@material-ui/core";

export default function ResumeOrder({ formData, productsData, actions }) {
  const { handleSave } = actions;
  return (
    <ResumeOrderStyled>
      <div className="sectionheader">
        <h1 className="title" onClick={() => console.log("datos", formData)}>
          Resumen de pedido
        </h1>
        <Assignment className="icon_primary" />
      </div>
      <br />

      <Grid container spacing={2}>
        <Grid item md={6}>
          <InfoAddress formData={formData.mailing} />
        </Grid>

        <Grid item md={6}>
          <BillingInfo formData={formData.billing} />
        </Grid>
      </Grid>
      <br />

      <Grid item xs={12} sm={12} md={12}>
        <TableProducts productsData={productsData} />
      </Grid>
      <Grid className="buttons" item xs={12} sm={12} md={12}>
        <Button className="bt_save" onClick={() => handleSave()}>
          Guardar
        </Button>
      </Grid>

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </ResumeOrderStyled>
  );
}
