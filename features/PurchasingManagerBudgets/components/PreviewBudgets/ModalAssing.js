import React from "react";
import { DialogContainer } from "./styles";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export default function ModalAssing({ open, toggleAssing, loaderBack, dataBudgetAssing, UpdateBudgetAllocation }) {
  console.log("dataBudgetAssing", dataBudgetAssing?.folio);
  return (
    <DialogContainer
      open={open}
      onClose={toggleAssing}
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
          El presupuesto con folio <strong> {dataBudgetAssing?.folio} </strong>
          te será asignado , lo que significa que nadie más podrá hacer uso de él. Es importante que lo administres de
          manera eficiente.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={toggleAssing} color="primary">
          Cancelar
        </Button>
        <Button
          className="acept"
          onClick={() => UpdateBudgetAllocation(dataBudgetAssing)}
          type="submit"
          color="primary"
          autoFocus
        >
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
