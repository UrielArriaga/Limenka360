import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Select from "react-select";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ModalExtraProductOrderDB({
  open,
  setOpen,
  setAlert,
  isEditing,
  itemSelected,
  setIsEditing,
  setItemSelected,
  oportunity,
  setFlagOportunity,
  flagOportunity,
}) {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const { productSelect, productsSelected, extraproductsSelected } = useSelector(quotesSelector);
  const [quantity, setQuantity] = useState(1);
  const [applyIva, setApplyIva] = useState(false);
  const [showNoteInPdf, setShowNoteInPdf] = useState(false);
  const [note, setNote] = useState("");
  const [valueSelected, setValueSelected] = useState();
  const [asdasdsa, setasdasdsa] = useState("------------");
  const [singleIVA, setSingleIVA] = useState(0);
  const [totalIVA, setTotalIVA] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalWithoutIVA, setTotalWithoutIVA] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [disableAddDiscount, setAddDisableDiscount] = useState(true);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, SetTotalDiscount] = useState(0);

  const [priceProduct, setPriceProduct] = useState(0);
  const dispatch = useDispatch();
  const oportunity_id = router.query.o ? router.query.o : oportunity.id;

  // * new states
  const [extraProductSelected, setExtraProductSelected] = useState({});

  // * new events
  const handleOnChangeProduct = e => {
    setValueSelected(e.value);
    let extraproduc = extraProductsData.filter((item, index) => item.id === e.value);
    setExtraProductSelected(extraproduc[0]);
    setValueSelected(e);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetProductSelect({}));

    if (isEditing) {
      // setIsEditing(false);
      setItemSelected({});
      setApplyIva(false);
      setShowNoteInPdf(false);
      setValueSelected();
      setNote("");
      setIsEditing(false);
    }
    setExtraProductSelected({});
    setPriceProduct(0);
    setTotalIVA(0);
    setDiscount(0);
    setValueSelected({});
    setNote("");
    setApplyIva(false);
  };

  useEffect(() => {
    const myFunction = () => {
      if (isEditing) {
        let value = extraproducts.filter((item, index) => item.value == itemSelected?.id);
        setValueSelected(value[0]);
        setNote(itemSelected?.info);
        setQuantity(itemSelected?.quantity);
        setPriceProduct(itemSelected?.newprice);
        setShowNoteInPdf(itemSelected?.shownote);
        // setIsEditing(false);
        if (itemSelected?.iva > 0) {
          setApplyIva(itemSelected.iva);
        }
        setExtraProductSelected(itemSelected);
      }
    };
    myFunction();
  }, [itemSelected, isEditing]);

  useEffect(() => {
    calculateTotal();
  }, [applyIva, quantity, productSelect, discount, priceProduct]);

  const handleSetNewProduct = (item, index) => {
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
    copy.shownote = showNoteInPdf;
    copy.code_temporal = generateTemporalId(24);
    let lastProducts = [...productsSelected, copy];

    // return;
    dispatch(setArrayProducts(lastProducts));

    setOpen(false);
    handleGlobalAlert("success", "Producto Agregado", "basic", dispatch);

    setQuantity(1);
  };

  const calculateTotal = () => {
    if (applyIva) {
      let ivaResult = calculatePercentaje(16, priceProduct * quantity);
      let singIva = calculatePercentaje(16, priceProduct);
      setSingleIVA(singIva);
      let sumProducts = priceProduct * quantity;
      setTotalIVA(ivaResult);
      let sum = sumProducts + parseFloat(ivaResult);
      setTotal(sum);
      setTotalWithoutIVA(sumProducts);
    } else {
      let sum = priceProduct * quantity;
      setTotalIVA(0);
      setSubTotal(sum);

      setTotalWithoutIVA(sum);
      setSingleIVA(0);

      setTotal(sum);
      if (!disableAddDiscount) {
        let totalDiscount = calculatePercentaje(discount, sum);
        SetTotalDiscount(totalDiscount);

        setTotal(sum - totalDiscount);
        // console.log(totalDiscount);
      }
    }
  };

  // * HandlesEvents

  const handleCheckEvent = event => {
    setApplyIva(event.target.checked);

    if (event.target.checked == true) {
      // console.log("desabilitado");
      setAddDisableDiscount(true);
    } else {
      // console.log("habilitado");
      setAddDisableDiscount(false);
    }
    // calculateIVA();
  };

  const normalizeProduct = item => {
    return {
      id: item.id,
      prodId: item.product.id,
      quantity: item.quantity,
      discount: item.discount,
      iva: item.singleiva,
      total: item.total,
      note: item.note,
      newprice: item.newprice,
      customproduct: false,
      shownote: false,
      ejecutiveId: id_user,
      dispercentage: item.discountp,
      observations: "",
      description: "",
    };
  };
  const [isUpdating, setIsUpdating] = useState(false);
  const handleClickEditProduct = async (produtToEdit, index = 0) => {
    let mutateProduct = { ...produtToEdit };
    mutateProduct.index = Number(index);
    mutateProduct.quantity = Number(quantity);
    mutateProduct.iva = parseFloat(totalIVA);
    mutateProduct.singleiva = parseFloat(singleIVA);
    mutateProduct.discount = Number(totalDiscount);
    mutateProduct.discountp = Number(discount);
    mutateProduct.callamount = Number(priceProduct);
    mutateProduct.totalWithoutIva = Number(totalWithoutIVA);
    mutateProduct.total = total;
    mutateProduct.shownote = showNoteInPdf;
    mutateProduct.newprice = Number(priceProduct);

    let foundProduct = productsSelected.map((item, index) => {
      if (item.code_temporal === mutateProduct.code_temporal) return mutateProduct;
      return item;
    });

    try {
      setIsUpdating(true);
      let products = normalizeProduct(mutateProduct);

      let body = {
        putproducts: [products],
        amount: mutateProduct.total + oportunity.subtotal,
        totalextracosts: mutateProduct.total,
        noshippingtotal: mutateProduct.total,
      };
      let resp = await api.put(`oportunities/goals/${oportunity_id}`, body);
      setFlagOportunity(!flagOportunity);
      setOpen(false);
      setIsEditing(false);
      // handleGlobalAlert("success", "Producto Agregado", "basic", dispatch);
      handleGlobalAlert("success", `Envio y oportunidad fue actualizado`, "basic", dispatch);
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      setFlagOportunity(!flagOportunity);
      setOpen(false);
      setIsEditing(false);
      handleGlobalAlert("error", `Envio  no actualizado`, "basic", dispatch);
    }

    setIsUpdating(false);
  };

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
            <p>
              Producto Extra{" "}
              <span style={{ color: "red", fontSize: 12, fontWeight: "bold" }}>
                (Al editar este producto, modificara el total de la oportunidad, de igual manera tendrás que verificar
                los montos de pagos pendientes)
              </span>
            </p>
            <Close onClick={() => setOpen(!open)} />
          </Box>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <div className="inputlabel">
                <label htmlFor="">Producto</label>
                <Select
                  value={valueSelected}
                  placeholder="Selecciona tu producto extra"
                  options={extraproducts}
                  onChange={handleOnChangeProduct}
                  defaultValue={{
                    label: "Envio",
                    value: "12d09ENVIO22mowzna3P0008",
                  }}
                />
              </div>
            </Grid>

            <Grid item md={12}>
              <div className="inputlabel">
                <label htmlFor="">Nota de Producto</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Nota"
                ></textarea>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Codigo</label>
                <input
                  disabled
                  value={extraProductSelected?.code ? extraProductSelected?.code : ""}
                  className="disabled"
                  type="text"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Marca</label>
                <input
                  disabled
                  value={`${extraProductSelected?.brand?.name ? extraProductSelected?.brand?.name : ""}`}
                  onChange={e => {}}
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
                  value={priceProduct === 0 ? "" : priceProduct}
                  onChange={e => {
                    setPriceProduct(e.target.value);
                  }}
                  className="keyword"
                  type="number"
                  placeholder="Ingrese un valor"
                />
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="inputlabel">
                <label htmlFor="">Cantidad</label>
                <input
                  min={1}
                  defaultValue={quantity}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="keyword"
                  type="number"
                  placeholder="Busqueda"
                />
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="options">
                <div className="option">
                  <label htmlFor="">IVA</label>
                  <Checkbox
                    checked={applyIva}
                    onChange={event => handleCheckEvent(event)}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </div>
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
                {isUpdating && <CircularProgress />}
                {isEditing && isUpdating && (
                  <Button
                    disabled={true}
                    onClick={() => handleClickEditProduct(itemSelected)}
                    color="primary"
                    variant="contained"
                  >
                    Actualizando Producto
                  </Button>
                )}
                {isEditing && !isUpdating && (
                  <Button onClick={() => handleClickEditProduct(itemSelected)} color="primary" variant="contained">
                    Editar Producto
                  </Button>
                )}
                {!isEditing && (
                  <Button
                    disabled={isEmptyObject(extraProductSelected)}
                    onClick={() => handleSetNewProduct(extraProductSelected)}
                    color="primary"
                    variant="contained"
                  >
                    {isEmptyObject(extraProductSelected) ? "Selecciona un producto" : "Agregar Producto"}
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </DialogStyled>
    </div>
  );
}

