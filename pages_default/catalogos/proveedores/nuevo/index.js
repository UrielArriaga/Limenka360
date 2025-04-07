import React, { useEffect, useState } from "react";
import { NewProspectStyled, Error } from "../../../../styles/Propectos/NewProspect";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { useForm } from "react-hook-form";
import { Grid, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import SideBar from "../../../../components/SideBar";
import { EntitiesLocal, EquipMents, Etiquetass } from "../../../../BD/databd";
import { api } from "../../../../services/api";
import { companySelector } from "../../../../redux/slices/companySlice";
import { useSelector } from "react-redux";

export default function NewProspect() {
  const { id_company } = useSelector(companySelector);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [loadCities, setLoadCities] = useState(false);
  const [comercial, setComercial] = useState([]);
  const [city, setCity] = useState("");
  const [entity, setEntity] = useState("");
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [postalCode, setPostalCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    const getDataInitial = async () => {
      getComercial();
    };
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, []);

  const getComercial = async () => {
    api.get("commercialbusinesses?limit=100&order=name").then(res => {
      setComercial(res.data.results);
      console.log(res.data.results);
    });
  };

  const handleCreateProspect = async formData => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando proveedor", type: "load" });
      let newProvider = {};
      console.log(newProvider);

      newProvider.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      newProvider.name = formData?.name?.toLowerCase();
      newProvider.lastname = formData?.lastname?.toLowerCase();
      newProvider.email = formData.email;
      newProvider.phone = formData.phone;
      newProvider.optionalphone = formData.optionalphone;
      newProvider.rfc = formData.rfc;
      newProvider.observations = formData.comment;
      newProvider.street = formData?.street?.toLowerCase();
      newProvider.identifier = formData.identifier;
      newProvider.entityId = formData.entity;
      newProvider.companyname = formData.companyname.toLowerCase();
      newProvider.type = formData.type;
      newProvider.nifcif = formData.nifcif;
      newProvider.observations = formData.observations;
      newProvider.commercialbussinessId = formData.commercialbussinessId;
      if (formData.postalcode !== "") {
        newProvider.postalId = postalCode;
      }
      if (formData.city !== "") {
        newProvider.cityId = formData.city;
      }
      console.log(newProvider);
      let providerNew = await api.post("providers", newProvider);
      if (providerNew.status == 201) {
        console.log(newProvider);
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Proveedor - Creado correctamente!", "basic");
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    } catch (error) {
      switch (error.request?.status) {
        case 401:
          return handleAlert("error", "Proveedor - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Proveedor - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Proveedor - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Proveedor - ¡Error al cargar los datos!", "basic");
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

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1007`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <NewProspectStyled>
      <SideBar open={open} setOpen={setOpen} />

      <NavBarDashboard sideBar={true} />

      <div className="main">
        <div className="head">
          <h1> Nuevo Proveedor</h1>
        </div>

        <div className="main_prospects">
          <form onSubmit={handleSubmit(handleCreateProspect)}>
            <Grid container className="form">
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
                    placeholder="Nombre del Proveedor"
                    className="input"
                    {...register("name", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      {" "}
                      Apellidos <strong>*</strong>{" "}
                    </p>

                    {errors.lastname && (
                      <>
                        <div className="point"></div>
                        <Error> {errors.lastname?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Apellidos"
                    className="input"
                    {...register("lastname", { required: "*Requerido" })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Correo <strong>*</strong>
                    </p>
                    {errors.email && (
                      <>
                        <div className="point"></div> <Error>{errors.email?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="ejemplo@gmail.com "
                    {...register("email", {
                      required: "*Requerido",
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
                    <p>
                      Teléfono <strong>*</strong>
                    </p>
                    {errors.phone && (
                      <>
                        <div className="point"></div> <Error>{errors.phone?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    {...register("phone", {
                      required: "*Requerido",
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

                    {errors.optionalphone && (
                      <>
                        <div className="point"></div> <Error>{errors.optionalphone?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    type="number"
                    {...register("optionalphone", {
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
                  <p>Compañía</p>
                  <input {...register("companyname")} placeholder="Ingrese nombre de la Compañía" className="input" />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p> Tipo </p>
                  <select className="input" {...register("type")}>
                    <option value={""} hidden>
                      Selecciona una Opción
                    </option>
                    <option value={"Mujer"}>Servicios</option>
                    <option value={"Hombre"}>Hombre</option>
                  </select>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      RFC <strong>*</strong>
                    </p>
                    {errors.rfc && (
                      <>
                        <div className="point"></div> <Error>{errors.rfc?.message}</Error>
                      </>
                    )}
                  </div>

                  <input
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
                  <p>NIFCIF</p>
                  <input {...register("nifcif")} placeholder="Ingrese nifcif" className="input" />
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Identificador</p>
                  <input {...register("identifier")} placeholder="Ingrese identificador" className="input" />
                </div>
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Giro comercial <strong>*</strong>
                    </p>
                    {errors.commercialbussinessId && (
                      <>
                        <div className="point"></div>
                        <Error> {errors.commercialbussinessId?.message}</Error>
                      </>
                    )}
                  </div>
                  <select className="input" {...register("commercialbussinessId", { required: "*Requerido" })}>
                    <option hidden value="">
                      Selecciona una Opción
                    </option>
                    {comercial.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid> */}

              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Calle</p>
                  <input placeholder="Calle" className="input" {...register("street")} />
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
                    <p>
                      Estado <strong>*</strong>
                    </p>
                    {errors.entity && errors.entity.type === "required" && (
                      <>
                        <div className="point"></div> <Error>{"*Requerido"}</Error>
                      </>
                    )}
                  </div>
                  <select
                    {...register("entity", { required: true })}
                    id="entity"
                    name="entity"
                    className="input"
                    value={entity}
                    onChange={e => {
                      setEntity(e.target.value);
                      setCity("");
                      getCities(e.target.value);
                    }}
                  >
                    {entity ? (
                      <option value={entity.id} hidden>
                        {entity.name}
                      </option>
                    ) : (
                      <option value="" hidden>
                        Selecciona un Estado
                      </option>
                    )}
                    {EntitiesLocal.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div className="item">
                  <p>Municipio</p>

                  {loadCities ? (
                    <select className="input">
                      <option>Obteniendo municipios....</option>
                    </select>
                  ) : (
                    <select
                      {...register("city", { required: false })}
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      className="input"
                      onChange={e => setCity(e.target.value)}
                    >
                      {city ? (
                        <option value={city?.id} hidden>
                          {city?.name}
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

              <Grid item xs={12}>
                <div className="item">
                  <p>Observaciones</p>
                  <input placeholder="Ingresa observaciones" className="input" {...register("observations")} />
                </div>
              </Grid>

              <Grid item xs={12} md={12} className="buttons">
                <Button
                  disabled={alert.show}
                  variant="outlined"
                  color="primary"
                  className="btnsalir"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>
                <Button disabled={alert.show} variant="contained" color="primary" className="btnGuardar" type="submit">
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      {alert?.show && (
        <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
      )}
    </NewProspectStyled>
  );
}
