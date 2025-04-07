import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContainer } from "./styles";
import { Button, Grid } from "@material-ui/core";

function ModalEdit({ showUpload, handleCloseEdit, register, setValue, handleSubmit, errors, dataToUpload, handleUpdateCategory }) {

  function Inputs() {
    return (
      <Grid spacing={1} container className="ctr_inputs">
        <Grid item xs={12} md={6}>
          <label className="ctr_inputs__label">Nombre *</label>
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            value={dataToUpload.name}
            onChange={e => {
              dataToUpload.setName(e.target.value);
              setValue("name", e.target.value);
            }}
            className={errors?.name?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Dialog
      open={showUpload}
      keepMounted
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <p className="title">Editar Categoría</p>
        {Inputs()}
        <Grid container className="ctr_buttons">
          <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="btn_upload"
              onClick={handleSubmit(handleUpdateCategory)}
          >
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  );
}

export default ModalEdit;
