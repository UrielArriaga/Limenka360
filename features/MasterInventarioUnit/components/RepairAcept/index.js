import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { Button } from "@material-ui/core";
import { DialogContainer } from "./styled";

export default function RepairAcept({
  open = true,
  handletoogle,
  handleRepair,
  productInventorySelected,
  isFetchingDataId,
}) {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handletoogle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">¿Estas seguro de esto?</p>
        </div>
        <div className="ctr_body">
          <p className="title">El articulo se marcara en reparación {productInventorySelected?.name}</p>
        </div>
        <div className="ctr_buttons">
          <Button
            variant="contained"
            className={`btn_cancel ${isFetchingDataId && "disabled"}`}
            onClick={() => handletoogle()}
            disabled={isFetchingDataId}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={isFetchingDataId}
            className={`btn_upload ${isFetchingDataId && "disabled"}`}
            onClick={() => handleRepair(productInventorySelected)}
          >
            Guardar
          </Button>
        </div>
      </DialogContainer>
    </Dialog>
  );
}
