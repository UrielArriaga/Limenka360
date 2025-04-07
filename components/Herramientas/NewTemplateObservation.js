//nuevo

import React, { useEffect, useState } from "react";
import AlertGlobal from "../Alerts/AlertGlobal";
import { Add, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import NavBarDashboard from "../NavBarDashboard";
import { Controller, useForm } from "react-hook-form";
import { Grid, Button, fade, Fade } from "@material-ui/core";
import { useSelector } from "react-redux";
import { api } from "../../services/api";
import router from "next/router";
import styled from "styled-components";
import { device } from "../../styles/global.styles";
import { userSelector } from "../../redux/slices/userSlice";
import Select from "react-select";
import { formatDate, toUpperCaseChart } from "../../utils";
import MainLayout from "../MainLayout";

export default function NewTemplateObservation() {
  const { id_user, userData } = useSelector(userSelector);
  const [mensaje, setMensaje] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const {
    register,
    handleSubmit,
    setValue,
    control,

    formState: { errors },
  } = useForm();

  const navigateGroups = () => {
    router.push("../plantillasObservaciones");
  };

  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Observación", type: "load" });
      let body = {};
      body.data = formData.data.toLocaleLowerCase();
      body.ejecutiveId = id_user;
      body.name = formData.name;
      body.color = formData.color;
      body.createdbyId = id_user;
      console.log(body);
      let Observation = await api.post("observations", body);
      if (Observation.status == 201) {
        handleAlert("success", "Observación - ¡Agregada correctamente!", "basic");
        // console.log(Observation.status);
        setTimeout(() => {
          router.push("../plantillasObservaciones");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Observaciónes - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Observaciónes - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Observaciónes - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Observaciónes - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <TemplatesStyled>
      {/* <NavBarDashboard /> */}
      <div className="main">
        <div className="main_prospects">
          <div className="head">
            <h1> Agregar Observación</h1>
          </div>
          <form onSubmit={handleSubmit(createData)}>
            <Grid container className="form">
              <Grid item xs={12} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Nombre <strong>*</strong>
                    </p>
                    {errors.name && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.name?.message}</Error>
                      </>
                    )}
                  </div>
                  <input
                    placeholder="Nombre de la observación"
                    className="input"
                    {...register("name", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>

              <Grid item xs={12} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>Ejecutivo</p> <strong>*</strong>
                    {errors.ejecutiveId && errors.ejecutiveId.type === "required" && (
                      <>
                        <div className="point"></div> <Error>{"*Requerido"}</Error>
                      </>
                    )}
                  </div>

                  <input
                    name="ejecutiveId"
                    type="text"
                    className="input"
                    disabled
                    value={`${toUpperCaseChart(userData.name)} ${toUpperCaseChart(userData.lastname)}`}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <label className="item">
                  <p>Color</p>
                  <input
                    style={{ marginBlockEnd: "1%" }}
                    placeholder="Nombre de la Fase"
                    type="color"
                    {...register("color", {
                      required: false,
                    })}
                  />
                  {errors.color && <Error>{errors.color?.message}</Error>}
                </label>
              </Grid>
              <Grid item xs={12} md={12} style={{ marginTop: "-1.5%" }}>
                <label className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Observación <strong>*</strong>{" "}
                    </p>
                    {errors.data && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.data?.message}</Error>
                      </>
                    )}
                  </div>
                  <textarea
                    className="textarea"
                    {...register("data", {
                      required: "*Requerido",
                    })}
                  />
                </label>
              </Grid>

              <Grid item xs={12} md={12} className="buttons">
                <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateGroups()}>
                  Cancelar
                </Button>
                <Button variant="contained" color="primary" className="btnGuardar" type="submit">
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
    </TemplatesStyled>
  );
}

const TemplatesStyled = styled.div`
  width: 100%;
  margin: auto;
  margin: 0;
  padding: 0;
  height: 100%;
  background-position: bottom center;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .head {
      display: flex;
      align-items: center;
      margin-block-end: 1%;
      h1 {
        font-size: 24px;
      }

      &__title {
        display: flex;
        align-items: center;

        svg {
          font-size: 30px;
          color: #fff;
          border: 1px solid #fff;
          margin-left: 20px;
          border-radius: 50%;
        }
      }
    }
    .main_prospects {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      background-color: rgba(255, 255, 255, 0.85);

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
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
          0px 1px 18px 0px rgb(0 0 0 / 12%);
        background-color: #f44336;
      }
      .MuiSnackbar-anchorOriginTopRight {
        top: 94px;
        left: auto;
        right: 24px;
      }
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
      padding: 2px 9px;
      margin-top: 1%;

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
        min-height: 38px;
      }
      .textarea {
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
        min-height: 398px;
        resize: none;
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
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: end;
    }
    .btnsalir {
      margin-right: 15px;
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
