import { React, useEffect, useState } from "react";
import { EditUser } from "../../styles/Usuarios/usuarios.style";
import {
  Dialog,
  IconButton,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Checkbox,
} from "@material-ui/core";
import { Close, Person, LockOpen, Group, SupervisorAccount, Lock, CameraAlt, Edit } from "@material-ui/icons";
import SelectAcces from "react-select";
import { api, url_filesCompanies } from "../../services/api";
import { Controller, useForm } from "react-hook-form";
import { normalizeEditUser, normalizeEditUserPermissions } from "../../utils/normalizeData";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { EntitiesLocal } from "../../BD/databd";
import Select from "react-select";
import { handleGlobalAlert, toUpperCaseChart, validateURL } from "../../utils";
import { useDispatch } from "react-redux";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function EditClientsCompanies({
  refetch,
  setRefetch,
  setAlert,
  comercial,
  edit,
  openEditClients,
  setOpenEditClients,
}) {
  const [postalCode, setPostalCode] = useState([]);
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [entityEdit, setEntityEdit] = useState("");
  const [cityEdit, setCityEdit] = useState("");
  const [isDeleteLogo, setIsDeleteLogo] = useState(false);
  const [deleteLinkLogo, setDeleteLinkLogo] = useState("");
  const [linkLogo, setLinkLogo] = useState("");
  const [logo, setLogo] = useState({ url: "", file: undefined });
  const [loadCities, setLoadCities] = useState(false);
  const [rfc, setRfc] = useState("");
  const dispatch = useDispatch();
  const [isBidder, setIsBidder] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;

    if (openEditClients) {
      SetValues(edit);
    }

    return () => (mounted = false);
  }, [openEditClients]);
  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1003`);
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
        setEntityEdit(postals?.data?.results[0]?.city?.entity?.id);
        setValue("entity", postals?.data?.results[0]?.city?.entity?.id);
        setCityEdit(postals?.data?.results[0]?.city);
        setValue("city", postals?.data?.results[0]?.city.id);
        getCities(postals?.data?.results[0]?.city?.entity?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function SetValues(cmpny) {
    setValue("companyname", cmpny?.companyname);
    setValue("email", cmpny?.email);
    setValue("rfc", cmpny?.rfc);
    setRfc(cmpny?.rfc);
    setValue("phone", cmpny?.phone);
    setValue("optionalophone", cmpny?.optionalophone);
    setValue("street", cmpny?.street);
    setValue("commercialbusinessId", cmpny?.commercialbusinessId);
    setValue("entity", cmpny?.entityId);
    getCities(cmpny?.entityId);
    setEntityEdit(cmpny?.entityId);
    setValue("amount", cmpny?.amount);
    setIsBidder(cmpny?.eslicitante);

    if (cmpny?.postalId) {
      setValue("postalcode", cmpny?.postal?.postal_code);
      getEntitieCityByPostals(cmpny?.postal?.postal_code);
    }
    if (cmpny?.cityId) {
      setValue("city", cmpny?.cityId);
      setCityEdit(cmpny?.city);
    }

    setLinkLogo(cmpny?.photo);
  }

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
        handleUploadData(dataGroup, results.data.name);
      } catch (error) {
        handleAlert("error", "Error - No se Subió la Imagen", "basic", setAlert);
      }
    } else {
      handleUploadData(dataGroup, linkLogo);
    }
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

  const handleUploadData = async (formData, nameLogo) => {
    try {
      if (rfc !== formData.rfc) {
        let query = { rfc: formData.rfc };
        let results = await api.get(`clientscompanies?where=${JSON.stringify(query)}`);
        if (results.data.results.length > 0)
          return handleAlert("warning", "Cliente compañia - Este RFC ya esta en uso ", "basic");
      }
      let jsonToUpdate = {};
      jsonToUpdate.companyname = formData.companyname.toLocaleLowerCase();
      jsonToUpdate.email = formData.email;
      if (rfc !== formData.rfc) {
        jsonToUpdate.rfc = formData.rfc;
      }
      jsonToUpdate.phone = formData.phone;
      jsonToUpdate.optionalophone = formData.optionalophone;
      jsonToUpdate.commercialbusinessId = formData.commercialbusinessId;
      jsonToUpdate.street = formData.street;
      if (formData.postalcode !== "") {
        jsonToUpdate.postalId = postalCode;
      } else {
        jsonToUpdate.postalId = "";
      }
      if (formData.entity !== null) {
        jsonToUpdate.entityId = formData.entity;
      } else {
        jsonToUpdate.entityId = "";
      }

      if (formData.city !== "") {
        jsonToUpdate.cityId = formData.city;
      } else {
        jsonToUpdate.cityId = "";
      }
      if (isDeleteLogo === true) {
        jsonToUpdate.photo = "";
        let deleteLogo = await api.delete(`files/delete`, { data: { name: deleteLinkLogo } });
      } else {
        jsonToUpdate.photo = nameLogo;
      }
      if (isBidder) {
        jsonToUpdate.eslicitante = true;
        jsonToUpdate.amount = formData.amount;
      } else {
        jsonToUpdate.eslicitante = false;
      }

      let update = await api.put(`clientscompanies/${edit.id}`, jsonToUpdate).then(res => {
        setRefetch(!refetch);
        resetForm();
        handleCloseEdit();
        handleAlert("success", "Compañía - Actualizado!", "basic");
      });
    } catch (error) {
      console.log("error", error);
      switch (error.request?.status) {
        case 401:
          return handleAlert("error", "Clientes - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Clientes - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Clientes - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Clientes - ¡Error al cargar los datos!", "basic");
      }
    }
  };
  const deleteLogo = () => {
    setIsDeleteLogo(true);
    setLinkLogo("");
    setLogo({ url: "", file: undefined });
    setDeleteLinkLogo(linkLogo);
  };

  const resetForm = () => {
    setValue("companyname", "");
    setValue("email", "");
    setValue("rfc", "");
    setValue("phone", "");
    setValue("optionalophone", "");
    setValue("commercialbusinessId", "");
    setValue("street", "");
    setValue("postalcode", "");
    setValue("entity", "");
    setValue("city", "");
    setEntityEdit("");
    setCityEdit("");
    setLinkLogo("");
    setLogo({ url: "", file: undefined });
  };
  const showTheLogo = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop().toLocaleLowerCase();
    let acceptFile = ["jpg", "png", "jpeg"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0)
      return handleGlobalAlert(
        "warning",
        "Error al actualizar imagen(Tipo de archivo no permitido)",
        "basic",
        dispatch,
        6000
      );
    const url = URL.createObjectURL(e.target.files[0]);
    setLogo({ url: url, file: e.target.files[0] });
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const handleSelectEntities = id => {
    setEntityEdit(id);
    setCityEdit({});
    getCities(id);
    setValue("entity", id);
  };
  const handleSelectCity = item => {
    if (item === "") {
      setCityEdit({});
      setValue("city", "");
    } else {
      setCityEdit(item);
      setValue("city", item.id);
    }
  };
  const handleCloseEdit = () => {
    resetForm();
    setOpenEditClients(!openEditClients);
  };
  const handleCheck = event => {
    setIsBidder(event.target.checked);
  };
  return (
    <Dialog
      onClose={handleCloseEdit}
      open={openEditClients}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <p className="title">Editar Cliente Compañía</p>
        <Grid spacing={1} container className="ctr_inputs">
          <Grid item xs={12} md={12}>
            <label className="ctr_inputs__label">Nombre de la compañía </label>
            <input
              {...register("companyname", { required: true })}
              id="companyname"
              name="companyname"
              // value={companyname}

              className={errors?.companyname?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Correo </label>
            <input
              {...register("email", { required: false })}
              id="email"
              name="email"
              // value={email}
              className={errors?.email?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">RFC </label>
            <input
              {...register("rfc", {
                required: false,
                pattern: {
                  value:
                    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                  message: "*RFC Incorrecto",
                },
              })}
              id="rfc"
              name="rfc"
              // value={rfc}

              className={errors?.rfc?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Teléfono </label>
            <input
              {...register("phone", {
                required: false,
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

              className={errors?.optionalophone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Giro Comercial </label>

            <select
              placeholder="Nombre de la Fase"
              className={
                errors?.commercialbusinessId?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
              }
              {...register("commercialbusinessId", { required: false })}
            >
              <option value="" hidden>
                Selecciona una opción
              </option>
              {comercial?.map((item, index) => {
                return (
                  <option key={index} value={item.id} className="option">
                    {item.name}
                  </option>
                );
              })}
            </select>
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
                  value={EntitiesLocal.filter(item => item.id === entityEdit)}
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
                  value={citiesByEntity?.filter(item => item.id === cityEdit.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="item">
              <label className="ctr_inputs__label">
                Es licitante <Checkbox checked={isBidder} onChange={handleCheck} className="checkbox" />
              </label>

              {isBidder && (
                <>
                  <input
                    type="number"
                    placeholder="Monto adjudicado"
                    className={
                      errors?.isBidder === "required" ? "ctr_inputs__input error bidder" : "ctr_inputs__input bidder"
                    }
                    {...register("amount", { maxLength: 15, min: 1, required: true })}
                  />
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="imageContainer">
            <Grid item xs={12} md={12} className="logo">
              <label className="logo__label">
                {logo?.file === undefined ? (
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

            {linkLogo !== "" && (
              <Grid item xs={6} md={6} style={{ marginTop: "5%" }}>
                <Button className="imageContainer__deleteImage" onClick={() => deleteLogo()}>
                  Eliminar
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button variant="contained" color="secondary" className="btn_cancel" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" className="btn_upload" onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
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
    .bidder {
      top: -4px;
      position: relative;
    }
    .error {
      border: 1.5px solid #f50f;
    }
    .checkbox {
      top: -4px;
      position: relative;
      padding: 0;
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
