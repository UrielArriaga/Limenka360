import { Assignment } from "@material-ui/icons";
import React from "react";
import { ResumeOrderStyled } from "./styles";
// import TableProducts from "./TableProducts";
import InfoAddress from "./InfoAddress";
import BillingInfo from "./BillingInfo";
import { Button, Grid } from "@material-ui/core";
import TableProducts from "../ProductsEdit/TableProducts";

export default function ResumeOrder({ productsData, formControls, filesData }) {
  // const { handleSave } = actions;

  const formData = formControls.getValues();

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
          <InfoAddress formData={formData} />
        </Grid>

        <Grid item md={6}>
          <BillingInfo formData={formData} />
        </Grid>

        <Grid item md={12}>
          <p style={{ fontWeight: "400" }}>Total de archivos {filesData?.results.length}</p>
        </Grid>

        <Grid item md={12}>
          <TableProducts products={productsData?.results} productsControl={null} />
        </Grid>

        <Grid item md={6}>
          {/* <BillingInfo formData={formData.billing} /> */}
        </Grid>
      </Grid>
      <br />
      {/* 
      <Grid item xs={12} sm={12} md={12}>
        <TableProducts productsData={productsData} />
      </Grid>
      <Grid className="buttons" item xs={12} sm={12} md={12}>
        <Button className="bt_save" onClick={() => handleSave()}>
          Guardar
        </Button>
      </Grid> */}

      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </ResumeOrderStyled>
  );
}
