import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import { Button } from "@material-ui/core";
import { ReserveDialogContainer } from "./styles";

export default function ReserveArticle({
  open = true,
  handletoogle,
  handleReserve,
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
      <ReserveDialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">¿Estas seguro de esto?</p>
        </div>
        <div className="ctr_body">
          <p className="title">El articulo se colocara en <b>Apartado</b> {productInventorySelected?.name}</p>
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
            onClick={() => handleReserve(productInventorySelected)}
          >
            Apartar
          </Button>
        </div>
      </ReserveDialogContainer>
    </Dialog>
  );
}
