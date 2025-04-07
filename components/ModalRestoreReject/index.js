import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, Grid } from "@material-ui/core";

import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { DialogContainer } from "./styles";
import { handleGlobalAlert } from "../../utils";
import { createNewTracking } from "../../redux/slices/trackingSlice";

export default function ModalRestoreReject({ open, close, toggleRejected, setFlag, flag, oportunity }) {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const { id_user, roleId } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleRejectedRestore = async () => {
    setLoaderComplete(true);
    try {
      let data = 1;
      let bodyNewTracking = {
        prospectId: oportunity?.prospectId,
        status: "2",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunity?.id,
        reason: `Seguimiento Automatico`,
        observations: `La Cotización ${oportunity?.concepto} se quito de Rechazadas`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let responserejectedRestore = await api.put(`oportunities/restorevalues/${oportunity.id}/${data}`);
      if (responserejectedRestore.status === 200) {
        handleGlobalAlert("success", "El estatus de la oportunidad cambio", "basic", dispatch, 6000);
        toggleRejected();
        setFlag(!flag);
        setLoaderComplete(false);
        dispatch(
          createNewTracking({
            data: bodyNewTracking,
          })
        );
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Oportunidad - ocurrio un error  ", "basic", dispatch, 6000);
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
          <p className="title">La cotización {oportunity?.concepto} se quitara de rechazadas</p>
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
            onClick={handleRejectedRestore}
          >
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  );
}
