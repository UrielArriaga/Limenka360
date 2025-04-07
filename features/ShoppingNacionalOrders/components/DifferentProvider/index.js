import { Button, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { DialogContainer } from "../PreviewOrder/styles";

export default function DifferentProvider({ currentProduct, openProviderWarningModal, setOpenProviderWarningModal }) {
  return (
    <DialogContainer open={openProviderWarningModal} onClose={() => setOpenProviderWarningModal(false)}>
      <DialogTitle className="title">Advertencia de Proveedor</DialogTitle>
      <DialogContent className="containerBody2">
        <p className="description">
          El producto <strong>{currentProduct?.product?.name}</strong> pertenece a proveedor{" "}
          <strong>{currentProduct?.product?.provider?.companyname}</strong>. Por favor, selecciona productos del mismo
          proveedor.
        </p>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="accept" onClick={() => setOpenProviderWarningModal(false)}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
