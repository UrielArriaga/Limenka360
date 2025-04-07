import {
  Grid,
  Button,
  colors,
  useFormControl,
  Snackbar,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBarDashboard from "../components/NavBarPrueba";

const Prospectos = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const createData = (formData, e) => {
    console.log(formData);
  };

  return (
    <ProspectsStyles>
      <div className="overflow">
        <div>
          <NavBarDashboard />
          <div className="main">
            <h3>Nuevo Prospecto</h3>
            <div className="main_prospects">
              {" "}
              <form onSubmit={handleSubmit(createData)}>
                <Grid container className="form">
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>
                        Nombre <strong>*</strong>
                      </p>
                      <input
                        autoComplete="false"
                        placeholder="Nombre"
                        className="input"
                        {...register("name", {
                          required: "*Requerido",
                        })}
                      />
                      <Error>{errors.name?.message}</Error>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p> Apellidos </p>
                      <input
                        autoComplete="false"
                        placeholder="Apellidos"
                        className="input"
                        {...register("lastName")}
                      />
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p> Genero</p>
                      <select className="input" {...register("gender")}>
                        <option value={""} hidden>
                          Selecciona una Opción
                        </option>
                        <option value={"Mujer"}>Mujer</option>
                        <option value={"Hombre"}>Hombre</option>
                      </select>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p>
                        {" "}
                        Número telefónico<strong>*</strong>
                      </p>
                      <input
                        autoComplete="false"
                        placeholder="Digíte numero a 10 dígitos "
                        className="input"
                        {...register("phone", {
                          required: "*Requerido",
                          maxLength: {
                            value: 10,
                            message: "*Máximo 10 Caracteres",
                          },
                          minLength: {
                            value: 10,
                            message: "*Minimo 10 Caracteres",
                          },
                          pattern: {
                            value: /[0-9]+/i,
                            message: "*Caracter Invalido",
                          },
                        })}
                      />
                      <Error>{errors.phone?.message}</Error>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p> Número telefónico opcional</p>
                      <input
                        autoComplete="false"
                        {...register("phoneOptional", {
                          maxLength: {
                            value: 10,
                            message: "*Máximo 10 Caracteres",
                          },
                          minLength: {
                            value: 10,
                            message: "*Minimo 10 Caracteres",
                          },
                          pattern: {
                            value: /[0-9]+/i,
                            message: "*Caracter Invalido",
                          },
                        })}
                        placeholder="Digíte numero a 10 dígitos "
                        className="input"
                      />
                      <Error>{errors.phoneOptional?.message}</Error>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>
                        Correo <strong>*</strong>
                      </p>
                      <input
                        autoComplete="false"
                        placeholder="Correo"
                        className="input"
                        {...register("email", {
                          required: "*Requerido",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[0-9A-Z.-]+\.[A-Z]{2,4}$/i,
                            message: "*Correo Invalido",
                          },
                        })}
                      />
                      <Error>{errors.email?.message}</Error>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p>Calle</p>
                      <input
                        {...register("street")}
                        placeholder="Calle"
                        className="input"
                      />
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p>
                        {" "}
                        Código Postal<strong>*</strong>
                      </p>
                      <input
                        placeholder="c.p"
                        className="input"
                        type="number"
                        {...register("postal", {
                          required: "*Requerido",
                          maxLength: {
                            value: 5,
                            message: "*Máximo 5 Carácteres",
                          },
                        })}
                      />
                      <Error>{errors.postal?.message}</Error>
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p> Colonia</p>
                      <input
                        {...register("cologne")}
                        placeholder="Colonia"
                        className="input"
                      />
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>
                        Estado<strong>*</strong>
                      </p>
                      <select
                        className="input"
                        {...register("stated", {
                          required: true,
                        })}
                      >
                        <option hidden value="">
                          Selecciona una Opción
                        </option>
                        {EntitiesLocal.map((item) => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.stated && errors.stated.type === "required" && (
                        <Error>{"Requerido"}</Error>
                      )}
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      <p>
                        {" "}
                        Municipio <strong>*</strong>
                      </p>
                      <select
                        className="input"
                        {...register("municipality", {
                          required: true,
                        })}
                      >
                        <option hidden value="">
                          {" "}
                          Selecciona una Opción
                        </option>

                        {CitiesLocal.map((item) => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.municipality && errors.municipality.type === "required" && (
                        <Error>{"Requerido"}</Error>
                      )}
                    </label>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>Nombre de la Empresa</p>
                      <input
                        placeholder="Nombre de la compañía"
                        className="input"
                        {...register("companyName")}
                      />
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>
                        Origen <strong>*</strong>
                      </p>
                      <select
                        className="input"
                        {...register("origin", {
                          required: true,
                        })}
                      >
                        <option hidden value="">
                          Selecciona una Opción
                        </option>
                        <option value={"Facebook"}>Facebook</option>
                        <option value={"Google"}>Google</option>
                        <option value={"Instagram"}>Instagram</option>
                        <option value={"Llamada"}>Llamada</option>
                        <option value={"Propio"}>Propio</option>
                      </select>
                      {errors.origin && errors.origin.type === "required" && (
                        <Error>{"Requerido"}</Error>
                      )}
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>
                        Equipo <strong>*</strong>
                      </p>
                      <select
                        className="input"
                        {...register("equiptment", {
                          required: true,
                        })}
                      >
                        <option hidden value={""}>
                          Selecciona una Opción
                        </option>
                        <option value={"Arcos en c"}>Arcos en c</option>
                        <option value={"Amalgamadores"}>Amalgamadores</option>
                        <option value={"Aspiradores"}>Aspiradores</option>
                        <option value={"Audiometros"}>Audiometros</option>
                        <option value={"Autoclaves"}>Autoclaves</option>
                      </select>
                      {errors.equiptment &&
                        errors.equiptment.type === "required" && (
                          <Error>{"Requerido"}</Error>
                        )}
                    </label>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <label className="item">
                      {" "}
                      <p>Pagina web</p>
                      <input
                        placeholder="Pagina web"
                        className="input"
                        {...register("pageWeb")}
                      />
                    </label>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={12}
                    className="buttons"
                    // style={{ marginBlockEnd: 50, marginTop: 20 }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      className="btnsalir"
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="btnGuardar"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProspectsStyles>
  );
};

export default Prospectos;
const Error = styled.div`
  color: #bf1650;
  display: flex;
  align-items: center;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
const ProspectsStyles = styled.div`
  display: flex;
  align-items: flex-start;
  display: flex;
  background: #5156be14;
  overflow: hidden;
  height: 100vh;
  .overflow {
    width: 100%;
    overflow-y: scroll;
    height: 100vh;
  }
  p {
    padding: 0;
    margin: 0;
  }

  .main {
    padding: 15px 36px 34px 36px;
    h3 {
      font-size: 12pt;
      margin-bottom: 20px;
      color: #495057;
    }
  }

  .main_prospects {
    padding: 30px;
    margin-top: 20px;
    /* height: 80vh;
    max-height:80vh; */
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
    .MuiSnackbarContent-root {
      color: #fff;
      display: flex;
      padding: 6px 16px;
      flex-grow: 1;
      flex-wrap: wrap;
      font-size: 0.875rem;
      align-items: center;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.43;
      border-radius: 4px;
      letter-spacing: 0.01071em;
      background-color: #f44336;
    }

    .MuiPaper-elevation6 {
      box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
        0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
      background-color: #f44336;
    }
    .MuiSnackbar-anchorOriginTopRight {
      top: 94px;
      left: auto;
      right: 24px;
    }
  }
  .form {
    .item {
      display: flex;
      align-content: center;
      flex-direction: column;
      font-size: 15px;
      width: auto;
      padding: 10px;
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
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: end;
    }
    .btnsalir {
      margin-right: 15px;
    }
  }
`;
const EntitiesLocal = [
  {
    _id: "61d4691477616e74ffda7600",
    name: "Aguascalientes",
    createdAt: "2021-06-21T15:54:47.108Z",
    updatedAt: "2021-06-21T15:54:47.108Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7601",
    name: "Baja California",
    createdAt: "2021-06-21T15:55:02.983Z",
    updatedAt: "2021-06-21T15:55:02.983Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7602",
    name: "Baja California Sur",
    createdAt: "2021-06-21T15:55:18.352Z",
    updatedAt: "2021-06-21T15:55:18.352Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7603",
    name: "Campeche",
    createdAt: "2021-06-21T15:55:33.068Z",
    updatedAt: "2021-06-21T15:55:33.068Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7604",
    name: "Chiapas",
    createdAt: "2021-06-21T15:55:45.585Z",
    updatedAt: "2021-06-21T15:55:45.585Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7605",
    name: "Chihuahua",
    createdAt: "2021-06-21T15:55:59.975Z",
    updatedAt: "2021-06-21T15:55:59.975Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7606",
    name: "Ciudad de México",
    createdAt: "2021-06-21T15:56:13.452Z",
    updatedAt: "2021-06-21T15:56:13.452Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7607",
    name: "Coahuila",
    createdAt: "2021-06-21T15:56:29.936Z",
    updatedAt: "2021-06-21T15:56:29.936Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7608",
    name: "Colima",
    createdAt: "2021-06-21T15:56:48.022Z",
    updatedAt: "2021-06-21T15:56:48.022Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "61d4691477616e74ffda7609",
    name: "Durango",
    createdAt: "2021-06-21T15:57:03.271Z",
    updatedAt: "2021-06-21T15:57:03.271Z",
    updateAt: "2022-02-21T17:27:05.402Z",
  },
  {
    _id: "620fdc1ec8c1ad62b6687c6a",
    name: "Estado de México",
    createdAt: "2022-02-18T17:49:18.854Z",
    updateAt: "2022-02-18T17:49:18.854Z",
  },
  {
    _id: "61d4691477616e74ffda760a",
    name: "Guanajuato",
    createdAt: "2021-06-21T15:57:17.317Z",
    updatedAt: "2021-06-21T15:57:17.317Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda760b",
    name: "Guerrero",
    createdAt: "2021-06-21T15:57:30.237Z",
    updatedAt: "2021-06-21T15:57:30.237Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda760c",
    name: "Hidalgo",
    createdAt: "2021-06-21T15:57:43.391Z",
    updatedAt: "2021-06-21T15:57:43.391Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "620fd3623b7f3a5ea478e35e",
    name: "Jalisco",
    createdAt: "2021-06-21T15:57:56.022Z",
    updatedAt: "2021-06-21T15:57:56.022Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda760e",
    name: "Michoacán",
    createdAt: "2021-06-21T15:58:11.317Z",
    updatedAt: "2021-06-21T15:58:11.317Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda760f",
    name: "Morelos",
    createdAt: "2021-06-21T15:58:28.500Z",
    updatedAt: "2021-06-21T15:58:28.500Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7610",
    name: "Nayarit",
    createdAt: "2021-06-21T15:58:40.549Z",
    updatedAt: "2021-06-21T15:58:40.549Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7611",
    name: "Nuevo León",
    createdAt: "2021-06-21T15:58:55.852Z",
    updatedAt: "2021-06-21T15:58:55.852Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7612",
    name: "Oaxaca",
    createdAt: "2021-06-21T15:59:09.479Z",
    updatedAt: "2021-06-21T15:59:09.479Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7613",
    name: "Puebla",
    createdAt: "2021-06-21T15:59:23.702Z",
    updatedAt: "2021-06-21T15:59:23.702Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7614",
    name: "Querétaro",
    createdAt: "2021-06-21T15:59:40.678Z",
    updatedAt: "2021-06-21T15:59:40.678Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7615",
    name: "Quintana Roo",
    createdAt: "2021-06-21T15:59:55.934Z",
    updatedAt: "2021-06-21T15:59:55.934Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7616",
    name: "San Luis Potosí",
    createdAt: "2021-06-21T16:00:13.174Z",
    updatedAt: "2021-06-21T16:00:13.174Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7617",
    name: "Sinaloa",
    createdAt: "2021-06-21T16:00:27.471Z",
    updatedAt: "2021-06-21T16:00:27.471Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7618",
    name: "Sonora",
    createdAt: "2021-06-21T16:00:40.561Z",
    updatedAt: "2021-06-21T16:00:40.561Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda7619",
    name: "Tabasco",
    createdAt: "2021-06-21T16:00:53.426Z",
    updatedAt: "2021-06-21T16:00:53.426Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda761a",
    name: "Tamaulipas",
    createdAt: "2021-06-21T16:01:05.564Z",
    updatedAt: "2021-06-21T16:01:05.564Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda761b",
    name: "Tlaxcala",
    createdAt: "2021-06-21T16:01:18.641Z",
    updatedAt: "2021-06-21T16:01:18.641Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda761c",
    name: "Veracruz",
    createdAt: "2021-06-21T16:01:30.285Z",
    updatedAt: "2021-06-21T16:01:30.285Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda761d",
    name: "Yucatán",
    createdAt: "2021-06-21T16:01:42.627Z",
    updatedAt: "2021-06-21T16:01:42.627Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
  {
    _id: "61d4691477616e74ffda761e",
    name: "Zacatecas",
    createdAt: "2021-06-21T16:01:53.656Z",
    updatedAt: "2021-06-21T16:01:53.656Z",
    updateAt: "2022-02-21T17:27:05.403Z",
  },
];
const CitiesLocal = [
  {
    counter: 0,
    _id: "620d1d7b8c2ccb5059639fc3",
    name: "Atizapán",
    entity: "620fdc1ec8c1ad62b6687c6a",
    createdAt: "2022-02-16T15:51:23.378Z",
    updateAt: "2022-02-18T18:04:18.139Z",
    latitude: "19.55939028571429",
    longitude: "-99.28491371428572",
  },
];
