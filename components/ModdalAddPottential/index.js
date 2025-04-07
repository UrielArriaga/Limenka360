import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { DialogContainer } from "./styles";
import { handleGlobalAlert } from "../../utils";
import { api } from "../../services/api";

export default function ModalAddPotential({ open, close, toggle, setFlag, flag, oportunity }) {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const dispatch = useDispatch();

  const handleAddPottential = async () => {
    setLoaderComplete(true);
    try {
      let responserejectedRestore = await api.put(`prospects/${oportunity?.prospectId}`, { isclientpotencial: true });
      if (responserejectedRestore.status === 200) {
        handleGlobalAlert(
          "success",
          "El prospecto se marco como cliente potencial correctamente",
          "basic",
          dispatch,
          6000
        );
        toggle();
        setFlag(!flag);
        setLoaderComplete(false);
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert(
        "error",
        "opotunidad -ocurrio un error al marcar como cliente potencial",
        "basic",
        dispatch,
        6000
      );
      setLoaderComplete(false);
    }
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">¿Estas seguro de esto?</p>
          {loaderComplete && <CircularProgress className="headerDialog__loader" />}
        </div>
        <Grid spacing={1} container className="ctr_inputs">
          <p className="title">El Prospecto se marcara como cliente potencial</p>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button
            disabled={loaderComplete}
            variant="contained"
            className={`btn_cancel ${loaderComplete && "disabled"}`}
            onClick={() => close()}
          >
            Cancelar
          </Button>
          <Button
            disabled={loaderComplete}
            variant="contained"
            className={`btn_upload ${loaderComplete && "disabled"}`}
            onClick={handleAddPottential}
          >
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  );
}
