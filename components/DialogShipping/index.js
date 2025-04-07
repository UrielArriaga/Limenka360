import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { EntitiesLocal } from "../../BD/databd";
import { toUpperCaseChart } from "../../utils";
import { DialogContainer } from "./styles";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { Error } from "../../styles/Propectos/NewProspect";
export default function ModalShipping({ open, setOpen, mapEnvio, setMapEnvio }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const { userData, id_user, company } = useSelector(userSelector);
  const [city, setCity] = useState("");
  const [entity, setEntity] = useState("");
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [loadCities, setLoadCities] = useState(false);
  const [flag, setFlag] = useState(false);
  const [nameFolio, setNameFolio] = useState(`${userData.username}-`);
  const [folioFin, setFolioFin] = useState("");
  const handleAddShopping = async formData => {
    try {
      let data = [
        ...mapEnvio,
        {
          folio: nameFolio + watch("folioShipping"),
          receive: formData.receive,
          phone: formData.phone,
          street: formData.street,
          ext_number: formData.ext_number,
          int_number: formData.int_number,
          cologne: formData.cologne,
          postalId: postalCode,
          entityId: formData.entity,
          cityId: formData.city,
          references: formData.references,
        },
      ];
      setMapEnvio(data);
      cleanFormEnvio();
    } catch (error) {
      console.log(error);
    }
  };

  const getEntitieCityByPostals = async (code, title) => {
    let where = JSON.stringify({
      postal_code: code,
    });
    try {
      let postals = await api.get(`/postals?where=${where}&include=city,city.entity`);
      if (postals.data.results.length > 0) {
        setPostalCode(postals.data.results[0].id);
        setEntity(postals?.data?.results[0]?.city?.entity?.id);
        setValue("entity", postals?.data?.results[0]?.city?.entity?.id);
        setCity(postals?.data?.results[0]?.city);
        setValue("city", postals?.data?.results[0]?.city.id);
        getCities(postals?.data?.results[0]?.city?.entity?.id, "direction");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCities = async (entityId, title) => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1001`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const cleanFormEnvio = () => {
    setValue("folioShipping", "");
    setValue("receive", "");
    setValue("street", "");
    setValue("int_number", "");
    setValue("ext_number", "");
    setValue("postalcode", "");
    setValue("entity", "");
    setValue("city", "");
    setEntity("");
    setCity("");
    setValue("phone", "");
    setValue("references", "");
    setValue("cologne", "");
    setOpen(false);
    setFlag(!flag);
  };

  const handleSelectCity = item => {
    if (item === "") {
      setCity({});
    } else {
      setCity(item);
      setValue("city", item.id);
    }
  };
  const handleSelectEntities = id => {
    setEntity(id);
    setCity({});
    getCities(id, "direction");
    setValue("entity", id);
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="containerTitle">
          <p className="title">Agregar Dirección de Envio</p>
          <Close onClick={() => setOpen(!open)} />
        </div>
        <form onSubmit={handleSubmit(handleAddShopping)}>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Folio *</label>
                {errors.folioShipping && <p>{errors.folioShipping?.message}</p>}
              </div>
              <div className="folio">
                <p className="folioUser">{nameFolio}</p>
                <input
                  {...register("folioShipping", {
                    required: "Requerido",
                    maxLength: {
                      value: 6,
                      message: "6 Caracteres",
                    },
                    minLength: {
                      value: 6,
                      message: "6 Caracteres",
                    },
                  })}
                  id="folioShipping"
                  type="text"
                  name="folioShipping"
                  placeholder="Ingresa 6 Caracteres"
                  className={
                    errors?.folioShipping?.type === "required"
                      ? "ctr_inputs__inputFolio error"
                      : "ctr_inputs__inputFolio"
                  }
                />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Recibe *</label>
                {errors.receive && <p>{errors.receive?.message}</p>}
              </div>

              <input
                {...register("receive", { required: "Requerido" })}
                id="receive"
                type="text"
                name="receive"
                placeholder="Recibe"
                className={errors?.receive?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Telefono * </label>
                {errors.phone && <p>{errors.phone?.message}</p>}
              </div>

              <input
                {...register("phone", {
                  required: "Requerido",
                  maxLength: {
                    value: 10,
                    message: "10 Caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "10 Caracteres",
                  },
                  pattern: {
                    value: /[0-9]+/i,
                    message: "Caracter Invalido",
                  },
                })}
                id="phone"
                type="number"
                name="phone"
                placeholder="Telefono"
                className={errors?.phone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Calle *</label>
                {errors.street && <p>{errors.street?.message}</p>}
              </div>
              <input
                {...register("street", { required: "Requerido" })}
                id="street"
                type="text"
                name="street"
                placeholder="Calle"
                className={errors?.street?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Numero Exterior *</label>
                {errors.ext_number && <p>{errors.ext_number?.message}</p>}
              </div>

              <input
                {...register("ext_number", { required: "Requerido" })}
                id="ext_number"
                type="text"
                name="ext_number"
                placeholder="Numero Exterior"
                className={errors?.ext_number?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Numero Interior *</label>
                {errors.int_number && <p>{errors.int_number?.message}</p>}
              </div>
              <input
                {...register("int_number", { required: "Requerido" })}
                id="int_number"
                type="text"
                name="int_number"
                placeholder="Numero Interior"
                className={errors?.int_number?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Colonia *</label>
                {errors.cologne && <p>{errors.cologne?.message}</p>}
              </div>

              <input
                {...register("cologne", { required: "Requerido" })}
                id="cologne"
                type="text"
                name="cologne"
                placeholder="Colonia"
                className={errors?.cologne?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Codigo Postal *</label>
                {errors.postalcode && <p>{errors.postalcode?.message}</p>}
              </div>
              <input
                {...register("postalcode", {
                  required: "Requerido",
                  onChange: e => {
                    if (e.target.value.length === 5) {
                      getEntitieCityByPostals(e.target.value, "");
                    }
                  },
                })}
                id="postalcode"
                type="text"
                name="postalcode"
                placeholder="Codigo Postal"
                className={errors?.postalcode?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Estado *</label>

              <Controller
                name="entity"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona un Estado"
                    options={EntitiesLocal}
                    isClearable={true}
                    onChange={e => (e === null ? handleSelectEntities("") : handleSelectEntities(e.id))}
                    value={EntitiesLocal.filter(item => item.id === entity)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Municipio *</label>
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona un Municipio"
                    options={citiesByEntity !== null ? citiesByEntity : []}
                    isClearable={true}
                    isLoading={loadCities}
                    onChange={e => (e === null ? handleSelectCity("") : handleSelectCity(e))}
                    value={citiesByEntity?.filter(item => item.id === city.id)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="alertRequired">
                <label className="ctr_inputs__label">Referencias *</label>
                {errors.references && <p>{errors.references?.message}</p>}
              </div>

              <input
                {...register("references", { required: "Requerido" })}
                id="references"
                type="text"
                name="references"
                placeholder="Ingresar Referencias"
                className={errors?.references?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              variant="contained"
              color="secondary"
              className="btn_cancel"
              onClick={() => {
                cleanFormEnvio();
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit" className="btn_upload">
              Guardar
            </Button>
          </Grid>
        </form>
      </DialogContainer>
    </Dialog>
  );
}
