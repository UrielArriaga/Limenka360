import React, { useState } from "react";
import { ShipmentStyle } from "./style";
import { Button, Checkbox, Grid, Input } from "@material-ui/core";
import NumberFormat from "react-number-format";
export default function Shipment(props) {
  const { open, close, shipment, setShipment, saveChange } = props;
  const [iva, setIva] = useState(false);
  const handleEditCallAmount = value => {
    let totalIVA = iva ? Number(value) * 0.16 : 0;
    let total = iva ? Number(value) * 1.16 : Number(value);
    setShipment({
      ...shipment,
      callamount: Number(value),
      totalWithoutIva: Number(value),
      iva: totalIVA,
      total: total,
      singleiva: totalIVA,
    });
  };
  const handleChangeIVA = event => {
    let isIVA = event.target.checked;
    let totalIVA = isIVA ? Number(shipment.callamount) * 0.16 : 0;
    let total = isIVA ? Number(shipment.callamount) * 1.16 : Number(shipment.callamount);
    setIva(isIVA);
    setShipment({
      ...shipment,
      iva: totalIVA,
      total: total,
      singleiva: totalIVA,
    });
  };
  return (
    <ShipmentStyle open={open} onClose={close}>
      <div className="shipment_container">
        <div className="shipment_container__head">
          <p className="title_head" onClick={() => console.log("datos", shipment)}>
            Agregar o Editar Envió
          </p>
        </div>
        <Grid className="shipment_container__body" container={true} spacing={2}>
          <Grid item={true} md={6}>
            <p className="title">Código</p>
            <input className="data" type="text" value={shipment?.code} readOnly={true} disabled={true} />
          </Grid>
          <Grid item={true} md={6}>
            <p className="title">Marca</p>
            <input className="data" type="text" value={shipment?.name} readOnly={true} disabled={true} />
          </Grid>
          <Grid item={true} md={6}>
            <p className="title">Gastos de Envío</p>
            <NumberFormat
              prefix="$"
              thousandSeparator=","
              className="data"
              value={shipment.callamount}
              onValueChange={e => handleEditCallAmount(e.value)}
            />
          </Grid>
          <Grid item={true} md={6}>
            <p className="title">IVA</p>
            <Checkbox checked={iva} onChange={handleChangeIVA} color="primary" />
          </Grid>
          <Grid className="totals" item={true} md={12}>
            <p className="data_totals">
              IVA
              <NumberFormat
                className="amount"
                displayType="text"
                value={shipment.iva}
                thousandSeparator=","
                prefix="$"
                defaultValue={0}
                decimalScale={2}
              />
            </p>
            <p className="data_totals">
              Subtotal
              <NumberFormat
                className="amount"
                displayType="text"
                value={shipment.totalWithoutIva}
                thousandSeparator=","
                prefix="$"
                defaultValue={0}
                decimalScale={2}
              />
            </p>
            <p className="data_totals">
              Total
              <NumberFormat
                className="amount"
                displayType="text"
                value={shipment.total}
                thousandSeparator=","
                prefix="$"
                defaultValue={0}
                decimalScale={2}
              />
            </p>
          </Grid>
        </Grid>
        <div className="shipment_container__footer">
          <div className="buttons">
            <Button className="save_bt">Guardar Cambios</Button>
            <Button className="cancel_bt">Cancelar</Button>
          </div>
        </div>
      </div>
    </ShipmentStyle>
  );
}
