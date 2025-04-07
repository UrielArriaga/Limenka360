import React, { useEffect } from "react";

import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@material-ui/core";
import { ErrorOutline, Note } from "@material-ui/icons";
import { DialogContainer } from "../../styles";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
export default function ModalStatusOrder({
  open,
  close,
  handleReject,
  toggleModalRejected,
  setRejectedOptionSelected,
}) {
  const { getCatalogBy } = useGlobalCommons();
  const { statusOrders } = useSelector(commonSelector);

  return (
    <DialogContainer
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        {"Cambiar estatus."}
      </DialogTitle>
      <DialogContent className="containerBody">
        <Grid container>
          <Grid item md={12}>
            <div className="column">
              <div className="row">
                <Note />
                <p className="label">Estatus</p>
              </div>

              <Select
                onMenuOpen={() => getCatalogBy("statusOrders")}
                loadingMessage={() => "Cargando Opciones..."}
                maxMenuHeight={110}
                className="dialogContainer__item__select"
                isClearable={true}
                placeholder="Selecciona una opción"
                isLoading={statusOrders?.isFetching}
                options={statusOrders?.results}
                onChange={e => setRejectedOptionSelected(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
              />
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="bt cancel" onClick={() => toggleModalRejected()}>
          Cancelar
        </Button>

        <Button className="bt accept" onClick={() => handleReject()}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
