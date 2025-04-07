import React, { useState } from "react";
import { AddressShoppingEditStyled, FilesEditStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Grid, Switch } from "@material-ui/core";
import SelectField from "../SelectField";
import InputField from "../InputField";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { namesForm } from "../../../ExecutiveEditOrder/data";
import { EntitiesLocal } from "../../../../BD/databd";
import TableProducts from "./TableProducts";

export default function ProductsEdit({ productsData, productsControl }) {
  const { results: products = [], count = 0 } = productsData;
  return (
    <FilesEditStyled>
      <div className="sectionheader">
        <h1 className="title">Productos del pedido</h1>
        <Assignment className="icon_primary" />
      </div>

      <TableProducts products={products} productsControl={productsControl} />
      <Grid className="container_form" container spacing={2}>
        {/* <pre>{JSON.stringify(productsData?.results, null, 2)}</pre> */}
      </Grid>
    </FilesEditStyled>
  );
}
