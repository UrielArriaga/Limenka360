import React from "react";
import { AlertProviderStyle } from "../../styled";
import { Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";

export default function AlertHandleProvider({ open, close, validate }) {
  return (
    <AlertProviderStyle open={open} onClose={close}>
      <div className="content_alert">
        <p className="title_alert">
          <ErrorOutline /> Al Cambiar de Proveedor, se eliminaran los productos agregados a la tabla y se actualizaran
          datos y direcciones del proveedor. ¿Esta Seguro de Realizar esa Acción?
        </p>

        <div className="buttons">
          <Button className="bt cancel" onClick={() => validate(false)}>
            Cancelar
          </Button>
          <Button className="bt accept" onClick={() => validate(true)}>
            Aceptar
          </Button>
        </div>
      </div>
    </AlertProviderStyle>
  );
}
