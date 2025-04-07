import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { Replay } from "@material-ui/icons";
import { useRouter } from "next/router";
import { handleGlobalAlert } from "../../utils";
import { ConfirmRestore, RestoreProspectStyle } from "./style";
import { api } from "../../services/api";

export default function ModalRestoreProspect(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { prospect, isShow, refetch } = props;
  const [openConfirmRestore, setOpenConfirmRestore] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleCloseConfirmRestore = () => setOpenConfirmRestore(false);
  const restoreProspect = async () => {
    setisLoading(true);
    try {
      let update = {};
      update.status = 1;
      update.discarted = false;
      update.discartedreason = "";
      update.discartedbyId = null;
      update.reasonId = null;
      update.deletedAt = null;
      let response = await api.put(`prospects/resetprospect/${prospect.id}`, update);
      handleGlobalAlert("success", "Prospecto - Restablecido!", "basic", dispatch, 6000);
      setTimeout(() => {
        router.push({ pathname: "/prospectos/" });
      }, [2000]);
    } catch (error) {
      setisLoading(false);
      handleGlobalAlert("error", "Ocurrió un problema - No se restableció el prospecto!", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  if (!isShow) return <></>;
  return (
    <RestoreProspectStyle>
      <div className="container">
        <Button className="button_restore" onClick={() => setOpenConfirmRestore(true)} startIcon={<Replay />}>
          Restaurar Prospecto
        </Button>
      </div>
      <ConfirmRestore open={openConfirmRestore} onClose={handleCloseConfirmRestore}>
        <div className="head">
          <p className="title_head">Restablecer Prospecto</p>
          {isLoading && <CircularProgress className="loading" size={25} />}
        </div>
        <div className="body">
          <p className="text"> Se restablecerá el prospecto en tu registros</p>
          <Grid className="data_prospect" spacing={1} container={true}>
            <Grid item={true} md={6}>
              <p className="title">Nombre del Prospecto</p>
              <p className="data capitalize">{prospect.fullname}</p>
            </Grid>
            <Grid item={true} md={6}>
              <p className="title">Contacto</p>
              <p className="data">{prospect.phone}</p>
            </Grid>
            <Grid item={true} md={12}>
              <p className="title">Correo</p>
              <p className="data">{prospect.email}</p>
            </Grid>
          </Grid>
        </div>
        <div className="footer">
          <div className="buttons">
            <Button className="cancel" disabled={isLoading} onClick={handleCloseConfirmRestore} color="primary">
              Cancelar
            </Button>
            <Button
              className="acept"
              disabled={isLoading}
              onClick={() => restoreProspect()}
              type="submit"
              color="primary"
              autoFocus
            >
              Aceptar
            </Button>
          </div>
        </div>
      </ConfirmRestore>
    </RestoreProspectStyle>
  );
}
