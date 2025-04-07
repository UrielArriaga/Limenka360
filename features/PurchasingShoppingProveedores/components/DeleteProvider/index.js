import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@material-ui/core";
import React from "react";
import { DialogContainer } from "./styled";

export default function DeleteProvider({
  openConfirmDelete,
  handleToggleDelete,
  deleteProvider,
  providerSelectedDelete,
  refetchData,
  providerSelected,
}) {
  const company = providerSelected?.item?.companyname;

  return (
    <DialogContainer
      open={openConfirmDelete}
      onClose={handleToggleDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        ¿Estás seguro de eliminar al proveedor {company}?
      </DialogTitle>
      <DialogContent className="containerBody">
        <DialogContentText className="DialogText" id="alert-dialog-description">
         <>
         Los datos del proveedor como:
          <br />
          <b> </b>
          <p>
            <b> *direcciones,</b>
          </p>
          <p>
            <b> *correos electrónicos</b>
          </p>
          <p>
            <b> *y números telefónicos</b>
          </p>
          <b> </b>
          <br />
          <p> se eliminarán por completo de sus registros. </p>
         </>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleToggleDelete} color="primary">
          Cancelar
        </Button>
        <Button
          className="acept"
          color="primary"
          autoFocus
          onClick={() => {
            deleteProvider(providerSelectedDelete); // Ejecuta la eliminación solo cuando se da clic en "Continuar"
            handleToggleDelete();
            refetchData();
          }} 
        >
          Continuar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
