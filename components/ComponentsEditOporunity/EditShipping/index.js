import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Grid, IconButton } from "@material-ui/core";
import { EditStyle } from "./style";
import NumberFormat from "react-number-format";
import { Close } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { calculatePercentaje } from "../../../utils";
export default function EditShipp(data) {
  const { open, close, isHaveShipping, shipping } = data;
  const [noteShipping, setNoteShipping] = useState("");
  const [valueJoined, setValueJoined] = useState(0);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalIVA, setTotalIVA] = useState(0);
  const [discountPorcent, setDiscountPorcent] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [applyIva, setApplyIva] = useState(false);

  useEffect(() => {
    if (isHaveShipping) {
      chargeDataShipping();
    } else {
      cleanAllInputs();
    }
  }, [shipping, open]);

  useEffect(() => {
    calculateTotal();
  }, [applyIva, valueJoined, discountPorcent]);

  const validatingData = (value, saveIn) => {
    if (value === "" || value === null || value === undefined) {
      saveIn(0);
    } else {
      saveIn(Number(value));
    }
  };

  const calculateTotal = () => {
    let ivaResults = 0;
    let subtotal = 0;
    let discount = 0;
    if (applyIva) {
      ivaResults = calculatePercentaje(16, Number(valueJoined));
      setTotalIVA(ivaResults);
    } else {
      setTotalIVA(0);
    }
    discount = calculatePercentaje(discountPorcent, valueJoined);
    setTotalDiscount(discount);
    subtotal = valueJoined;
    setSubTotal(subtotal);
    let total = Number(ivaResults) + Number(subtotal) - Number(discount);
    setTotal(total);
  };

  const chargeDataShipping = () => {
    setDiscountPorcent(shipping.dispercentage);
    setValueJoined(shipping.newprice);
    setTotalDiscount(shipping.discount);
    setNoteShipping(shipping.note);
    if (shipping.iva >= 1) {
      setApplyIva(true);
    } else {
      setApplyIva(false);
    }
  };

  const cleanAllInputs = () => {
    setValueJoined(0);
    setTotal(0);
    setSubTotal(0);
    setTotalIVA(0);
    setDiscountPorcent(0);
    setTotalDiscount(0);
  };

  const confirmChanges = () => {};

  return (
    <EditStyle open={open} onClose={close}>
      <div className="container">
        <div className="header">
          <p className="title">{isHaveShipping ? "Editar Envió" : "Agregar Envió"}</p>
          <IconButton className="button" onClick={close}>
            <Close className="icon" />
          </IconButton>
        </div>
        <Grid className="body" container spacing={1}>
          <Grid item md={12}>
            <div className="inputlabel">
              <label htmlFor="">Nota de Envió</label>
              <textarea
                className="textarea"
                value={noteShipping}
                cols="30"
                rows="5"
                placeholder="Escriba Alguna Nota"
                onChange={e => setNoteShipping(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">
                Total de Envió
                {/* <span className="alert"> *{isHaveValue ? "" : "Requerido"} </span> */}
              </p>
              <NumberFormat
                displayType="input"
                placeholder="Ingresa Cantidad"
                className="keyword"
                thousandSeparator={true}
                prefix="$"
                value={valueJoined}
                onValueChange={values => validatingData(values.value, setValueJoined)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Descuento</p>
              <NumberFormat
                displayType="input"
                placeholder="Ingresa Porcentaje"
                className="keyword"
                thousandSeparator={true}
                prefix="%"
                value={discountPorcent}
                onValueChange={values => validatingData(values.value, setDiscountPorcent)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="options">
              <div className="option">
                <label htmlFor="">IVA</label>
                <Checkbox
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={applyIva}
                  onChange={e => setApplyIva(e.target.checked)}
                />
              </div>
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="amountFinal">
              {applyIva && (
                <Box display="flex" alignItems="center">
                  Iva: <NumberFormat value={totalIVA} prefix="$ " thousandSeparator={true} displayType="text" />
                </Box>
              )}
              <Box display="flex" alignItems="center">
                Descuento:
                <NumberFormat value={totalDiscount} prefix="$ -" thousandSeparator={true} displayType="text" />
              </Box>
              <Box display="flex" alignItems="center">
                SubTotal: <NumberFormat value={subTotal} prefix="$ " thousandSeparator={true} displayType="text" />
              </Box>
              <Box display="flex" alignItems="center">
                <p className="total">
                  Total:
                  <NumberFormat
                    value={total}
                    prefix="$ "
                    thousandSeparator={true}
                    displayType="text"
                    decimalScale={2}
                  />
                </p>
              </Box>
            </div>
          </Grid>
        </Grid>
        <div className="footer">
          <Button className="btStyle cancelBt" onClick={close}>
            Cancelar
          </Button>

          <Button className="btStyle confirmBt" onClick={confirmChanges}>
            {isHaveShipping ? "Guardar Cambios" : "Agregar Envió"}
          </Button>
        </div>
      </div>
    </EditStyle>
  );
}
