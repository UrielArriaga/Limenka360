import React, { useEffect, useState } from "react";
import { FormNewProdStyle } from "./styles";
import { Button, Grid } from "@material-ui/core";
import useAlertToast from "../../../../hooks/useAlertToast";

export default function FormNewProduct({ open, close, closeAll, product, addProduct }) {
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const [newProduct, setNewProduct] = useState({
    model: "",
    name: "",
    quantity: 1,
    unit: "pzas",
    unitprice: 0,
    amount: 0,
    productId: "",
    provider: {},
  });

  useEffect(() => {
    if (product) {
      setNewProduct({
        model: product?.code,
        name: product?.name,
        quantity: 1,
        unit: "pzas",
        unitprice: product?.callamount,
        amount: product?.callamount,
        productId: product?.id,
        provider: product?.provider,
      });
    }
  }, [product]);

  const handleEditProduct = (value, identifier) => {
    let copyProduct = { ...newProduct };
    copyProduct[identifier] = value;
    if (identifier === "quantity") copyProduct.amount = Number(copyProduct.unitprice) * Number(value);
    if (identifier === "unitprice") copyProduct.amount = Number(value) * Number(copyProduct.quantity);

    setNewProduct(copyProduct);
  };

  const handleAdd = () => {
    if (newProduct?.unitprice == undefined || newProduct?.unitprice == "") {
      showAlertWarning("Precio Unitario de producto es Requerido");
      return;
    }
    if (newProduct?.unitprice == 0) {
      showAlertWarning("Precio de producto tiene que ser mayor a 0");
      return;
    }
    if (newProduct?.quantity == "") {
      showAlertWarning("Cantidad de producto es Requerido");
      return;
    }
    if (newProduct?.quantity == 0) {
      showAlertWarning("Cantidad de producto tiene que ser mayor a 0");
      return;
    }
    showAlertSucces("Producto Agregado Correctamente");
    addProduct(newProduct);
    closeAll();
  };

  return (
    <FormNewProdStyle open={open} onClose={close}>
      <div className="content_product">
        <div className="content_product__header">
          <p className="title_header">Confirmación de Producto</p>
        </div>
        <div className="content_product__body">
          <Grid className="form_product" container={true} spacing={1}>
            <Grid className="item" item={true} md={5}>
              <p className="title">Modelo</p>
              <input
                className="input_data"
                value={newProduct?.model}
                onChange={e => handleEditProduct(e.target.value, "model")}
              />
            </Grid>
            <Grid className="item" item={true} md={5}>
              <p className="title">Precio unitario</p>
              <input
                min={1}
                className="input_data"
                type="number"
                value={newProduct?.unitprice}
                onChange={e => handleEditProduct(e.target.value, "unitprice")}
                placeholder="Precio unitario"
              />
            </Grid>
            <Grid className="item" item={true} md={2}>
              <p className="title">Cantidad</p>

              <input
                min={1}
                step={1}
                value={newProduct?.quantity}
                onChange={e => handleEditProduct(e.target.value, "quantity")}
                className="input_data"
                type="number"
                placeholder="cantidad"
              />
            </Grid>

            <Grid className="item" item={true} md={12}>
              <p className="title">Nombre</p>
              <textarea
                disabled
                className="input_data description"
                value={newProduct?.name}
                onChange={e => handleEditProduct(e.target.value, "name")}
              />
            </Grid>
          </Grid>
        </div>
        <div className="content_product__footer">
          <div className="buttons">
            <Button className="bt_cancel" onClick={() => close()}>
              Cancelar
            </Button>
            <Button className="bt_add" onClick={() => handleAdd()}>
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </FormNewProdStyle>
  );
}
