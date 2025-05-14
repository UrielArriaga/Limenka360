import React, { useState, useEffect } from "react";
import { Drawer, Button, Grid, Box, IconButton } from "@material-ui/core";
import Select from "react-select";

import { Info, LocationOn, Person, Close } from "@material-ui/icons";
import { toast } from "react-toastify";
import useProspectDetails from "../../hooks/useEditProspect";
import { api } from "../../../../services/api";
import { toUpperCaseChart } from "../../../../utils";
import { DrawerContent, TypographyStyled, SectionTitle } from "./style";
import { Controller } from "react-hook-form";
import { EntitiesLocal } from "../../../../BD/databd";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { relative } from "path";

export default function EditProspectDrawer({ open, onClose, prospect }) {
  const {
    data,
    originalEmail,
    originalPhone,
    loading,
    registerForm,
    citiesByEntity,
    getCitiesByEntity,
    hasError,
    setValueForm,
    controlForm,

    resetForm,
    getValues,
    getEntitieCityByPostals,
    postalInfo,
  } = useProspectDetails(prospect?.id, open);

  const handleSelectValue = (e, name) => {
    if (e === "" || e === null) {
      setValueForm(name, "");
    } else {
      setValueForm(name, e.id);
    }

    if (name === "entityId") {
      getCitiesByEntity(e.id);
    }
  };
  const { getCatalogBy } = useGlobalCommons();
  const {
    phases,
    clientTypes,
    origins,
    specialties,
    categories,
    channels,
    users,
    clientsCompanies,
  } = useSelector(commonSelector);
  useEffect(() => {
    if (open) {
      getCatalogBy("origins");
      getCatalogBy("phases");
      getCatalogBy("clientTypes");
      getCatalogBy("specialties");
      getCatalogBy("categories");
      getCatalogBy("channels");
      getCatalogBy("clientsCompanies");
      getCatalogBy("users");
    }
  }, [open]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      const normalized = {
        ...data,
        postal_code: data?.postal?.postal_code || "",
        cityId: data?.city?.id || "",

        settlement: data?.postal?.settlement || "",
        product: data.product || "",
      };
      resetForm(normalized);
    }
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const values = getValues();

      const postalId = values.postal_code?.id || values.postalId;

      const payload = {
        name: values.name || "",
        lastname: values.lastname || "",
        phone: values.phone || "",
        email: values.email || "",
        gender: values.gender || "",
        optionalphone: values.optionalphone || "",
        job: values.job || "",
        title: values.title || "",
        street: values.street || "",
        originId: values.originId?.toString() || "",
        clientCompanyId: values.clientCompanyId?.toString() || "",
        entityId: values.entityId?.toString() || "",
        cityId: values.cityId?.toString() || "",
        categoryId: values.categoryId?.toString() || "",
        product: values.product || "",
        postalId: postalId?.toString() || "",
        settlement: values.settlement || "",
        clientTypeId: values.clientTypeId?.toString() || "",
        phaseId: values.phaseId?.toString() || "",
        specialtyId: values.specialtyId?.toString() || "",
        facebook: values.facebook || "",
        observations: values.observations || "",
        url: values.url || "",
        location: values.location || "",
        channelId: values.channelId?.toString() || "",
      };

      if (values.email === originalEmail) {
        delete payload.email;
      }
      if (values.phone === originalPhone) {
        delete payload.phone;
      }

      await api.put(`prospects/${prospect.id}`, payload);
      onClose();
      if (onSaved) onSaved(); // Asegúrate de que 'onSaved' está definida en el componente
    } catch (error) {
      if (error.response?.data.internalCode === "47582") {
        toast.error("El correo o telefono ya existe!");
      } else {
        console.error("Error al guardar el prospecto", error);
      }
    } finally {
      setSaving(false);
    }
  };

  // Definir la función onSaved
  const onSaved = () => {
    console.log("Prospecto guardado correctamente");
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <DrawerContent>
        <div>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={2}
            position={relative}
          >
            <TypographyStyled variant="h6">
              <Person className="section-icon-person" />
              Editar Prospecto
            </TypographyStyled>

            <Button
              onClick={handleSave}
              variant="contained"
              className="btn_upload2"
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
            <IconButton className="close-button" onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SectionTitle className="first-section">
                <Info className="section-icon-info" />
                Información Personal
              </SectionTitle>
            </Grid>
            <Grid item xs={12} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Nombre <strong>*</strong>
                </p>
                {hasError("name") && <ErrorMessage />}
              </div>
              <input
                placeholder="Nombre del prospecto"
                className="input capitalize"
                {...registerForm("name", {
                  required: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={4} className="item">
              <p>Apellido</p>
              <input
                placeholder="Apellido"
                className="input capitalize"
                {...registerForm("lastname", {
                  required: false,
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>Correo</p>
                {hasError("email") && (
                  <ErrorMessage message={errorsForm.email?.message} />
                )}
              </div>
              <input
                placeholder="ejemplo@gmail.com "
                {...registerForm("email", {})}
                className="input"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>Teléfono</p>
                {hasError("phone") && (
                  <ErrorMessage message={errorsForm.phone?.message} />
                )}
              </div>
              <input
                {...registerForm("phone")}
                placeholder="Digíte número a 10 dígitos "
                className="input"
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Teléfono opcional</p>
              <input
                type="number"
                {...registerForm("optionalphone")}
                placeholder="Digíte número a 10 dígitos "
                className="input"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Género</p>
              <Controller
                name="gender"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={Genders.find((c) => c.id === field.value)}
                    onChange={(e) => handleSelectValue(e, "gender")}
                    placeholder="Selecciona una Opción"
                    options={Genders}
                    isClearable={true}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.label)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Empresa</p>
              <Controller
                name="clientCompanyId"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable={true}
                    isLoading={clientsCompanies.isFetching}
                    value={clientsCompanies.results.filter(
                      (c) => c.id === field.value
                    )}
                    onChange={(e) => handleSelectValue(e, "clientCompanyId")}
                    placeholder="Selecciona una Opción"
                    options={clientsCompanies.results}
                    onMenuOpen={() => getCatalogBy("clientsCompanies")}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.companyname)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Puesto</p>
              <input
                placeholder="Puesto"
                className="input"
                {...registerForm("job")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Título</p>
              <input
                {...registerForm("title")}
                className="input"
                placeholder="Ingrese un título"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Tipo de cliente <strong>*</strong>
                </p>
                {hasError("clientTypeId") && <ErrorMessage />}
              </div>

              <Controller
                control={controlForm}
                name="clientTypeId"
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={clientTypes.results}
                    onMenuOpen={() => getCatalogBy("clientTypes")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={clientTypes.isFetching}
                    onChange={(e) => handleSelectValue(e, "clientTypeId")}
                    value={clientTypes.results.find(
                      (c) => c.id === field.value
                    )}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>Especialidad</p>
              </div>
              <Controller
                control={controlForm}
                name="specialtyId"
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={specialties.results}
                    isLoading={specialties.isFetching}
                    onMenuOpen={() => getCatalogBy("specialties")}
                    loadingMessage={() => "Cargando Opciones..."}
                    placeholder="Selecciona una Opción"
                    onChange={(e) => handleSelectValue(e, "specialtyId")}
                    value={specialties.results.find(
                      (c) => c.id === field.value
                    )}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>Origen</p>
                <strong>*</strong>
              </div>
              <Controller
                control={controlForm}
                name="originId"
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onMenuOpen={() => getCatalogBy("origins")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={origins.isFetching}
                    options={origins.results}
                    onChange={(e) => handleSelectValue(e, "originId")}
                    value={origins.results.find((o) => o.id === field.value)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Fase <strong>*</strong>
                </p>
                {hasError("phaseId") && <ErrorMessage />}
              </div>

              <Controller
                control={controlForm}
                name="phaseId"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={phases.results}
                    onMenuOpen={() => getCatalogBy("phases")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={phases.isFetching}
                    onChange={(e) => handleSelectValue(e, "phaseId")}
                    value={phases.results.find((c) => c.id === field.value)}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Canal</p>

              <Controller
                name="channelId"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={channels.results.filter((c) => c.id === field.value)}
                    onChange={(e) => handleSelectValue(e, "channelId")}
                    isLoading={channels.isFetching}
                    onMenuOpen={() => getCatalogBy("channels")}
                    loadingMessage={() => "Cargando Opciones..."}
                    placeholder="Selecciona una Opción"
                    options={channels.results}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Categoria de interes</p>
              <Controller
                name="categoryId"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={categories.results.filter(
                      (c) => c.id === field.value
                    )}
                    onChange={(e) => handleSelectValue(e, "categoryId")}
                    placeholder="Selecciona una Opción"
                    options={categories.results}
                    onMenuOpen={() => getCatalogBy("categories")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={categories.isFetching}
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Código de Producto</p>
              <input
                placeholder="Código"
                className="input"
                {...registerForm("product")}
                disabled={!!getValues("product")}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12} className="item">
              <p>Comentarios</p>
              <input
                placeholder="Comentarios"
                className="input"
                {...registerForm("observations")}
              />
            </Grid>
          </Grid>

          <SectionTitle>
            <LocationOn className="section-icon-info" /> Dirección y Ubicación
          </SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <p>
                  Código postal<strong>*</strong>
                </p>
                {hasError("postal_code") && <ErrorMessage />}
                <input
                  placeholder="Código postal"
                  className="input"
                  {...registerForm("postal_code", {
                    required: true,
                    onChange: async (e) => {
                      const postalCode = e.target.value;
                      if (postalCode.length === 5) {
                        await getEntitieCityByPostals(postalCode); // ya actualiza los campos necesarios
                      }
                    },
                  })}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>
                  Estado <strong>*</strong>
                </p>
                {hasError("entityId") && <ErrorMessage />}
              </div>
              <Controller
                name="entityId"
                control={controlForm}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona un Estado"
                    options={EntitiesLocal}
                    onChange={(e) => handleSelectValue(e, "entityId")}
                    value={
                      EntitiesLocal.find((item) => item.id === field.value) ||
                      null
                    }
                    getOptionValue={(option) => `${option.id}`}
                    getOptionLabel={(option) => toUpperCaseChart(option.name)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Municipio</p>
              <Controller
                name="cityId"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona un Municipio"
                    options={
                      citiesByEntity.results !== null
                        ? citiesByEntity.results
                        : []
                    }
                    isLoading={citiesByEntity?.isFetching}
                    onChange={(e) => handleSelectValue(e, "cityId")}
                    value={
                      citiesByEntity?.results?.filter(
                        (item) => item.id === field.value
                      )[0]
                    } // Asegúrate de que se esté seleccionando el valor correcto
                    getOptionValue={(option) => `${option["id"]}`}
                    getOptionLabel={(option) =>
                      `${toUpperCaseChart(option.name)}`
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="item">
                <p>Calle</p>
                <input
                  placeholder="Calle"
                  className="input"
                  {...registerForm("street")}
                />
              </div>
            </Grid>
          </Grid>

          <SectionTitle>
            <Info className="section-icon-info" />
            Redes Sociales
          </SectionTitle>
          <div>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div>
                <p>Google Maps</p>
                <input
                  placeholder="Link Ubicación"
                  className="input2"
                  {...registerForm("location", {
                    pattern: {
                      value:
                        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                      message: "*Link Incorrecto",
                    },
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div>
                <p>Facebook</p>
                <input
                  placeholder="Red Social"
                  className="input2"
                  {...registerForm("facebook", {
                    pattern: {
                      value:
                        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                      message: "*Link Incorrecto",
                    },
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div>
                <p>Pagina web</p>
                <input
                  placeholder="Pagina web"
                  className="input2"
                  {...registerForm("url", {
                    pattern: {
                      value:
                        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                      message: "*Link Incorrecto",
                    },
                  })}
                />
              </div>
            </Grid>
          </div>
          <Grid item xs={12} className="ctr_buttons">
            <Button
              onClick={onClose}
              variant="outlined"
              className="btn_cancel"
              fullWidth
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSave}
              variant="contained"
              className="btn_upload"
              fullWidth
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </Grid>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
const ErrorMessage = ({ message = "Requerido" }) => {
  return (
    <>
      <div className="point"></div>
      <Error> {message}</Error>
    </>
  );
};

const Genders = [
  {
    id: "Mujer",
    label: "Mujer",
  },
  {
    id: "Hombre",
    label: "Hombre",
  },
];
