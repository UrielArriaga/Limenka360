import React, { useEffect, useState } from "react";
import { Button, DialogActions, Input, Divider } from "@material-ui/core";
import { Dialog, Slide } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StylesDirectModalEditEvent } from "./styles";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalFinishPending({
  modalFinish,
  finishPending
}) {
  const { control, handleSubmit, reset, setValue, formState:{errors} } = useForm();

  useEffect(() => {});

  const onSubmitEdit = data => {
    finishPending(data);
    reset();
  };

  return (
    <Dialog
      open={modalFinish?.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        reset();
        modalFinish.closeModal();
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmitEdit)}>
        <StylesDirectModalEditEvent>
          <div className="title"></div>
          <h2>Finalizar Pendiente</h2>
          <Divider />
          <div className="contentForm">
            <div className="content_inputs">
              <p className="name_title">Razon: {errors?.reason ? (<span className="errorRequeried">* Requerido</span>):""}</p>
              <Controller
                name="reason"
                control={control}
                defaultValue=""
                rules={{required:true}}
                render={({ field }) => <Input placeholder="Agrega la Razon" className="input" {...field} />}
              />
              <p className="name_title">Comentario: {errors?.observations ? (<span className="errorRequeried">* Requerido</span>):""}</p>
              <Controller
                name="observations"
                control={control}
                defaultValue=""
                rules={{required:true}}
                render={({ field }) => (
                  <Input value={field.value || ""} placeholder="Agrega un comentario" className="input" {...field} />
                )}
              />
            </div>
            <DialogActions>
              <div className="btnActions">
                <Button
                  onClick={() => {
                    reset();
                    modalFinish.closeModal();
                  }}
                  color="primary"
                  size={"small"}
                  className="button cancel"
                >
                  Cancelar
                </Button>
                <Button size={"small"} type="submit" color="primary" className="button finish">
                  Finalizar
                </Button>
              </div>
            </DialogActions>

          </div>
        </StylesDirectModalEditEvent>
      </form>
    </Dialog>
  );
}
