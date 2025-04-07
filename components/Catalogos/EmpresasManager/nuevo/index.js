import React, { useEffect, useState } from "react";
import { NewProspectStyled, Error } from "../../../../styles/Propectos/NewProspect";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, Checkbox } from "@material-ui/core";
import { api } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../../../../redux/slices/companySlice";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { CameraAlt, CheckBox } from "@material-ui/icons";
import { userSelector } from "../../../../redux/slices/userSlice";
import { EntitiesLocal } from "../../../../BD/databd";
import Select from "react-select";
import { consoleColor, handleGlobalAlert, toUpperCaseChart, validateURL } from "../../../../utils";
import MainLayout from "../../../../components/MainLayout";
import Head from "next/head";
import LoaderCompleteScreen from "../../../LoaderCompleteScreen";

export default function NewCompany() {
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
  const [isBidder, setIsBidder] = useState(false);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const getComercial = async () => {
      try {
        let comercial = await api.get(`commercialbusinesses?limit=200`);
        setComercial(comercial.data.results);
      } catch (err) {
        handleAlert("error", " ¡Error al cargar clientes !", "basic");
      }
    };
    getComercial();
  }, []);

  const navigateFases = () => {
    router.push("../empresas");
  };

  const createData = async (formData, nameLogo) => {
    try {
      setIsCreating(true);
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
      if (isBidder) {
        jsonToCreate.eslicitante = true;
        jsonToCreate.amount = formData.amount;
      }
      if (isDeleteLogo === true) {
        jsonToCreate.photo = "";
      } else {
        jsonToCreate.photo = nameLogo;
      }

      let faseNew = await api.post(`clientscompanies`, jsonToCreate);
      if (faseNew.status == 201) {
        handleAlert("success", "Cliente - ¡Agregado correctamente!", "basic");
        setTimeout(() => {
          router.push("/catalogos/empresas");
          setIsCreating(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err.request.response);
      setIsCreating(false);
      switch (err.request?.status) {
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

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
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

  const deleteLogo = () => {
    setIsDeleteLogo(true);
    setLinkLogo("");
    setLogo("");
    setDeleteLinkLogo(linkLogo);
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
    let query = { rfc: dataGroup.rfc };
    let results = await api.get(`clientscompanies?where=${JSON.stringify(query)}`);
    if (results.data.results.length > 0) {
      handleGlobalAlert("warning", "Cliente - Este RFC ya esta en uso", "basic", dispatch, 6000);
    } else {
      if (file !== undefined) {
        try {
          let cleanName = string_to_slug(name);
          let newData = new FormData();
          newData.append("name", name);
          newData.append("file", file);
          let results = await api.post(`files/upload/${cleanName}`, newData);
          createData(dataGroup, results.data.name);
        } catch (error) {
          handleGlobalAlert("error", "Error - No se Subió la Imagen", "basic", dispatch, 6000);
          console.log(error);
        }
      } else {
        createData(dataGroup, linkLogo);
      }
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
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1008`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheck = event => {
    setIsBidder(event.target.checked);
  };
  return (
    <NewProspectStyled>
      {/* <NavBarDashboard /> */}
      <Head>
        <title>CRM JOBS - Nuevo Cliente Compañia</title>
      </Head>
      <div className="main">
        <div className="head">
          <h1> Agregar Compañía</h1>
        </div>

        <div className="main_prospects">
          {" "}
          <form onSubmit={handleSubmit(createData)}>
            <Grid container className="form">
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre de la compañía <strong>*</strong>
                    </p>
                    {errors.companyname && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.companyname?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Nombre de la Compañia"
                    className="input"
                    {...register("companyname", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Correo</p>
                    {errors.email && (
                      <>
                        <div className="point"></div> <Error>{errors.email?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="ejemplo@gmail.com "
                    {...register("email", {
                      required: false,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                        message: "*Correo Invalido",
                      },
                    })}
                    className="input"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>RFC</p>
                    {errors.rfc && (
                      <>
                        <div className="point"></div> <Error>{errors.rfc?.message}</Error>
                      </>
                    )}
                  </div>

                  <input
                    autoComplete="off"
                    placeholder="Ingrese RFC"
                    className="input"
                    {...register("rfc", {
                      required: "*Requerido",
                      pattern: {
                        value:
                          /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
                        message: "*RFC Incorrecto",
                      },
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Teléfono</p>
                    {errors.phone && (
                      <>
                        <div className="point"></div> <Error>{errors.phone?.message}</Error>
                      </>
                    )}
                  </div>
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
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                    type="number"
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Teléfono opcional</p>

                    {errors.optionalophone && (
                      <>
                        <div className="point"></div> <Error>{errors.optionalophone?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    type="number"
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
                    placeholder="Digíte número a 10 dígitos "
                    className="input"
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Giro Comercial</p>
                    {errors.commercial && errors.commercial.type === "required" && (
                      <>
                        <div className="point"></div> <Error>Requerido</Error>
                      </>
                    )}
                  </div>
                  <Controller
                    name="commercial"
                    control={control}
                    rules={{ required: false }}
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
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Calle</p>
                    {/* {errors.street && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.street?.message}</Error>
                      </>
                    )} */}
                  </div>

                  <input
                    placeholder="Nombre de la Calle"
                    className="input"
                    {...register("street", {
                      required: false,
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Código postal</p>
                  <input
                    placeholder="Codigo postal"
                    className="input"
                    {...register("postalcode", {
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

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Estado</p>
                    {/* {errors.entity && errors.entity.type === "required" && (
                      <>
                        <div className="point"></div> <Error>{"*Requerido"}</Error>
                      </>
                    )} */}
                  </div>
                  <Controller
                    name="entity"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="select-options"
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
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Municipio</p>
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="select-options"
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
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p className="item-bidder">
                    Es licitante <Checkbox checked={isBidder} onChange={handleCheck} className="checkbox" />
                  </p>
                  {isBidder && (
                    <>
                      <input
                        type="number"
                        placeholder="Monto adjudicado"
                        className="input bidder"
                        {...register("amount", { maxLength: 15, min: 1, required: true })}
                      />
                      {errors.isBidder && <a className="error">{"Valor máximo alcanzado"}</a>}
                    </>
                  )}
                </div>
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
                      onClick={e => (e.target.value = null)}
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

              <Grid item xs={12} md={12} className="buttons">
                <Button
                  variant="outlined"
                  color="primary"
                  className="btnsalir"
                  disabled={isCreating}
                  onClick={() => navigateFases()}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="btnGuardar"
                  disabled={isCreating}
                  onClick={handleSubmit(onSubmit)}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
      {isCreating && <LoaderCompleteScreen />}
    </NewProspectStyled>
  );
}
