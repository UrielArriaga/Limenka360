import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React from "react";
import { DialogContainer } from "./styled";

export default function DeleteProvider(props) {
  const { openConfirmDelete, handleToggleDelete, deleteProvider } = props;

  return (
    <DialogContainer
      open={openConfirmDelete}
      onClose={handleToggleDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        {"¿Estas seguro de esto?"}
      </DialogTitle>
      <DialogContent className="containerBody">
        <DialogContentText className="DialogText" id="alert-dialog-description">
          El proovedor y sus direcciones correspondientes se eliminaran por completo de sus registros
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleToggleDelete} color="primary">
          Cancelar
        </Button>

        <Button className="acept" type="submit" color="primary" autoFocus onClick={deleteProvider}>
          Continuar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
