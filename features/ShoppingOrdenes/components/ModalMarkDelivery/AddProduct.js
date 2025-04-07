import React, { useEffect, useState } from "react";
import { DialogContainer } from "./styled";
import { IconButton } from "@mui/material";
import { ArrowBackIos } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { formatNumber } from "../../../../utils";
import useAlertToast from "../../../../hooks/useAlertToast";
import { api } from "../../../../services/api";
import InputMoney from "../../../ExecutiveOrders/components/ModalShipping/MoneyInput";

export default function AddProduct({
  orderSelected,
  setShowAddProduct,
  setOrderSelected,
  productToOrderSelected,
  setView,
  resetView,
  orderSelectedData,
}) {
  const [quantity, setQuantity] = useState(1);
  const [amount, setamount] = useState(productToOrderSelected?.product?.callamount);
  const [total, settotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const { showAlertSucces, showAlertError } = useAlertToast();

  const handleSubmitProduct = async () => {
    console.log(productToOrderSelected, orderSelected, quantity);
    let data = {
      quantity: quantity,
      unit: "pzas",
      unitprice: amount,
      amount: total,
      productId: productToOrderSelected?.productId,
      purchaseorderId: orderSelected?.id,
      orderId: orderSelectedData?.id,
      productoportunityId: productToOrderSelected?.id,
    };

    try {
      setIsFetching(true);
      let response = await api.post("/supplies", data);
      console.log(response);
      showAlertSucces("Producto agregado correctamente");
      resetView();
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);

      showAlertError("Error al agregar producto");
    }
  };

  // calcula el total de la compra

  useEffect(() => {
    settotal(productToOrderSelected?.product?.callamount * quantity);
  }, [quantity, amount]);

  //

  function parseCurrency(value) {
    if (!value) return 0;
    const number = Number(value.replace(/[^0-9.-]+/g, ""));
    return isNaN(number) ? 0 : number;
  }

  return (
    <DialogContainer>
      {/* <div className="headerDialog">
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
      </div> */}

      <div className="bodyadd">
        {/* <p className="title">Agregar producto a orden de compra</p> */}

        <Grid container spacing={2}>
          <Grid item md={12}>
            <div className="inputContainer">
              <p className="label">Orden de Compra</p>
              <input value={orderSelected?.folio || "Sin Folio"} />
            </div>
          </Grid>

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
                Precio de compra <span>({formatNumber(productToOrderSelected?.product?.callamount)})</span>
              </p>

              <input
                type="text"
                value={amount}
                placeholder="0.00 MXM"
                onChange={e => {
                  setamount(e.target.value);
                }}
                // onChange={}
              />
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
        <Button
          disabled={isFetching}
          className={`btn_upload`}
          variant="contained"
          color="primary"
          onClick={() => handleSubmitProduct()}
        >
          Agregar producto a orden de compra
        </Button>
      </div>
    </DialogContainer>
  );
}