const isEmptyObject = obj => Object.keys(obj).length <= 0;

import styled from "styled-components";
import { Box, Checkbox, CircularProgress, Grid, IconButton, Tooltip } from "@material-ui/core";
import { Block, Close, Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { quotesSelector, resetProductSelect, setArrayProducts, setProductSelect } from "../../redux/slices/quotesSlice";
import {
  calculatePercentaje,
  colorLog,
  formatNumber,
  generateTemporalId,
  handleAlert,
  handleGlobalAlert,
} from "../../utils";
import NumberFormat from "react-number-format";
import { colors } from "../../styles/global.styles";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { userSelector } from "../../redux/slices/userSlice";

const DialogStyled = styled(Dialog)`
  .options {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    button {
      /* background-color: #0f3c81; */
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
    /* color: #0f3c81; */
  }
`;

const extraproducts = [
  {
    label: "Envio",
    value: "12d09ENVIO22mowzna3P0008",
  },
  // {
  //   label: "Costos de instalación",
  //   value: "z0fmhiAuEN8HQDAepCdpR3Ry",
  // },
];

const extraProductsData = [
  {
    id: "12d09ENVIO22mowzna3P0008",
    name: "Envio",
    callamount: 0,
    code: "ENVIO-UA",
    import: true,
    brandId: "dj7joaKM7B4tMYcUVzJ1GIqn",
    categoryId: "ctaxRBVe0DnRCuaySZCNwAqu",
    producttypeId: "i31nZk2hwXGivM1MxgmwLbrh",
    category: {
      id: "ctaxRBVe0DnRCuaySZCNwAqu",
      name: "ENVIO",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    brand: {
      id: "dj7joaKM7B4tMYcUVzJ1GIqn",
      name: "ENVIO",
      isactive: true,
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      brandlineId: null,
    },
    index: null,
    quantity: 1,
    iva: 0,
    singleiva: 0,
    discount: 0,
    discountp: 0,
    totalWithoutIva: 0,
    total: 0,
    customproduct: true,
    shownote: false,
  },
  {
    id: "12d09INSTA22aowzrk3I0010",
    name: "Costos de instalacion",
    callamount: 0,
    code: "INST-UA",
    import: true,
    brandId: "7kAgu4KGqRvRJOTHqdWk74z5",
    categoryId: "62QA6cb1um2dt7NjynktQSx8",
    producttypeId: "VeFmrvdNx9JbAxdLN5r3bKxL",
    category: {
      id: "62QA6cb1um2dt7NjynktQSx8",
      name: "INSTALACION",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    brand: {
      id: "7kAgu4KGqRvRJOTHqdWk74z5",
      name: "INSTALACION",
      isactive: true,
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      brandlineId: null,
    },
    index: null,
    quantity: 1,
    iva: 0,
    singleiva: 0,
    discount: 0,
    discountp: 0,
    totalWithoutIva: 0,
    total: 0,
    customproduct: true,
    shownote: false,
  },
];
