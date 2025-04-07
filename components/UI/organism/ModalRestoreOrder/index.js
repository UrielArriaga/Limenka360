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
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { handleGlobalAlert } from "../../../../utils";
import { api } from "../../../../services/api";
import { DialogContainer } from "../ModalDeleteOrder/styles";

export default function ModalRestoreOrder(props) {
  const { open, flag, setFlag, orders, handleClose } = props;
  const [loaderBack, setLoaderBack] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const restoreOrder = async () => {
    setLoaderBack(true);
    try {
      let deleteProspect = await api.put(`orders/reset/${orders?.id}`);
      if (deleteProspect.status == 200) {
        handleClose();
        handleGlobalAlert("success", "Pedidos -Pedido Restablecido!", "basic", dispatch, 6000);
        setValue("descarted", "");
        setFlag(!flag);
        setLoaderBack(false);
      }
    } catch (error) {
      setLoaderBack(false);
      handleGlobalAlert(
        "error",
        "Pedido - Ocurrio un problema - No se restablecio el pedido!",
        "basic",
        dispatch,
        6000
      );
      console.log(error);
    }
  };

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
          Se restablecera el pedido en tu registros.
        </DialogContentText>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button className="acept" onClick={() => restoreOrder()} type="submit" color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
