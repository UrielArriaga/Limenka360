import React, { useEffect, useState } from "react";
import { Button, Dialog, Grid } from "@material-ui/core";
import { DialogContainer, DialogStyled } from "./styles";

export default function AddContact({
  open,
  toggleModal,
  relations,
  setSelectRelation,
  handleAddContact,
  stateHookForm
}) {
  const { register, errors, handleSubmit } = stateHookForm;

  return (
    <DialogStyled
      open={open}
      keepMounted
      onClose={toggleModal}
      aria-labelledby="add-direction-dialog-title"
      aria-describedby="add-direction-dialog-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Agregar Contactos de Proveedor</p>
        </div>

        <Grid container spacing={1} className="ctr_inputs">
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Nombre <strong>*</strong>
                </p>
                {errors.name && <span className="alert">Requerido</span>}
              </div>
              <input placeholder="nombre" className="input_data" {...register("name", { required: true })} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Apellidos <strong>*</strong>
                </p>
                {errors.lastname && <span className="alert">Requerido</span>}
              </div>
              <input
                className="input_data"
                placeholder="apellidos"
                {...register("lastname", {
                  required: "*Requerido",
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Correo <strong>*</strong>
                </p>
                {errors.email && <span className="alert">Requerido</span>}
              </div>
              <input
                type="email"
                placeholder="Correo"
                className="input_data"
                {...register("email", { required: true })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Telefono <strong>*</strong>
                </p>
                {errors.phone && <span className="alert">Requerido</span>}
              </div>
              <input placeholder="Telefono" className="input_data" {...register("phone", { required: true })} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>Telefono Opcional</p>
              </div>
              <input
                placeholder="Telefono Opcional"
                className="input_data"
                {...register("optionalophone", { required: false })}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Parentesco <strong>*</strong>
                </p>{" "}
                {errors.relation && <span className="alert">Requerido</span>}
              </div>

              <select
                {...register("relation", { required: true })}
                id="relation"
                name="relation"
                className="input_data"
                // value={selectedEntity ? selectedEntity.id : ""}
                onChange={e => setSelectRelation(e)}
              >
                <option value="" disabled hidden>
                  Selecciona el Parentesco
                </option>
                {relations.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>Observaciones</p>
              </div>
              <input
                placeholder="Observaciones"
                className="input_data"
                {...register("observations", {
                  required: false,
                })}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button variant="contained" onClick={() => toggleModal()} className="btn_cancel">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit(handleAddContact)} className="btn_add" type="submit">
            Agregar
          </Button>
        </Grid>
      </DialogContainer>
    </DialogStyled>
  );
}
