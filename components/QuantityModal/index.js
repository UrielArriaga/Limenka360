import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import { Box, Checkbox, Fade, Grid } from "@material-ui/core";
import { Close, ErrorRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import { quotesSelector, resetProductSelect, setArrayProducts } from "../../redux/slices/quotesSlice";
import {
  calculatePercentaje,
  colorLog,
  formatNumber,
  generateTemporalId,
  handleAlert,
  handleGlobalAlert,
} from "../../utils";
import Select from "react-select";
import { api } from "../../services/api";
import useGlobalCommons from "../../hooks/useGlobalCommons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function QuantityModal({ open, setOpen, setAlert, editQuantity, setIsEditingProduct, openDiscount }) {
  const { getCatalogBy } = useGlobalCommons();
  const { productSelect, productsSelected } = useSelector(quotesSelector);
  const { deliverytimes } = useSelector(commonSelector);
  const [quantity, setQuantity] = useState(1);
  const [applyIva, setApplyIva] = useState(true);
  const [singleIVA, setSingleIVA] = useState(0);
  const [totalIVA, setTotalIVA] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalWithoutIVA, setTotalWithoutIVA] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [disableAddDiscount, setAddDisableDiscount] = useState(true);
  const [totalDiscount, SetTotalDiscount] = useState(0);
  const [priceProduct, setPriceProduct] = useState(0);
  const dispatch = useDispatch();
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [options, setOptions] = useState([{ id: 1, name: "1 día" }]);

  const handleClose = () => {
    setOpen(false);
    dispatch(resetProductSelect({}));
    setTime("");
    if (editQuantity) {
      setIsEditingProduct(false);
      setNote("");
    }
    // Activar el check de iva (cuando se agregaba un producto
    // y se desaciva, al agregar otro  el check estaba deshabilidato)
    if (open === true && editQuantity === undefined) {
      setApplyIva(true);
      setDiscount(0);
    }
  };

  useEffect(() => {
    if (productSelect.callamount) {
      setPriceProduct(productSelect.callamount);
    }
  }, [productSelect]);

  useEffect(() => {
    if (editQuantity) {
      colorLog(productSelect, "succcess");
      setQuantity(productSelect.quantity);
      setNote(productSelect.info);
    }
  }, [productSelect]);

  useEffect(() => {
    calculateTotal();
  }, [applyIva, quantity, productSelect, discount, priceProduct]);

  useEffect(() => {
    if (open === true) {
      disabledIvaAndDiscount();
    }
  }, [productSelect, openDiscount]);

  useEffect(() => {
    getCatalogBy("deliverytimes");
  }, []);
  useEffect(() => {
    const res = deliverytimes?.results;
    const updatedArray = res.map(obj => renameKey({ ...obj }, "deliverytimes", "name"));
    setOptions(updatedArray);
  }, [deliverytimes]);

  const renameKey = (obj, oldKey, newKey) => {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
    return obj;
  };

  const handleSetNewProduct = (item, index) => {
    if (priceProduct == "") {
      handleGlobalAlert("error", "Precio Unitario de producto es Requerido", "basic", dispatch);
      return;
    }
    if (quantity == "") {
      handleGlobalAlert("error", "Cantidad de productos es Requerido", "basic", dispatch);
      return;
    }
    if (quantity == 0) {
      handleGlobalAlert("error", "Cantidad de productos tiene que ser mayor a 0", "basic", dispatch);
      return;
    }
    let copy = { ...item };

    copy.index = Number(index);
    copy.quantity = Number(quantity);
    copy.iva = parseFloat(totalIVA);
    copy.singleiva = parseFloat(singleIVA);
    copy.discount = Number(totalDiscount);
    copy.discountp = Number(discount);
    copy.callamount = Number(priceProduct);
    copy.totalWithoutIva = Number(totalWithoutIVA);
    copy.total = total;
    copy.info = note;
    copy.code_temporal = generateTemporalId(24);
    copy.deliveryTime = time?.name;
    copy.deliveryTimeId = time?.id;
    let lastProducts = [...productsSelected, copy];
    dispatch(setArrayProducts(lastProducts));

    setOpen(false);
    setTime("");
    handleAlert("success", "Producto Agregado", "basic", setAlert);
    setQuantity(1);
    setApplyIva(true);
    setDiscount(0);
    setAddDisableDiscount(false);
  };

  const disabledIvaAndDiscount = () => {
    if (openDiscount === true) {
      setApplyDiscount(true);
    } else {
      if (productSelect.import === true) {
        setApplyDiscount(false);
        setAddDisableDiscount(false);
      } else {
        setApplyDiscount(true);
        setAddDisableDiscount(true);
      }
    }
  };

  const calculateTotal = () => {
    if (applyIva) {
      let ivaResult = calculatePercentaje(16, priceProduct * quantity);
      let singIva = calculatePercentaje(16, priceProduct);
      setSingleIVA(singIva);
      setTotalIVA(ivaResult);
      let sumProducts = priceProduct * quantity;
      let sum = sumProducts + parseFloat(ivaResult);
      setTotalWithoutIVA(sumProducts);
      if (!disableAddDiscount) {
        let totalDiscount = calculatePercentaje(discount, sum);
        let sumaDiscount = sum - totalDiscount;
        SetTotalDiscount(totalDiscount);
        setTotal(sumaDiscount);
      } else {
        setTotal(sum);
      }
    } else {
      let sum = priceProduct * quantity;
      setTotalIVA(0);
      setTotalWithoutIVA(sum);
      setSingleIVA(0);
      setTotal(sum);
    }
  };

  const handleCheckEvent = event => {
    setApplyIva(event.target.checked);

    if (event.target.checked == true) {
      setAddDisableDiscount(false);
    } else {
      setDiscount(0);
      setAddDisableDiscount(true);
    }
  };

  const handleClickEditProduct = (produtToEdit, index = 0) => {
    if (priceProduct == "") {
      handleGlobalAlert("error", "Precio Unitario de producto es Requerido", "basic", dispatch);
      return;
    }
    if (quantity == "") {
      handleGlobalAlert("error", "Cantidad de productos es Requerido", "basic", dispatch);
      return;
    }
    if (quantity == 0) {
      handleGlobalAlert("error", "Cantidad de productos tiene que ser mayor a 0", "basic", dispatch);
      return;
    }
    let mutateProduct = { ...produtToEdit };

    mutateProduct.index = Number(index);
    mutateProduct.quantity = Number(quantity);
    mutateProduct.iva = parseFloat(totalIVA);
    mutateProduct.singleiva = parseFloat(singleIVA);

    mutateProduct.discount = Number(disableAddDiscount ? 0 : totalDiscount);
    mutateProduct.discountp = Number(discount);
    mutateProduct.callamount = Number(priceProduct);

    mutateProduct.info = note;
    mutateProduct.totalWithoutIva = Number(totalWithoutIVA);
    mutateProduct.total = total;
    mutateProduct.deliveryTime = time?.name;
    mutateProduct.deliveryTimeId = time?.id;
    let foundProduct = productsSelected.map((item, index) => {
      if (item.code_temporal === mutateProduct.code_temporal) return mutateProduct;
      return item;
    });

    dispatch(setArrayProducts(foundProduct));
    setOpen(false);
    setQuantity(1);
    setAddDisableDiscount(false);
    setDiscount(0);
    setTime("");
    handleAlert("success", `Producto con codigo${produtToEdit.code} fue actualizado`, "basic", setAlert);
  };

  const alertDiscount = itemDiscount => {
    if (itemDiscount === true && productSelect?.import === true) {
      return true;
    } else {
      return false;
    }
  };
  const handleSelectTime = item => {
    if (item === "") {
      setTime({});
    } else {
      setTime(item);
    }
  };
  useEffect(() => {
    const selectedOption = options?.find(
      option => option?.id === productSelect?.deliveryTimeId || option?.name === productSelect?.deliveryTime
    );
    setTime(selectedOption);
  }, [productSelect, options]);

  return (
    <div>
      <DialogStyled
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Box display="flex" justifyContent="space-between" cursor="pointer" mb={2}>
            <p>Confirmacion de producto</p>
            <Close onClick={() => setOpen(!open)} />
          </Box>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <div className="inputlabel">
                <label htmlFor="">Producto</label>
                <input
                  className="disabled"
                  disabled
                  value={productSelect?.name ? productSelect?.name : ""}
                  type="text"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Codigo</label>
                <input
                  disabled
                  value={productSelect?.code ? productSelect?.code : ""}
                  className="disabled"
                  type="text"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Clasificacion</label>
                <input
                  disabled
                  readOnly
                  value={productSelect.import === true ? "Importado" : "Nacional"}
                  className="disabled"
                  type="text"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Precio Unitario</label>
                <input
                  value={priceProduct}
                  onChange={e => {
                    setPriceProduct(e.target.value);
                  }}
                  className="keyword"
                  type="number"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Marca</label>
                <input
                  disabled
                  value={`${productSelect?.brand?.name}`}
                  className="disabled"
                  type="text"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Cantidad</label>
                <input
                  min={1}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="keyword"
                  type="number"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="inputlabel">
                <Box display="flex" alignItems="center">
                  <label htmlFor="">Descuento del producto %</label>
                </Box>
                <input
                  min={0}
                  disabled={disableAddDiscount}
                  value={discount}
                  onChange={e => {
                    setDiscount(e.target.value);
                  }}
                  className="keyword"
                  type="number"
                  placeholder="Descuento"
                />
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="inputlabel">
                <Box display="flex" alignItems="center">
                  <label htmlFor="">Tiempo de entrega</label>
                </Box>
              </div>
              <Select
                className="select-options"
                placeholder="tiempo de entrega"
                options={options}
                onChange={e => (e === null ? handleSelectTime("") : handleSelectTime(e))}
                value={time || null}
                getOptionValue={option => `${option.id}`}
                getOptionLabel={option => `${option.name}`}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                }}
              />
            </Grid>
            <Grid item md={12}>
              <div className="inputlabel">
                <label htmlFor="">Observaciones de Producto</label>
                <textarea
                  style={{ padding: 4 }}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Observaciones del producto"
                ></textarea>
              </div>
            </Grid>

            <Grid item md={12}>
              <div className="containerIva">
                <label htmlFor="">IVA</label>

                <Checkbox
                  disabled={applyDiscount}
                  checked={applyIva}
                  onChange={event => handleCheckEvent(event)}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <Fade in={alertDiscount(openDiscount)}>
                  <div className="alertRequest">
                    <ErrorRounded className="alertRequest__icon" />
                    <p className="alertRequest__title">
                      No Puedes aplicar descuento a este producto, ya se esta aplicando descuento general.
                    </p>
                  </div>
                </Fade>
              </div>
            </Grid>

            <Grid item md={12}>
              <div className="amountFinal">
                <Box display="flex" alignItems="center">
                  Iva: {formatNumber(totalIVA)}
                </Box>

                {!disableAddDiscount && (
                  <Box display="flex" alignItems="center">
                    Descuento: -{formatNumber(totalDiscount)}
                  </Box>
                )}

                <Box display="flex" alignItems="center">
                  SubTotal: {formatNumber(priceProduct * quantity)}
                </Box>

                <Box display="flex" alignItems="center">
                  <p className="total">Total : {formatNumber(total)}</p>
                </Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="actions">
                {editQuantity ? (
                  <Button onClick={() => handleClickEditProduct(productSelect)} color="primary" variant="contained">
                    Editar Producto
                  </Button>
                ) : (
                  <Button onClick={() => handleSetNewProduct(productSelect)} color="primary" variant="contained">
                    Agregar Producto
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
          {/* Fin */}
        </DialogContent>
      </DialogStyled>
    </div>
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
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 10px 23px 9px 11px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
    }

    .disabled {
      background-color: #e0e0e0;
    }
  }
  .select-options {
    /* height: 10px; */
    /* overflow-y: auto; */
  }
  .containerIva {
    display: flex;
    align-items: center;
    .alertRequest {
      display: flex;
      align-items: center;
      width: fit-content;
      border-radius: 8px;
      padding: 3px;

      &__title {
        font-size: 13px;
        color: #d32f2f;
        font-weight: 500;
      }
      &__icon {
        color: #d32f2f;
        font-size: 18px;
        margin-right: 8px;
      }
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
