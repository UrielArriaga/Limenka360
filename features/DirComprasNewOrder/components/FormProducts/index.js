import React from "react";
import TableProducts from "./TableProducts";
import { Add, Assignment } from "@material-ui/icons";
import { FormContainer } from "./styles";
import { Button } from "@material-ui/core";

export default function FormProducts({ provider, modalControl, productControl }) {
  const {
    products = [],
    handleOnChangeProperty,
    handleOnClickDeleteProduct,
    handleOnClickOpenAddSerials,
  } = productControl;
  console.log("producs", productControl);
  return (
    <FormContainer>
      <div className="sectionheader">
        <h1 className="title">Productos de la orden</h1>
        <Assignment className="icon_primary" />
      </div>

      <h4>
        Proveedor : {provider?.companyname}-{provider?.name}
      </h4>
      <TableProducts
        products={products}
        handleOnChangeProperty={handleOnChangeProperty}
        handleOnClickDeleteProduct={handleOnClickDeleteProduct}
        handleOnClickOpenAddSerials={handleOnClickOpenAddSerials}
      />

      <div className="buttons">
        <Button
          disabled={!provider}
          className="add_product"
          variant="outlined"
          startIcon={<Add />}
          style={{
            marginTop: 40,
          }}
          onClick={() => modalControl.handleToogleAddProduct()}
        >
          {provider ? "Agregar Producto" : "Selecciona un proveedor"}
        </Button>
      </div>
    </FormContainer>
  );
}
