import React, { useEffect, useState } from "react";
import { FormNewProdStyle } from "./styles";
import { Button, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { handleGlobalAlert } from "../../../../utils";
import useAlertToast from "../../../../hooks/useAlertToast";

export default function FormNewProduct({ open, close, closeAll, product, addProduct }) {
  const dispatch = useDispatch();
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
    iva: 0,
    totalIva: 0,
    subtotal: 0,
    hasiva: false,
    amount: 0,
  });

  useEffect(() => {
    if (product) {
      console.log(product);
      setNewProduct({
        model: product?.code,
        name: product?.name,
        quantity: 1,
        unit: "pzas",
        unitprice: product?.callamount,
        amount: product?.callamount,
        productId: product?.id,
        provider: product?.provider,
        subtotal: product?.quantity || 1 * product?.callamount || 0,
        iva: 0,
        totalIva: 0,
        hasiva: product?.hasiva || false,
        amount: product?.amount,
      });
    }

  }, [product]);

  const handleEditProduct = (value, identifier) => {
    let copyProduct = { ...newProduct };
    copyProduct[identifier] = value;
    if (identifier === "quantity") {
      copyProduct.amount = Number(value) * Number(copyProduct.unitprice) + copyProduct.totalIva;
      copyProduct.subtotal = Number(value) * Number(copyProduct.unitprice);
    }
    if (identifier === "unitprice") copyProduct.amount = Number(value) * Number(copyProduct.quantity);
    if (identifier === "iva") copyProduct.totalIva = copyProduct.amount * 0.16;
    setNewProduct(copyProduct);
  };

  const handleCheckboxChange = event => {
    let totalIva = 0;

    let subtotal = 0;

    let amount = 0;

    if (event.target.checked) {
      totalIva = newProduct.amount * 0.16;
      subtotal = newProduct.amount;
      amount = subtotal + totalIva;

      setNewProduct(prev => ({
        ...prev,
        hasiva: event.target.checked,
        totalIva,
        subtotal,
        amount,
      }));
    }

    // setNewProduct(prev => ({
    //   ...prev,
    //   hasiva: event.target.checked,
    //   totalIva: event.target.checked ? prev.amount * 0.16 : 0,
    //   subtotal: event.target.checked ? prev.amount - prev.totalIva : prev.amount,
    //   amount: event.target.checked ? prev.subtotal + prev.totalIva : prev.amount,
    // }));
    // let copyProduct = { ...newProduct };

    // if (event.target.checked) {
    //   copyProduct.hasiva = event.target.checked;
    //   copyProduct.totalIva = event.target.checked ? copyProduct.amount * 0.16 : 0;
    // } else {
    //   copyProduct.hasiva = event.target.checked;
    //   copyProduct.totalIva = 0;
    // }

    // // copyProduct.iva = event.target.checked ? 0.16 : 0;

    // // copyProduct.setNewProduct(copyProduct);
    // setNewProduct(copyProduct);
  };

  const handleAdd = () => {
    let copyProduct = { ...newProduct };
    // let isOk = Object.values(copyProduct).some(
    //   value => value === "" || value === null || value === undefined || value === 0
    // );

    // Just check de price and quantity

    console.log(copyProduct);

    let isOk = copyProduct.unitprice === 0 || copyProduct.quantity === 0;

    console.log(copyProduct);

    if (isOk) {
      showAlertWarning(`El campo cantidad y precio no debe estar vacio ni en 0`);
    } else {
      handleGlobalAlert("success", "Producto Agregado Correctamente", "basic", dispatch, 6000);
      addProduct(newProduct);
      closeAll();
    }
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
                className="input_data"
                value={newProduct?.unitprice}
                type="number"
                min={0.01}
                step="0.01"
                onChange={e => {
                  let value = e.target.value;

                  if (value.includes(".")) {
                    const [integer, decimal] = value.split(".");
                    if (decimal?.length > 2) {
                      value = `${integer}.${decimal.slice(0, 2)}`;
                    }
                  }

                  handleEditProduct(parseFloat(value) || 0, "unitprice");
                }}
                onKeyDown={e => {
                  if (e.key.length === 1 && !/[0-9.]/.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === "." && e.target.value.includes(".")) {
                    e.preventDefault();
                  }
                }}
              />
            </Grid>
            <Grid className="item" item={true} md={2}>
              <p className="title">Cantidad</p>
              <input
                className="input_data"
                value={newProduct?.quantity}
                type="number"
                min={1}
                step={1}
                onChange={e => handleEditProduct(e.target.value, "quantity")}
                onKeyDown={e => {
                  if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                }}
              />
            </Grid>

            <Grid className="item" item={true} md={12}>
              <p className="title">Producto</p>
              <textarea
                disabled
                className="input_data description"
                value={newProduct?.name}
                onChange={e => handleEditProduct(e.target.value, "name")}
              />
            </Grid>

            <Grid className="item" item={true} md={12}>
              <FormControlLabel
                value={newProduct.hasiva}
                control={
                  <Checkbox checked={newProduct.hasiva} onChange={handleCheckboxChange} name="iva" color="primary" />
                }
                label="Aplicar IVA"
              />
            </Grid>

            <Grid className="item" item={true} md={12}>
              <p className="title">Total IVA</p>
              <input className="input_data" value={newProduct?.totalIva || 0} disabled />
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
