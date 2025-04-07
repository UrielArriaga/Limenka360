import React, { useContext, useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { NewProspectStyled, Error } from "../../../styles/Propectos/NewProspect";
import { useForm, Controller } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { CachedOutlined } from "@material-ui/icons";
import Select from "react-select";
import { ACTIONIDPRODUCTIONMODE, api } from "../../../services/api";
import { userSelector } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import RequestCommon from "../../../services/request_Common";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import { EntitiesLocal} from "../../../BD/databd";
import { normalizeAddProspect } from "../../../utils/normalizeData";
import { formatDate, toUpperCaseChart } from "../../../utils";
import { getCountProspect } from "../../../redux/slices/dashboardSlice";
import LoaderCompleteScreen from "../../../components/LoaderCompleteScreen";
import AddCompanyclient from "../../../components/ModalAddCompany";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";

export default function NewProspectRecepcion() {
  const { id_user, groupId, roleId } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const {
    phases,
    clientTypes,
    origins,
    specialties,
    categories,
    channels,
    users,
  } = useSelector(commonSelector);

  const router = useRouter();
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [loadCities, setLoadCities] = useState(false);
  const [isCreatingProspect, setIsCreatingProspect] = useState(false);
  const [isLoaderValidating, setIsLoaderValidating] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [entity, setEntity] = useState("");
  const commonApi = new RequestCommon();
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const [openAdd, setOpenAdd] = useState(false);

  const [selectedEjecutive, setSelectedEjecutive] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();



  useEffect(() => {
    if (users.length > 0) {
      getEjecutives();
    }
  }, [users.results]);


  const getEjecutives = () => {
    let newOptions = users.results.filter(item => item.id !== id_user);
    let newFormatOptions = newOptions.map(item => ({
      id: item.id,
      name: item.fullname,
      email: item.email,
    }));
    return newFormatOptions;
  };
  


  const handleCreateProspect = async (formData, returnTo) => {
    try {
      setIsCreatingProspect(true);
      setIsLoaderValidating(true);
      setAlert({ severity: "info", show: true, message: "Un momento - Creando prospecto", type: "load" });
      formData.id_user = selectedEjecutive.id;
      formData.postalId = postalCode;
      formData.categoryId = formData.categoryId === undefined ? null : formData.categoryId;
      formData.city = formData.city === undefined ? null : formData.city;
      formData.gender = formData.gender === undefined ? null : formData.gender;
      formData.label = formData.label === undefined ? [] : formData.label;
      formData.shared = formData.shared === undefined ? [] : formData.shared;
      formData.specialty = formData.specialty === undefined ? null : formData.specialty;
      formData.channel = formData.channel === undefined ? null : formData.channel;

      let newProspect = normalizeAddProspect(formData);

      let prospectNew = await api.post("prospects/goals", newProspect);
      if (prospectNew.status == 201) {
        createTracking(prospectNew);
        handleAlert("success", "Prospecto - Creado correctamente!", "basic");

        let queryProspectsExecutive = {
          isclient: false,
          isoportunity: false,
          ejecutiveId: id_user,
        };

        let paramsProspectsExecutive = {
          where: JSON.stringify(queryProspectsExecutive),
          count: 1,
          limit: 0,
        };

        dispatch(getCountProspect({ params: paramsProspectsExecutive }));
        setIsCreatingProspect(false);
        setIsLoaderValidating(false);
        setTimeout(() => {
          switch (returnTo) {
            case "saveAndReturn":
              router.back();
              break;

            case "saveAndShow":
              router.push({
                pathname: "/prospectos/[prospecto]",
                query: { prospecto: prospectNew.data?.id },
              });
              break;

            case "saveAndNew":
              router.reload();
              break;

            default:
              router.back();
              break;
          }
          // router.back();
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.internalCode == "47581") {
        handleAlert("error", "Prospecto -El correo o telefono ya existe!", "basic");
      } else {
        handleAlert("error", "Prospecto - Ocurrió un problema!", "basic");
        console.log(error);
      }
      setIsCreatingProspect(false);
      setIsLoaderValidating(false);
    }
  };
  const createTracking = async item => {
    try {
      let prospect = item.data;
      let today = new Date();
      let query = {};
      query.prospectId = prospect.id;
      query.observations = `Prospecto: ${prospect.name} ${prospect.lastname}, creado con éxito el dia ${formatDate(
        today
      )}, creado por ${id_user}`;
      query.actionId = ACTIONIDPRODUCTIONMODE;
      query.status = prospect.status;
      query.reason = "Seguimiento automático";
      query.phaseId = prospect.phaseId;
      query.createdbyId = selectedEjecutive.id;
      await api.post(`trackings`, query);
    } catch (error) {
      handleAlert("error", "Prospecto - Error al Crear el Seguimiento del Prospecto");
      console.log(error.response.data.errors);
    }
  };
  const validateEmail = returnTo => data => {
    let form = data;
    setIsLoaderValidating(true);

    let query = {
      ejecutive: {
        groupId: groupId,
      },
    };

    if (data.email !== "" && data.phone === "") {
      query.email = data.email;
    } else if (data.phone !== "" && data.email === "") {
      query.phone = data.phone;
    } else if (data?.phone !== "" && data.email !== "") {
      query.or = [{ email: data.email }, { phone: data.phone }];
    }

    // console.log(query);

    let params = {
      where: JSON.stringify(query),
      include: "ejecutive",
    };

    api
      .get(`prospects`, { params })
      .then(res => {
        let arrayValues = res.data.results;
        // console.log(res);
        if (res.data.results.length >= 1) {
          let contains = "";

          arrayValues.forEach((item, index) => {
            if (item.email == "") {
              contains += `El prospecto ${item.phone} esta asignado a ${item.ejecutive?.email},`;
            } else {
              contains += `El prospecto ${item.email} esta asignado a ${item.ejecutive?.email},`;
            }
          });

          // console.log(contains);

          let message = `Ya se ha Registrado un Prospecto con ese Correo o Telefono, ${contains}`;
          handleAlert("error", message, "basic");
          setIsLoaderValidating(false);
        } else {
          handleCreateProspect(form, returnTo);
        }
      })
      .catch(err => console.log(err));
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
      setValue("city", "");
    } else {
      setCity(item);
      setValue("city", item.id);
    }
  };
  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1013`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: null, show: null, message: "", type: null });
    }, 3000);
  };


  const handleChangeEjecutives = (selectedOption) => {
    console.log("ID seleccionado:", selectedOption ? selectedOption.id : null); 
    setSelectedEjecutive(selectedOption); 
  };
  return (
      <NewProspectStyled>
        <div className="main">
          <div className="head">
            <h1> Nuevo Prospecto</h1>
          </div>
          <div className="main_prospects">
            <form onSubmit={handleSubmit(validateEmail)}>
              <Grid container className="form">
              <Grid item xs={12} sm={12} md={4}>
              <div className="item">
            <div className="ContentTitleandAlert">
                      <p>
                       Ejecutivo a Asignar <strong>*</strong>
                      </p>
                   </div>
              <Controller 
                name="ejecutiveId"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                  {...field}
                  onChange={handleChangeEjecutives}
                  isClearable={true}
                  onMenuOpen={() => getCatalogBy("executives")}
                  loadingMessage={() => "Cargando Opciones..."} 
                  placeholder="Selecciona un ejecutivo" 
                  isLoading={users.isFetching}
                  options={getEjecutives()}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name}`}
                  />
                  )}
              />
            </div>
              </Grid>
       
                <Grid item xs={12} sm={6} md={4}>
         
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Nombre <strong>*</strong>
                      </p>
                      {errors.name && (
                        <>
                          <div className="point"></div>
                          <Error> {errors.name?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Nombre del Cliente"
                      className="input"
                      {...register("name", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p> Apellidos </p>
                    <input placeholder="Apellidos" className="input" {...register("lastName")} />
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

                      {errors.phoneOptional && (
                        <>
                          <div className="point"></div> <Error>{errors.phoneOptional?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      type="number"
                      {...register("phoneOptional", {
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
                      <p>
                        Origen <strong>*</strong>
                      </p>
                      {errors.origin && errors.origin.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="origin"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona un Origen"
                          isClearable={true}
                          onMenuOpen={() => getCatalogBy("origins")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={origins.isFetching}
                          options={origins.results}
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
                      <p>
                        Tipo de cliente <strong>*</strong>
                      </p>
                      {errors.client && errors.client.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="client"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={clientTypes.results}
                          onMenuOpen={() => getCatalogBy("clientTypes")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={clientTypes.isFetching}
                          isClearable={true}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p> Género</p>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: false }}
                      placeholder="Selecciona el Género"
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          isClearable={true}
                          isSearchable={false}
                          options={[
                            {
                              label: "Hombre",
                              value: "Hombre",
                            },
                            {
                              label: "Mujer",
                              value: "Mujer",
                            },
                          ]}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Calle</p>
                    <input placeholder="Calle" className="input" {...register("street")} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>Código postal</p>
                    </div>
                    <input
                      placeholder="Código postal"
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
                      <p>
                        Estado <strong>*</strong>
                      </p>
                      {errors.entity && errors.entity.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="entity"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona un Estado"
                          options={EntitiesLocal}
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
                    <div className="ContentTitleandAlert">
                      <p>Municipio</p>
                    </div>
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
                    <p> Especialidad</p>
                    <Controller
                      name="specialty"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={specialties.results}
                          isLoading={specialties.isFetching}
                          onMenuOpen={() => getCatalogBy("specialties")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isClearable={true}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Puesto</p>
                    <input placeholder="Puesto" className="input" {...register("job")} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Código de Producto</p>
                    <input placeholder="Codigo" className="input" {...register("productCode")} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Categoria de interés</p>
                    <Controller
                      name="categoryId"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={categories.results}
                          onMenuOpen={() => getCatalogBy("categories")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={categories.isFetching}
                          isClearable={true}
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
                      <p>
                        Fase <strong>*</strong>
                      </p>
                      {errors.phase && errors.phase.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>
                    <Controller
                      name="phase"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={phases.results}
                          onMenuOpen={() => getCatalogBy("phases")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isLoading={phases.isFetching}
                          isClearable={true}
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
                      <p>Pagina web</p>
                      {errors.web && (
                        <>
                          <div className="point"></div> <Error>{errors.web?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Pagina web"
                      className="input"
                      {...register("web", {
                        pattern: {
                          value:
                            /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                          message: "*Link Incorrecto",
                        },
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>Google Maps</p>
                      {errors.location && (
                        <>
                          <div className="point"></div> <Error>{errors.location?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Link Ubicación"
                      className="input"
                      {...register("location", {
                        pattern: {
                          value:
                            /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                          message: "*Link Incorrecto",
                        },
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>Facebook</p>
                      {errors.facebook && (
                        <>
                          <div className="point"></div> <Error>{errors.facebook?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Link de Facebook"
                      className="input"
                      {...register("facebook", {
                        pattern: {
                          value:
                            /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                          message: "*Link Incorrecto",
                        },
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Titulo</p>
                    <input {...register("titulo")} placeholder="Ingrese un título" className="input" />
                  </div>
                </Grid>
                  {roleId !== "ejecutivo" && (
                  <Grid item xs={12} sm={6} md={12}>
                    <div className="item">
                      <p>Compartir con:</p>
                      <Controller
                        name="shared"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="select-options"
                            placeholder="Selecciona una Opción"
                            options={users.results}
                            isLoading={users.isFetching}
                            onMenuOpen={() => getCatalogBy("executives")}
                            loadingMessage={() => "Cargando Opciones..."}
                            isClearable={true}
                            getOptionValue={option => `${option["id"]}`}
                            getOptionLabel={option =>
                              `${toUpperCaseChart(option.name)} ${toUpperCaseChart(
                                option.lastname
                              )} - ${toUpperCaseChart(option.email)}`
                            }
                            isMulti
                          />
                        )}
                      />
                    </div>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <p>Canal</p>
                    <Controller
                      name="channel"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="select-options"
                          placeholder="Selecciona una Opción"
                          options={channels.results}
                          isLoading={channels.isFetching}
                          onMenuOpen={() => getCatalogBy("channels")}
                          loadingMessage={() => "Cargando Opciones..."}
                          isClearable={true}
                          getOptionValue={option => `${option["id"]}`}
                          getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <div className="item">
                    <p>Comentarios</p>
                    <input placeholder="Comentarios" className="input" {...register("comment")} />
                  </div>
                </Grid>
         
                <Grid item xs={12} md={12} className="buttons">
                  <Button
                    disabled={isLoaderValidating}
                    variant="outlined"
                    color="primary"
                    className="btnsalir"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={isLoaderValidating}
                    variant="contained"
                    color="primary"
                    className="btnGuardar"
                    type="submit"
                    onClick={handleSubmit(validateEmail("saveAndReturn"))}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
        <AddCompanyclient opencompany={openAdd} setOpenCompany={setOpenAdd} />
        {alert?.show && (
          <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
        )}
        {isCreatingProspect && <LoaderCompleteScreen />}
      </NewProspectStyled>
  );
}
