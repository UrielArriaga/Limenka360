import { Assignment, Edit, LocalShipping } from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FilesFormStyled } from "./styles";
import { Button, IconButton } from "@material-ui/core";
import { formatNumber } from "../../../../utils";
import TableProducts from "../TableProducts";

export default function ProductsForm({ productsData, setProductsData, handleOnClickAddProduct, actions, hookActions }) {
  const { handleBackBtForm, handleDirectStep } = actions;
  const { register, watch, setValue, setError } = hookActions;

  const handleNext = () => {
    setValue("products", productsData);
    handleDirectStep(5);
  };

  return (
    <FilesFormStyled>
      <div className="header">
        <h4 className="title">Productos</h4>
      </div>
      <div className="table_container">
        <TableProducts productsData={productsData} setProductsData={setProductsData} hookActions={hookActions} />
      </div>

      <div className="buttons">
        <Button variant="contained" className="bt_next" onClick={() => handleNext()}>
          Continuar
        </Button>
        <Button className="bt_back" onClick={() => handleBackBtForm()}>
          Atrás
        </Button>
      </div>
    </FilesFormStyled>
  );
}
