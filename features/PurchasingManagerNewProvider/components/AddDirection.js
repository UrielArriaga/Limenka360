import React, { useEffect, useState } from "react";
import { Button, Dialog, Grid } from "@material-ui/core";
import { EntitiesLocal } from "../../../BD/databd";
import { DialogContainer, DialogStyled } from "./styled";
import useAddDirection from "../hooks/useAddDirection";

export default function AddDirection({
  open,
  toggleModal,
  postalCode,
  setPostalCode,
  storedAddresses,
  setStoredAddresses,
}) {
  const {
    errors,
    register,
    handleSubmit,
    handleOnClickAdd,
    getEntitieCityByPostals,
    handleClose,
    selectedCity,
    selectedEntity,
    setSelectedCity,
    setSelectedEntity,
    loadCities,
    citiesByEntity,
    getCities,
  } = useAddDirection(toggleModal, postalCode, setPostalCode, storedAddresses, setStoredAddresses);

  return (
    <DialogStyled
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="add-direction-dialog-title"
      aria-describedby="add-direction-dialog-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Agregar Dirección</p>
        </div>

        <Grid container spacing={1} className="ctr_inputs">
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Calle <strong>*</strong>
                </p>
                {errors.street && <span className="alert">Requerido</span>}
              </div>
              <input placeholder="Calle" className="input_data" {...register("street", { required: true })} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Número exterior <strong>*</strong>
                </p>
                {errors.ext_number && <span className="alert">Requerido</span>}
              </div>
              <input
                className="input_data"
                placeholder="Número exterior"
                {...register("ext_number", {
                  required: "*Requerido",
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Número interior <strong>*</strong>
                </p>
                {errors.int_number && <span className="alert">Requerido</span>}
              </div>
              <input
                placeholder="Numero interior"
                className="input_data"
                {...register("int_number", { required: true })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Colonia <strong>*</strong>
                </p>
                {errors.settlement && <span className="alert">Requerido</span>}
              </div>
              <input placeholder="Colonia" className="input_data" {...register("settlement", { required: true })} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>Código Postal <strong>*</strong></p>
                {errors.postalcode && <span className="alert">Requerido</span>}
              </div>
              <input
                placeholder="Código postal"
                className="input_data"
                {...register("postalcode", {
                  required: true,
                  onChange: e => {
                    if (e.target.value.length === 5) {
                      getEntitieCityByPostals(e.target.value);
                    }
                  },
                })}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Estado <strong>*</strong>
                </p>{" "}
                {errors.entity && !selectedEntity && <span className="alert">Requerido</span>}
              </div>

              <select
                {...register("entity", { required: true })}
                id="entity"
                name="entity"
                className="input_data"
                value={selectedEntity ? selectedEntity.id : ""}
                onChange={e => {
                  const entity = EntitiesLocal.find(item => item.id === e.target.value);
                  setSelectedEntity(entity);
                  setSelectedCity(null);
                  getCities(e.target.value);
                }}
              >
                <option value="" disabled hidden>
                  Selecciona un Estado
                </option>
                {EntitiesLocal.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>Municipio <strong>*</strong></p>
                {errors.city && <span className="alert">Requerido</span>}
              </div>

              {loadCities ? (
                <select className="input_data">
                  <option>Obteniendo municipios....</option>
                </select>
              ) : (
                <select
                  {...register("city", { required: true })}
                  type="text"
                  name="city"
                  id="city"
                  value={selectedCity ? selectedCity.id : ""}
                  className="input_data"
                  onChange={e => {
                    const city = citiesByEntity.find(item => item.id === e.target.value);
                    setSelectedCity(city);
                  }}
                >
                  {selectedCity ? (
                    <option value={selectedCity.id} hidden>
                      {selectedCity.name}
                    </option>
                  ) : (
                    <option value="" hidden>
                      Selecciona un municipio
                    </option>
                  )}
                  {citiesByEntity?.map(item => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className="item">
              <div className="ContentTitleandAlert">
                <p>Referencias</p>
              </div>
              <input
                placeholder="Ingresa Referencias"
                className="input_data"
                {...register("references", {
                  required: false,
                })}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button variant="contained" onClick={handleClose} className="btn_cancel">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit(handleOnClickAdd)} className="btn_add" type="submit">
            Agregar
          </Button>
        </Grid>
      </DialogContainer>
    </DialogStyled>
  );
}
