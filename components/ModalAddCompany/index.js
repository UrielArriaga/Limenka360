import { useEffect, useState } from "react";
import { Dialog, Grid, Button } from "@material-ui/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toUpperCaseChart } from "/utils";
import { userSelector } from "/redux/slices/userSlice";
import { EntitiesLocal } from "../../BD/databd";
import { CameraAlt } from "@material-ui/icons";
import AlertGlobal from "../Alerts/AlertGlobal";
import { validateURL } from "../../utils";

export default function AddCompanyclient({ opencompany, setOpenCompany, getClientscompanies }) {
  const { id_user } = useSelector(userSelector);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [comercial, setComercial] = useState([]);
  const [logo, setLogo] = useState({ url: "", file: undefined });
  const [linkLogo, setLinkLogo] = useState("");
  const [isDeleteLogo, setIsDeleteLogo] = useState(false);
  const [deleteLinkLogo, setDeleteLinkLogo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [entity, setEntity] = useState("");
  const [city, setCity] = useState("");
  const [commercial, setCommercial] = useState("");
  const [loadCities, setLoadCities] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm();

  useEffect(() => {
    getComercial();
  }, [opencompany]);

  const handleClose = () => {
    resetForm();
    setOpenCompany(!opencompany);
  };

  const getComercial = async () => {
    try {
      let comercial = await api.get(`commercialbusinesses?limit=200`);
      setComercial(comercial.data.results);
    } catch (err) {
      handleAlert("error", " ¡Error al cargar metas refresca la página!", "basic");
    }
  };

  const handleSelectEntities = id => {
    setEntity(id);
    setCity({});
    getCities(id);
    setValue("entity", id);
  };

  const handleSelectCity = item => {
    if (item === "") {
      setCity({});
    } else {
      setCity(item);
      setValue("city", item.id);
    }
  };

  const handleSelectCommercial = item => {
    if (item === "") {
      setCommercial({});
    } else {
      setCommercial(item);
      setValue("commercial", item.id);
    }
  };

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1006`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getEntitieCityByPostals = async code => {
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
        getCities(postals?.data?.results[0]?.city?.entity?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createData = async (formData, nameLogo) => {
    try {
      // let query = { rfc: formData.rfc };
      // let results = await api.get(`clientscompanies?where=${JSON.stringify(query)}`);
      // if (results.data.results.length > 0) {
      //   handleAlert("error", "Cliente - Este RFC ya esta en uso ", "basic");
      // } else {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Compañia", type: "load" });
      let jsonToCreate = {};
      jsonToCreate.ejecutiveId = id_user;
      jsonToCreate.companyname = formData.companyname.toLocaleLowerCase();
      jsonToCreate.street = formData.street.toLocaleLowerCase();
      jsonToCreate.email = formData.email;
      jsonToCreate.phone = formData.phone;
      jsonToCreate.optionalophone = formData.optionalophone;
      jsonToCreate.rfc = formData.rfc;
      jsonToCreate.commercialbusinessId = formData.commercial;
      jsonToCreate.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      jsonToCreate.postalId = postalCode;
      jsonToCreate.entityId = formData.entity;
      jsonToCreate.cityId = formData.city;

      if (isDeleteLogo === true) {
        jsonToCreate.photo = "";
        let deleteLogo = await api.delete(`files/delete`, { data: { name: deleteLinkLogo } });
      } else {
        jsonToCreate.photo = nameLogo;
      }

      let faseNew = await api.post(`clientscompanies`, jsonToCreate);
      if (faseNew.status == 201) {
        handleAlert("success", "Compañia - ¡Agregado correctamente!", "basic");
        setOpenCompany(false);
        resetForm();
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Compañia - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Compañia - ¡No tienes permisos!", "basic");
        case 404:
        default:
          return handleAlert("error", "Compañia - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const showTheLogo = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop();
    let acceptFile = ["jpg", "png", "jpeg"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0) return props.handleAlert("error", "Error al actualizar", "basic", props.setAlert);
    const url = URL.createObjectURL(e.target.files[0]);
    setLogo({ url: url, file: e.target.files[0] });
  };

  const deleteLogo = () => {
    setIsDeleteLogo(true);
    setLinkLogo("");
    setLogo("");
    setDeleteLinkLogo(linkLogo);
  };

  const resetForm = () => {
    setValue("companyname", "");
    setValue("email", "");
    setValue("rfc", "");
    setValue("phone", "");
    setValue("optionalophone", "");
    setValue("commercial", "");
    setValue("street", "");
    setValue("postalcode", "");
    setValue("entity", "");
    setValue("city", "");
    setEntity("");
    setCity("");
    setLinkLogo("");
    setLogo({ url: "", file: undefined });
  };

  const string_to_slug = str => {
    str = str.replace(/(<([^>]+)>)/gi, " ");
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    return str;
  };

  const onSubmit = data => {
    uploadLogo(logo?.file, logo.file?.name, true, data);
  };

  const uploadLogo = async (file, name, type, dataGroup) => {
    if (file !== undefined) {
      try {
        let cleanName = string_to_slug(name);
        let newData = new FormData();
        newData.append("name", name);
        newData.append("file", file);
        let results = await api.post(`files/upload/${cleanName}`, newData);
        createData(dataGroup, results.data.name);
      } catch (error) {
        console.log(error);
        // props.handleAlert("error", "Error - No se Subió la Imagen", "basic", props.setAlert);
      }
    } else {
      createData(dataGroup, linkLogo);
    }
  };
  return (
    <Dialog
      open={opencompany}
      onClose={handleClose}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <p className="title">Agregar nueva Compañia</p>
        <form onSubmit={handleSubmit(createData)}>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={12}>
              <label className="ctr_inputs__label">Nombre de la compañia *</label>
              <input
                id="companyname"
                name="conpanyname"
                className={errors?.companyname?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                {...register("companyname", {
                  required: "*Requerido",
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Correo *</label>
              <input
                id="email"
                name="email"
                {...register("email", {
                  required: "*Requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                    message: "*Correo Invalido",
                  },
                })}
                className={errors?.email?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">RFC * </label>
              <input
                id="rfc"
                name="rfc"
                // value={rfc}
                {...register("rfc", {
                  required: true,
                  pattern: {
                    value:
                      /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                    message: "*RFC Incorrecto",
                  },
                })}
                className={errors?.rfc?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Teléfono *</label>
              <input
                {...register("phone", {
                  required: true,
                  maxLength: {
                    value: 10,
                    message: "*10 Caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "*10 Caracteres",
                  },
                  pattern: {
                    value: /[0-9]+/i,
                    message: "*Caracter Invalido",
                  },
                })}
                id="phone"
                name="phone"
                // value={phone}

                className={errors?.phone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Teléfono opcional </label>
              <input
                {...register("optionalophone", {
                  maxLength: {
                    value: 10,
                    message: "*10 Caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "*10 Caracteres",
                  },
                  pattern: {
                    value: /[0-9]+/i,
                    message: "*Caracter Invalido",
                  },
                })}
                id="optionalophone"
                name="optionalophone"
                // value={optionalophone}

                className={
                  errors?.optionalophone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Giro Comercial </label>
              <Controller
                name="commercial"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select-options"
                    placeholder="Selecciona Giro Comercial"
                    options={comercial}
                    isClearable={true}
                    onChange={e => (e === null ? handleSelectCommercial("") : handleSelectCommercial(e))}
                    value={comercial.filter(item => item.id === commercial.id)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Calle </label>
              <input
                {...register("street", { required: false })}
                id="street"
                name="street"
                className={errors?.street?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Código postal </label>
              <input
                {...register("postalcode", {
                  required: false,
                  onChange: e => {
                    if (e.target.value.length === 5) {
                      getEntitieCityByPostals(e.target.value);
                    }
                  },
                })}
                id="postalcode"
                name="postalcode"
                className={"ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Estado </label>
              <Controller
                name="entity"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className={"ctr_inputs__select"}
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
              <label className="ctr_inputs__label">Municipio </label>

              <Controller
                name="city"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className={"ctr_inputs__select"}
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
            <Grid item xs={12} sm={4} md={4} className="imageContainer">
              <Grid item xs={12} md={12} className="logo">
                <label className="logo__label">
                  {logo.file === undefined ? (
                    linkLogo === "" ? (
                      <CameraAlt className="logo__icon" />
                    ) : (
                      <img className="logo__img" src={validateURL(linkLogo)} alt="" />
                    )
                  ) : (
                    <img className="logo__img" src={validateURL(logo.url)} alt="" />
                  )}

                  <input
                    className="logo__input"
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={e => showTheLogo(e)}
                  />
                </label>
              </Grid>
              {linkLogo === "" && (
                <Grid item xs={6} md={6} style={{ marginTop: "5%" }}>
                  <Button className="imageContainer__deleteImage" onClick={() => deleteLogo()}>
                    Eliminar
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid container className="ctr_buttons">
              <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" className="btn_upload" onClick={handleSubmit(onSubmit)}>
                Guardar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContainer>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </Dialog>
  );
}

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 600px;

  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }
  .ctr_inputs {
    padding: 0 20px 60px 20px;

    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      height: 38px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }

    .logo {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      &__img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: contain;
      }
      &__icon {
        font-size: 60px;
      }
      &__input {
        display: none;
      }
      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        text-align: center;
        padding: 5px;
        margin-bottom: 10px;
        border: 1px solid #ced4da;
        border-radius: 50%;
        transition: 0.3s;
        &:hover {
          -webkit-filter: blur(2px);
          cursor: pointer;
          &__logoFooter {
            z-index: 0;
          }
        }
      }
      &__buttonUploadImage {
        margin-bottom: 10px;
      }
      &__buttonDeleteImage {
      }
      &__logoFooter {
        position: fixed;
        color: red;
        color: black;
        font-size: 40px;
        text-align: center;
        margin-top: 100px;
        z-index: -1;
        transition: 0.2s;
        font-weight: bold;
      }
    }
    .imageContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__deleteImage {
        margin-top: 15px;
        border-radius: 5px;
        padding: 2px;
        background-color: red;
        color: #fff;
        border-color: red;
        transition: 0.3s;
        text-transform: capitalize;
        &:hover {
          cursor: pointer;
          background-color: #fff;
          color: red;
        }
      }
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
`;
