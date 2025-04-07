import { Button, Grid } from "@material-ui/core";
import { CloseOutlined, Person } from "@material-ui/icons";
import React from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { EntitiesLocal } from "../../BD/databd";
import useEditProspect from "../../hooks/prospects/useEditProspect";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
import { toUpperCaseChart } from "../../utils";
import AlertGlobal from "../Alerts/AlertGlobal";
import { DialogFullScreen, Error } from "./styles";

const DrawerEditProspect = ({ openEdit, setOpenEdit, prospectEdit, setFlag, flag, activityFrom }) => {
  const {
    handleSubmitForm,
    handleUpdateProspect,
    registerForm,
    controlForm,
    propsForm,
    hasError,
    setValueForm,
    errorsForm,
    citiesByEntity,
    getEntitieCityByPostals,
    getCitiesByEntity,
    roleId,
    Alert,
    resetForm,
  } = useEditProspect(prospectEdit, openEdit, setOpenEdit, setFlag);
  const { getCatalogBy } = useGlobalCommons();

  const { phases, clientTypes, origins, specialties, categories, channels, users, clientsCompanies } =
    useSelector(commonSelector);

  const handleCloseEdit = () => {
    resetForm();
    setOpenEdit(!openEdit);
  };

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
  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={handleCloseEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCloseEdit} />
            <p className="title">Editar Prospecto</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmitForm(handleUpdateProspect)}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">
            <Person />
            Prospecto <span>{`${prospectEdit.name} ${prospectEdit?.lastname}`}</span>
          </p>
          <Grid container className="form">
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
                {hasError("email") && <ErrorMessage message={errorsForm.email?.message} />}
              </div>
              <input
                placeholder="ejemplo@gmail.com "
                {...registerForm("email", {
                  ...propsForm.email,
                })}
                className="input"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>Teléfono</p>
                  {hasError("phone") && <ErrorMessage message={errorsForm.phone?.message} />}
                </div>
                <input
                  {...registerForm("phone", {
                    ...propsForm.phone,
                  })}
                  placeholder="Digíte número a 10 dígitos "
                  className="input"
                  type="number"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Teléfono opcional</p>
              <input
                type="number"
                {...registerForm("optionalphone", {
                  ...propsForm.phone,
                })}
                placeholder="Digíte número a 10 dígitos "
                className="input"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div className="ContentTitleandAlert">
                <p>Origen</p>
                <strong>*</strong>
                {hasError("originId") && <ErrorMessage />}
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
                    onChange={e => handleSelectValue(e, "originId")}
                    value={origins.results.find(o => o.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
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
                    onChange={e => handleSelectValue(e, "clientTypeId")}
                    value={clientTypes.results.find(c => c.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Genero</p>
              <Controller
                name="gender"
                control={controlForm}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={Genders.find(c => c.id === field.value)}
                    onChange={e => handleSelectValue(e, "gender")}
                    placeholder="Selecciona una Opción"
                    options={Genders}
                    isClearable={true}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.label)}`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className="item">
              <div>
                <p>Calle</p>
                <input placeholder="Calle" className="input" {...registerForm("street")} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <p>Código postal</p>
                <input
                  placeholder="Codigo postal"
                  className="input"
                  {...registerForm("postal", {
                    required: false,
                    onChange: e => {
                      if (e.target.value.length === 5) {
                        getEntitieCityByPostals(e.target.value);
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
                    className="select-options"
                    placeholder="Selecciona un Estado"
                    options={EntitiesLocal}
                    onChange={e => handleSelectValue(e, "entityId")}
                    value={EntitiesLocal.filter(item => item.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
                    className="select-options"
                    placeholder="Selecciona un Municipio"
                    options={citiesByEntity.results !== null ? citiesByEntity.results : []}
                    isLoading={citiesByEntity?.isFetching}
                    onChange={e => handleSelectValue(e, "cityId")}
                    value={citiesByEntity?.results?.filter(item => item.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
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
                    onChange={e => handleSelectValue(e, "phaseId")}
                    value={phases.results.find(c => c.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>

            {roleId !== "ejecutivo" && (
              <>
                <Grid item xs={12} sm={6} md={12} className="item">
                  <p>Asignado o Reasignacion</p>
                  <Controller
                    name="ejecutiveId"
                    control={controlForm}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isClearable={true}
                        value={users.results.filter(c => c.id === field.value)[0]}
                        defaultValue={{ label: prospectEdit?.ejecutive?.email, value: prospectEdit?.ejecutiveId }}
                        // onChange={e => (e === null ? handleSelectEjecutives("") : handleSelectEjecutives(e))}
                        onChange={e => handleSelectValue(e, "ejecutiveId")}
                        placeholder="Selecciona una Opción"
                        isLoading={users.isFetching}
                        onMenuOpen={() => getCatalogBy("executives")}
                        loadingMessage={() => "Cargando Opciones..."}
                        options={users.results}
                        getOptionValue={option => `${option["id"]}`}
                        getOptionLabel={option => `${toUpperCaseChart(option.email)}`}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} className="item">
                  <p>Compartir con</p>
                  <Controller
                    control={controlForm}
                    name="sharedto"
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue={prospectEdit?.sharedto}
                        options={users.results}
                        placeholder="Selecciona una opcion"
                        isMulti
                        getOptionValue={option => `${option["id"]}`}
                        getOptionLabel={option => `${toUpperCaseChart(option.name)} - ${option.email}`}
                        isLoading={users.isFetching}
                        onMenuOpen={() => getCatalogBy("executives")}
                        loadingMessage={() => "Cargando Opciones..."}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Especialidad</p>
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
                    onChange={e => handleSelectValue(e, "specialtyId")}
                    value={specialties.results.find(c => c.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Puesto</p>
              <input placeholder="Puesto" className="input" {...registerForm("job")} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Código de Producto</p>
              <input placeholder="Codigo" className="input" {...registerForm("productCode")} />
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
                    value={categories.results.filter(c => c.id === field.value)}
                    onChange={e => handleSelectValue(e, "categoryId")}
                    placeholder="Selecciona una Opción"
                    options={categories.results}
                    onMenuOpen={() => getCatalogBy("categories")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={categories.isFetching}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Titulo</p>
              <input {...registerForm("title")} placeholder="Ingrese un título" className="input" />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Pagina web</p>
              <input
                placeholder="Pagina web"
                className="input"
                {...registerForm("url", {
                  pattern: {
                    value:
                      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    message: "*Link Incorrecto",
                  },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Facebook</p>
              <input
                placeholder="Red Social"
                className="input"
                {...registerForm("facebook", {
                  pattern: {
                    value:
                      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    message: "*Link Incorrecto",
                  },
                })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} className="item">
              <p>Google maps</p>
              <input
                placeholder="Link Ubicación"
                className="input"
                {...registerForm("location", {
                  pattern: {
                    value:
                      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                    message: "*Link Incorrecto",
                  },
                })}
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
                    value={clientsCompanies.results.filter(c => c.id === field.value)}
                    onChange={e => handleSelectValue(e, "clientCompanyId")}
                    placeholder="Selecciona una Opción"
                    options={clientsCompanies.results}
                    onMenuOpen={() => getCatalogBy("clientsCompanies")}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.companyname)}`}
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
                    value={channels.results.filter(c => c.id === field.value)}
                    onChange={e => handleSelectValue(e, "channelId")}
                    isLoading={channels.isFetching}
                    onMenuOpen={() => getCatalogBy("channels")}
                    loadingMessage={() => "Cargando Opciones..."}
                    placeholder="Selecciona una Opción"
                    options={channels.results}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={12} className="item">
              <div className="item">
                <p>Comentarios</p>
                <input placeholder="Comentarios" className="input" {...registerForm("observations")} />
              </div>
            </Grid>

            <Grid item xs={12} className="ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="contained" className="btn_upload" onClick={handleSubmitForm(handleUpdateProspect)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </DialogFullScreen>
  );
};

const ErrorMessage = ({ message = "Requerido" }) => {
  return (
    <>
      <div className="point"></div>
      <Error> {message}</Error>
    </>
  );
};

export default DrawerEditProspect;

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
