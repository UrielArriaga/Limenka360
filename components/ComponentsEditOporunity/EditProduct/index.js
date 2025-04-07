import { IconButton, Button, Grid, Checkbox, Box, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { EditProductStyle } from "./style";
export default function EditProduct(data) {
  const { open, close, dataProduct, arrayProducts } = data;
  const [noteProduct, setNoteProduct] = useState("");
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [totalIVA, setTotalIVA] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountPorcent, setDiscountPorcent] = useState(0);
  const [priceUnit, setPriceUnit] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [applyIva, setApplyIva] = useState(false);

  useEffect(() => {
    if (dataProduct) {
      showDataProducts();
    }
  }, [dataProduct]);

  const showDataProducts = () => {
    setPriceUnit(dataProduct?.product?.callamount);
    setQuantity(dataProduct?.product?.quantity);
    setNoteProduct(dataProduct?.product?.info);
  };

  const saveChanges = () => {};

  const validatingData = (value, saveIn) => {
    if (value === "" || value === null || value === undefined) {
      saveIn(0);
    } else {
      saveIn(Number(value));
    }
  };
  return (
    <EditProductStyle open={open} onClose={close}>
      <div className="container">
        <div className="header">
          <p className="title">Confirmación de Producto</p>
          <IconButton className="button" onClick={close}>
            <Close className="icon" />
          </IconButton>
        </div>
        <Grid className="body" container spacing={1}>
          <Grid item md={12}>
            <div className="inputlabel">
              <p className="title">Nombre del Producto</p>
              <input className="disabled" value={dataProduct?.product?.name} disabled={true} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Código</p>
              <input className="disabled" value={dataProduct?.product?.code} disabled={true} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Clasificación</p>
              <input
                className="disabled"
                value={dataProduct?.product?.import ? "Importado" : "Nacional"}
                disabled={true}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Precio Unitario</p>
              <NumberFormat
                displayType="input"
                placeholder="Ingresa Cantidad"
                className="keyword"
                thousandSeparator={true}
                prefix="$"
                value={priceUnit}
                onValueChange={values => validatingData(values.value, setPriceUnit)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Marca</p>
              <input className="disabled" value={dataProduct?.product?.brand?.name} disabled={true} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Cantidad</p>
              <NumberFormat
                displayType="input"
                placeholder="Ingresa Cantidad"
                className="keyword"
                thousandSeparator={true}
                value={quantity}
                onValueChange={values => validatingData(values.value, setQuantity)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="inputlabel">
              <p className="title">Descuento del Producto %</p>
              <NumberFormat
                displayType="input"
                placeholder="Ingresa Porcentaje"
                className="keyword"
                thousandSeparator={true}
                prefix="%"
                value={discountPorcent}
                disabled={true}
                onValueChange={values => validatingData(values.value, setDiscountPorcent)}
              />
            </div>
          </Grid>
          <Grid item md={12}>
            <div className="inputlabel">
              <p className="title">Observaciones del Producto</p>
              <textarea
                className="textarea"
                value={noteProduct}
                cols="30"
                rows="5"
                placeholder="Escriba Alguna Nota"
                onChange={e => setNoteProduct(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <div className="options">
              <div className="option">
                <label className="title">IVA</label>
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
              <Box display="flex" alignItems="center">
                Iva: <NumberFormat value={totalIVA} prefix="$ " thousandSeparator={true} displayType="text" />
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
          <Button className="btStyle confirmBt" onClick={saveChanges}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </EditProductStyle>
  );
}
