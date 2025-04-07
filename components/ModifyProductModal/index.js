import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Checkbox, Dialog, DialogContent, Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Select from "react-select";
import styled from "styled-components";
import { api } from "../../services/api";
import { resetProductSelect } from "../../redux/slices/quotesSlice";
import { calculatePercentaje, colorLog, formatNumber, handleAlert } from "../../utils";
import useFetchData, { processResponseArray } from "../../hooks/useFetchData";

export default function ModifyProductModal({ open, setOpen, setAlert, productToEdit, getQuotesByOportunity }) {
  const [quantity, setQuantity] = useState(1);
  const [applyIva, setApplyIva] = useState(true);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [disableAddDiscount, setDisableAddDiscount] = useState(true);
  const [time, setTime] = useState();
  const dispatch = useDispatch();

  const normalize = data => {
    return data.map(item => ({
      value: item.id,
      label: item.deliverytimes,
    }));
  };

  const { data: dileveryTimes } = useFetchData(
    "deliverytimes",
    processResponseArray,
    { params: { all: 1 } },
    normalize
  );

  //Initial state
  useEffect(() => {
    if (open) {
      if (productToEdit.deliverytime) {
        setTime({
          label: productToEdit.deliverytime?.deliverytimes,
          value: productToEdit.deliverytime?.id,
        });
      } else {
        setTime({
          label: "Selecciona un tiempo de entrega...",
          value: "",
        });
      }
    }
  }, [open]);

  useEffect(() => {
    colorLog(productToEdit.product, "success");
    setQuantity(productToEdit.quantity);
  }, [productToEdit]);

  useEffect(() => {
    calculateTotal();
  }, [applyIva, quantity, productToEdit, discount]);

  const handleClose = () => {
    setOpen(false);
    dispatch(resetProductSelect());
  };

  //Actualizar en la base
  const handleProductUpdate = async () => {
    if (!productToEdit || !productToEdit.id) {
      handleAlert("error", "El producto a editar no es válido", "basic", setAlert);
      return;
    }

    if (time.value == "") {
      handleAlert("warning", "Selecciona un tiempo de entrega", "basic", setAlert);
      return;
    }

    try {
      let data = {
        deliverytimeId: time.value,
      };
      await api.put(`productsoportunities/${productToEdit.id}`, data);
      handleAlert("success", `El producto fue actualizado`, "basic", setAlert);
      getQuotesByOportunity(); // Recarga la data en el padre
      setOpen(false);
    } catch (error) {
      handleAlert("error", "Hubo un problema al actualizar el producto", "basic", setAlert);
    }
  };

  const calculateTotal = () => {
    const baseAmount = productToEdit.product.callamount * quantity;
    const iva = applyIva ? calculatePercentaje(16, baseAmount) : 0;
    const total = baseAmount + iva - (disableAddDiscount ? 0 : calculatePercentaje(discount, baseAmount));
    setTotal(total);
  };

  const handleSelectTime = item => {
    if (item === "") {
      setTime({});
    } else {
      setTime(item);
    }
  };

  return (
    <DialogStyled open={open} keepMounted onClose={handleClose}>
      <DialogContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <p>Confirmación de producto</p>
          <Close onClick={handleClose} />
        </Box>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <div className="inputlabel">
              <label>Producto</label>
              <input className="disabled" disabled value={productToEdit.product.name || ""} />
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="inputlabel">
              <Box display="flex" alignItems="center">
                <label>Tiempo de entrega</label>
              </Box>
              <Select
                options={dileveryTimes}
                onChange={e => (e === null ? handleSelectTime("") : handleSelectTime(e))}
                value={time}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <label>Código</label>
              <input className="disabled" disabled value={productToEdit.product.code || ""} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <label>Clasificación</label>
              <input className="disabled" disabled value={productToEdit.product.import ? "Importado" : "Nacional"} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <label>Precio Unitario</label>
              <input className="disabled" disabled value={`$${productToEdit.product.callamount}`} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <label>Marca</label>
              <input className="disabled" disabled value={productToEdit.product.brand?.name} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <label>Cantidad</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                disabled
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <Box display="flex" alignItems="center">
                <label>Descuento del producto</label>
              </Box>
              <input
                type="number"
                min={1}
                disabled={disableAddDiscount}
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div>
              <label>IVA</label>
              <Checkbox
                checked={applyIva}
                disabled={!productToEdit.product.import}
                onChange={e => {
                  setApplyIva(e.target.checked);
                  setDisableAddDiscount(!e.target.checked);
                }}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="amountFinal">
              <Box display="flex" alignItems="center">
                IVA: {formatNumber(calculatePercentaje(16, productToEdit.product.callamount * quantity))}
              </Box>
              {!disableAddDiscount && (
                <Box display="flex" alignItems="center">
                  Descuento: -{formatNumber(calculatePercentaje(discount, productToEdit.product.callamount * quantity))}
                </Box>
              )}
              <Box display="flex" alignItems="center">
                SubTotal: {formatNumber(productToEdit.product.callamount * quantity)}
              </Box>
              <Box display="flex" alignItems="center">
                <p className="total">Total : {formatNumber(total)}</p>
              </Box>
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="actions">
              <Button onClick={() => handleProductUpdate(productToEdit.product)} color="primary" variant="contained">
                Editar Producto
              </Button>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </DialogStyled>
  );
}

const DialogStyled = styled(Dialog)`
  .actions {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: #0f3c81;
    }
  }
  .inputlabel {
    display: flex;
    flex-direction: column;
    label {
      color: rgb(86 86 86);
      font-weight: 600;
      font-size: 14px;
    }
    input {
      margin-top: 10px;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      font-size: 0.8125rem;
      padding: 10px;
      width: 100%;
    }
    .disabled {
      background-color: #e0e0e0;
    }
  }
  .amountFinal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    label {
      color: #000;
    }
    .total {
      color: #424242;
      font-weight: bold;
    }
  }
`;
