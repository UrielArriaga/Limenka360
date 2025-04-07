import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Button, Grid } from "@material-ui/core";
import { DialogAddContainer, Error } from "./styles";
import { useForm } from "react-hook-form";

function FormAddCategory({ open, toggleModal, setName, createNewCategory }) {

  const { register, setValue, handleSubmit, formState: {errors} } = useForm();
  function Inputs() {
    return (
      <Grid spacing={1} container className="ctr_inputs">
        <label className="ctr_inputs__label">Nombre de la categoria * { errors?.name && errors?.name?.type == "required" && <Error>Campo Requerido</Error>} </label>
        <Grid item xs={12} md={6}>
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            onChange={e => {
              setName(e.target.value);
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
      open={open}
      keepMounted
      onClose={toggleModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogAddContainer>
        <p className="title">Crear Categoría</p>
        {Inputs()}
        <Grid container className="ctr_buttons">
          <Button variant="contained" color="secondary" className="btn_cancel" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="btn_upload"
            onClick={handleSubmit(createNewCategory)}
          >
            Guardar
          </Button>
        </Grid>
      </DialogAddContainer>
    </Dialog>
  );
}

export default FormAddCategory;
