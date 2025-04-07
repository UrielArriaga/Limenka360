import { Button, Dialog, DialogActions, Divider, Slide } from "@mui/material";
import React from "react";
import { StylesUnifierOrder } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalUnifierOrder({
  openModalGaranties,
  closeModalGaranties,
  handleAddGaranties,
  UnifyOrders,
  isValid,
  rowSelected,
}) {
  return (
    <Dialog
      open={openModalGaranties}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeModalGaranties}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StylesUnifierOrder>
        <h3>Unificar Ordenes de Compra</h3>
        <div className="note">
          <h4>Nota:</h4>
          <p>Por favor, asegúrate de cumplir con las siguientes condiciones antes de continuar:</p>
          <ol style={{}}>
            <li>
              <strong>Identificador válido:</strong> Todos los elementos seleccionados deben tener el identificador{" "}
              <b className="container_identifier">{"borrador"}</b>.
            </li>
            <li>
              <strong>Proveedor consistente:</strong> Todos los elementos seleccionados deben pertenecer al mismo
              proveedor. Si seleccionas un elemento con un proveedor diferente, no será permitido.
            </li>
          </ol>
          <p>Si alguna de estas condiciones no se cumple, se mostrará un mensaje de error y no podrás continuar.</p>
        </div>
        <Divider></Divider>
        <div className="orders">
          <h4>Ordenes:</h4>
          <div className="headers">
            <b>Folio</b>
            <b>Proveedor</b>
            <b>Identificador</b>
          </div>
          {rowSelected.map(item => {
            return (
              <div key={item.id} className="body">
                <p>{item.folio}</p>
                <p>{item.proveedor}</p>
                <p>{item.identifier}</p>
              </div>
            );
          })}
        </div>
        <DialogActions>
          <Button onClick={closeModalGaranties} color="primary" className="button">
            Cancelar
          </Button>
          <Button onClick={()=> UnifyOrders()} color="primary" className="button">
            Unificar
          </Button>
        </DialogActions>
      </StylesUnifierOrder>
    </Dialog>
  );
}
