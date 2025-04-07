import React from "react";

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import { DialogContainer } from "../../styled";

export default function AlertHandleProvider({ open, close, validate }) {
  return (
    <DialogContainer
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        {"¿Estas seguro de esto?"}
      </DialogTitle>
      <DialogContent className="containerBody">
        <ErrorOutline />
        <DialogContentText className="DialogText" id="alert-dialog-description">
          Al Cambiar de Proveedor, se eliminaran los productos agregados a la tabla , se actualizaran datos y
          direcciones del proveedor.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="bt cancel" onClick={() => validate(false)}>
          Cancelar
        </Button>

        <Button className="bt accept" onClick={() => validate(true)}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
