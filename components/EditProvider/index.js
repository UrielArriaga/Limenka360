import { Button, Drawer, Grid } from "@material-ui/core";
import { CloseOutlined, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { device } from "../../styles/global.styles";
import { EntitiesLocal, EquipMents, Etiquetass } from "../../BD/databd";
import Select from "react-select";
import { api } from "../../services/api";
import AlertGlobal from "../Alerts/AlertGlobal";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import RequestCommon from "../../services/request_Common";
import { useRouter } from "next/router";
const DrawerEditProvider = ({ openEdit, setOpenEdit, providerEdit, flag, setFlag }) => {
  const { id_user } = useSelector(userSelector);

  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [entityEdit, setEntityEdit] = useState("");
  const [cityEdit, setCityEdit] = useState("");
  const [comercial, setComercial] = useState([]);

  const router = useRouter();
  const [postalCode, setPostalCode] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loadCities, setLoadCities] = useState(false);
  const commonApi = new RequestCommon();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

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
    if (openEdit) {
      SetValues(providerEdit);
    }
    return () => (mounted = false);
  }, [openEdit]);

  const getComercial = async () => {
    api.get("commercialbusinesses?limit=100&order=name").then(res => {
      setComercial(res.data.results);
    });
  };

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1005`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadProspect = async formData => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Actualizando prospecto", type: "load" });
      let putProvider = {};
      putProvider.name = formData?.name?.toLowerCase();
      putProvider.lastname = formData?.lastname?.toLowerCase();
      putProvider.email = formData.email;
      putProvider.phone = formData.phone;
      putProvider.optionalphone = formData.phoneOptional;
      putProvider.entityId = formData.entity;
      putProvider.companyname = formData.companyname.toLowerCase();
      putProvider.type = formData.type;
      putProvider.street = formData?.street?.toLowerCase();
      putProvider.observations = formData.comment;
      putProvider.rfc = formData.rfc;
      putProvider.identifier = formData.identifier.toLowerCase();
      putProvider.observations = formData.observations.toLowerCase();

      if (formData.commercialbussinessId !== "") {
        putProvider.commercialbussinessId = formData.commercialbussinessId;
      }

      // if (formData.postalcode !== "") {
      //   putProvider.postalId = postalCode;
      // }
      // if (formData.city !== "") {
      //   putProvider.cityId = formData.city;
      // }

      let providerNew = await api.put(`providers/${providerEdit.id}`, putProvider);
      if (providerNew.status == 200) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Proveedor - Editado correctamente!", "basic");
        setTimeout(() => {
          setFlag(!flag);
          resetInputs();
          setOpenEdit(!openEdit);
        }, 1000);
      }
    } catch (error) {
      handleAlert("error", "Proveedor - Ocurrio un problema!", "basic");
      console.log(error.response);
      console.log(error);
    }
  };

  function SetValues(prospect) {
    setValue("name", prospect?.name);
    setValue("lastname", prospect?.lastname);
    setValue("email", prospect?.email);
    setValue("phone", prospect?.phone);
    if (prospect?.optionalphone) {
      setValue("phoneOptional", prospect?.optionalphone);
    }
    setValue("entity", prospect?.entityId);
    setValue("companyname", prospect?.companyname);
    setValue("type", prospect?.type);
    setValue("rfc", prospect?.rfc);
    setValue("identifier", prospect?.identifier);
    setValue("observations", prospect?.observations);

    if (prospect?.commercialbussinessId) {
      setValue("commercialbussinessId", prospect?.commercialbussinessId);
    }

    if (prospect?.postalId) {
      setValue("postalcode", prospect?.postal?.postal_code);
      getEntitieCityByPostals(prospect?.postal?.postal_code);
    }
    setValue("entity", prospect?.entityId);
    getCities(prospect?.entityId);

    if (prospect?.cityId) {
      setValue("city", prospect?.cityId);
      setCityEdit(prospect?.cityId);
    }
    setEntityEdit(prospect?.entityId);

    setValue("street", prospect?.street);
  }

  function resetInputs() {
    setValue("name", "");
    setValue("lastname", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("phoneOptional", "");
    setValue("entity", "");
    setValue("company", "");
    setValue("type", "");
    setValue("rfc", "");
    setValue("identifier", "");
    setValue("observations", "");
    setEntityEdit("");
    setCityEdit("");
    setValue("commercialbussinessId", "");
    setValue("street", "");
    setValue("postalcode", "");
    setSelectedTags([]);
  }

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

  const handleCloseEdit = () => {
    resetInputs();
    setOpenEdit(!openEdit);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <DialogFullScreen anchor="right" open={openEdit} onClose={handleCloseEdit}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCloseEdit} />
            <p className="title">Editar Proveedor</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmit(handleUploadProspect)}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">
            <Person />
            Proveedor <span>{`${providerEdit?.name}`}</span>
          </p>

          <Grid container className="form">
            <Grid item xs={12} md={4}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Nombre <strong>*</strong>
                  </p>

                  {errors.name && errors.name.type == "required" && (
                    <>
                      <div className="point"></div>
                      <Error> Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="Nombre del prospecto"
                  className="input capitalize"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className="item">
                <p>Apellido</p>
                <input
                  placeholder="Apellido"
                  className="input capitalize"
                  {...register("lastname", {
                    required: false,
                  })}
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
                      <div className="point"></div> <Error>Requerido</Error>
                    </>
                  )}
                </div>
                <input
                  placeholder="ejemplo@gmail.com "
                  {...register("email", {
                    required: true,
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
                    required: { value: true, message: "Requerido" },
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
                  placeholder="Digíte número a 10 dígitos "
                  className="input"
                  type="number"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <p>Teléfono opcional</p>
                <input
                  type="number"
                  {...register("phoneOptional", {
                    required: {
                      value: false,
                    },
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
            {/* <Grid item xs={12} sm={6} md={4}>
              <div className="item">
                <p>Código postal</p>

                <input
                  placeholder="Codigo postal"
                  className="input"
                  {...register("postalcode", {
                    required: false,
                    onChange: (e) => {
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
                      <div className="point"></div> <Error>Requerido</Error>
                    </>
                  )}
                </div>
                <select
                  {...register("entity", { required: true })}
                  id="entity"
                  name="entity"
                  className="input"
                  value={entityEdit}
                  onChange={(e) => {
                    setEntityEdit(e.target.value);
                    setCityEdit("");
                    getCities(e.target.value);
                  }}
                >
                  {entityEdit ? (
                    <option value={entityEdit.id} hidden>
                      {entityEdit.name}
                    </option>
                  ) : (
                    <option value="" hidden>
                      Selecciona un Estado
                    </option>
                  )}
                  {EntitiesLocal.map((item, index) => (
                    <option key={index} value={item.id}>
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
                  <select {...register("city", { required: false })} type="text" name="city" id="city" value={cityEdit} className="input" onChange={(e) => setCityEdit(e.target.value)}>
                    {cityEdit ? (
                      <option value={cityEdit?.id} hidden>
                        {cityEdit?.name}
                      </option>
                    ) : (
                      <option value="" hidden>
                        Selecciona un municipio
                      </option>
                    )}
                    {citiesByEntity?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </Grid> */}

            <Grid item xs={12} sm={12} md={12}>
              <div className="item">
                <p>Comentarios</p>
                <input placeholder="Comentarios" className="input" {...register("observations")} />
              </div>
            </Grid>

            <Grid item xs={12} className="ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={handleCloseEdit}>
                Cancelar
              </Button>
              <Button variant="contained" className="btn_upload" onClick={handleSubmit(handleUploadProspect)}>
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

export default DrawerEditProvider;

const DialogFullScreen = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 100%;
    background: #f3f3f3;
    min-height: 100vh;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .ctr_edit {
    &__header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
        }
        .close {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .btn_save {
        text-transform: capitalize;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
    }
    &__ctr_info {
      width: 100%;
      max-width: 1300px;
      margin: auto;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      margin-bottom: 20px;
      height: calc(100% - 100px);
      border-radius: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &__title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;

        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          padding: 5px;
          border-radius: 50%;
          background: rgba(16, 60, 130, 0.5);
          color: #fff;
        }
        span {
          font-weight: bold;
          color: #103c82;
          text-transform: capitalize;
          margin-left: 5px;
        }
      }

      .form {
        .ContentTitleandAlert {
          display: flex;
        }

        .item {
          display: flex;
          align-content: center;
          flex-direction: column;
          font-size: 15px;
          width: auto;
          padding: 5px 9px;

          .input {
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
          }
          .capitalize {
            text-transform: capitalize;
          }
          .inputComments {
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
            height: 25px;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }

          p {
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86 86 86);
          }
          strong {
            color: red;
          }
        }
        .ctr_buttons {
          display: flex;
          justify-content: end;
          margin-top: 20px;

          .btn_cancel {
            background: #0c203b;
            color: #fff;
            text-transform: capitalize;
            margin-right: 10px;
          }
          .btn_upload {
            background: #103c82;
            color: #fff;
            text-transform: capitalize;
          }
        }
        .point {
          width: 0;
          height: 0;
          border-top: 13px solid transparent;
          border-bottom: 13px solid transparent;
          border-right: 13px solid rgba(241, 113, 113, 0.9);
          height: 27px;
          float: left;
        }
      }
    }
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
