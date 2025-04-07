import React, { useEffect, useState } from "react";
import { DialogContainer } from "./styled";
import { IconButton } from "@mui/material";
import { ArrowBackIos } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { formatNumber } from "../../../../utils";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";

export default function AddProduct({
  orderSelected,
  setShowAddProduct,
  setOrderSelected,
  productToOrderSelected,
  setView,
  resetView,
}) {
  const [quantity, setQuantity] = useState(1);
  const [amount, setamount] = useState(productToOrderSelected?.product?.callamount);
  const { showAlertSucces, showAlertError } = useAlertToast();

  const handleSubmitProduct = async () => {
    console.log(productToOrderSelected, orderSelected, quantity);
    let data = {
      quantity: quantity,
      unit: "pzas",
      unitprice: productToOrderSelected?.product?.callamount,
      amount: amount,
      productId: productToOrderSelected?.productId,
      purchaseorderId: orderSelected?.id,
    };

    try {
      let response = await api.post("/supplies", data);
      console.log(response);
      showAlertSucces("Producto agregado correctamente");
      resetView();
    } catch (error) {
      console.log(error);
      showAlertError("Error al agregar producto");
    }
  };

  // calcula el total de la compra

  useEffect(() => {
    setamount(productToOrderSelected?.product?.callamount * quantity);
  }, [quantity, amount]);

  //

  return (
    <DialogContainer>
      <div className="headerDialog">
        <div className="headerDialog__title">
          {orderSelected && (
            <IconButton
              className="btnback"
              onClick={() => {
                setShowAddProduct(false);
                setOrderSelected(null);
                setView("selectOrder");
              }}
            >
              <ArrowBackIos />
            </IconButton>
          )}
          <p className="">Agregar a orden de compra</p>
        </div>
      </div>

      <div className="bodyadd">
        <p className="title">Agregar producto a orden de compra</p>

        <Grid container spacing={2}>
          <Grid item md={12}>
            <div className="inputContainer">
              <p className="label">Producto</p>
              <input value={productToOrderSelected?.product?.name} />
            </div>
          </Grid>

          <Grid item md={12}>
            <div className="inputContainer">
              <p className="label">Proveedor</p>
              <input value={orderSelected?.provider?.companyname} />
            </div>
          </Grid>

          <Grid item md={6}>
            <div className="inputContainer">
              <p className="label">Cantidad</p>
              <input
                type="number"
                placeholder="Cantidad"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item md={6}>
            <div className="inputContainer">
              <p className="label">
                Precio <span>({formatNumber(productToOrderSelected?.product?.callamount)})</span>
              </p>
              <input type="text" value={amount} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="inputContainer_switch">
              <input
                className="chek"
                type="checkbox"
                // name={field.name}
              />
              <b>Relacionar producto a orden</b>
            </div>
          </Grid>

          <Grid item md={12}>
            <p>Total : {formatNumber(quantity * amount)}</p>
          </Grid>
        </Grid>
      </div>

      <div className="actions">
        <Button
          variant="contained"
          color="primary"
          className={`btn_cancel ${false && "disabled"}`}
          onClick={() => {
            setShowAddProduct(false);
            setOrderSelected(null);
            setView("selectOrder");
          }}
        >
          Cancelar
        </Button>
        <Button className={`btn_upload`} variant="contained" color="primary" onClick={() => handleSubmitProduct()}>
          Guardar producto
        </Button>
      </div>
    </DialogContainer>
  );
}
