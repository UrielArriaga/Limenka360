import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { DialogContainer } from "./styles";

export default function ModalProductDelete(props) {
  const { open, handleClose, productSelected, DeleteProduct, loaderBack } = props;

  return (
    <DialogContainer
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        <div className="titleLoader">
          {"¿Estas seguro de esto?"}
          {loaderBack && (
            <div className="containerLoader">
              <CircularProgress color="inherit" size={24} />
            </div>
          )}
        </div>
      </DialogTitle>
      <DialogContent className="containerBody">
        <DialogContentText className="DialogText" id="alert-dialog-description">
          El producto con codigo {productSelected?.product?.code} se eliminara del presupuesto
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button className="acept" onClick={() => DeleteProduct()} type="submit" color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
