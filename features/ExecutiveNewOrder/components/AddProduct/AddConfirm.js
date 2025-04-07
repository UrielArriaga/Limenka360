import React, { useState } from "react";
import { AddStyle } from "./style";
import { Button, Grid } from "@material-ui/core";
import NumberFormat from "react-number-format";

export default function AddConfirm({ open, toggleDrawer, productsControl }) {
  const {
    isEditProduct,
    productSelected,
    quantityProductSelect,
    setQuantityProductSelect,
    handleOnClickAddProduct,
    handleOnClickUpdateProduct,
  } = productsControl;

  // const [quantity, setQuantity] = useState(1);

  return (
    <AddStyle open={open} onClose={toggleDrawer}>
      {/* <pre>{JSON.stringify(productSelected, null, 2)}</pre> */}
      <div className="header">
        <p className="title_header" onClick={() => console.log("paquete", packageSelected)}>
          Confirmación de Producto
        </p>
      </div>

      <Grid className="form_product" container spacing={1}>
        <Grid md={12} item>
          <p className="title">Producto </p>
          <input value={productSelected?.name} className="input_data" disabled />
        </Grid>
        <Grid md={6} item>
          <p className="title">Categoria</p>
          <input className="input_data" value={productSelected?.category?.name} disabled />
        </Grid>

        <Grid md={6} item>
          <p className="title">Código</p>
          <input className="input_data" value={productSelected?.code} disabled />
        </Grid>

        <Grid md={6} item>
          <p className="title">Precio unitario</p>
          <input className="input_data" value={0} disabled />
        </Grid>

        <Grid md={6} item>
          <p className="title">Cantidad</p>
          <NumberFormat
            value={quantityProductSelect}
            onValueChange={values => {
              setQuantityProductSelect(values.floatValue);
            }}
            className="input_data"
            thousandSeparator
          />
          {/* <input className="input_data" value={0} disabled /> */}
        </Grid>
      </Grid>

      <div className="buttons">
        {isEditProduct ? (
          <Button variant="contained" className="bt_add" onClick={handleOnClickUpdateProduct}>
            Editar Producto
          </Button>
        ) : (
          <Button variant="contained" className="bt_add" onClick={handleOnClickAddProduct}>
            Agregar Producto
          </Button>
        )}
        {/* <Button className="bt_add" onClick={handleOnClickAddProduct}>
          Agrear Producto
        </Button> */}
      </div>
    </AddStyle>
  );
}
