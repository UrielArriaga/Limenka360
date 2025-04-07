import React, { useState } from "react";
import { Add, ArrowBack } from "@material-ui/icons";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { useForm } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { api } from "../../../../services/api";
import router from "next/router";
import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import DirectorLayout from "../../../../layouts/DirectorLayout";
import Head from "next/head";

export default function NewTypeClient() {
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigateBack = () => {
    router.push("../tiposclientes");
  };

  const createData = async formData => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Tipo de cliente", type: "load" });
      let body = {};
      body.name = formData.name.toLocaleLowerCase();
      body.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      console.log(body);
      let newChanel = await api.post("clienttypes", body);
      if (newChanel.status === 201) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Tipo de cliente - ¡Agregado correctamente!", "basic");

        setTimeout(() => {
          router.push("../tiposclientes");
        }, 2000);
      }
    } catch (error) {
      switch (error.request?.status) {
        case 401:
          return handleAlert("erroror", "Tipo de cliente - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Tipo de cliente - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Tipo de cliente - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Tipo de cliente - ¡Error al cargar los datos!", "basic");
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
    <DirectorLayout>
      <NewTypeClientStyled>
        <Head>
          <title>CRM JOBS - Nuevo Tipo de cliente</title>
        </Head>
        {/* <NavBarDashboard /> */}

        <div className="main">
          <div className="main_prospects">
            <div className="head">
              <Tooltip title="Regresar">
                <ArrowBack className="arrow" onClick={() => router.push({ pathname: `/catalogos/tiposclientes` })} />
              </Tooltip>
              <h1> Agregar Tipo de Cliente</h1>
            </div>{" "}
            <form onSubmit={handleSubmit(createData)}>
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
                          <Error>{errors.name?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Tipo de cliente"
                      className="input"
                      {...register("name", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={12} className="buttons">
                  <Button
                    disabled={Alert.show}
                    variant="outlined"
                    color="primary"
                    className="btnsalir"
                    onClick={() => navigateBack()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={Alert.show}
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
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </NewTypeClientStyled>
    </DirectorLayout>
  );
}

const NewTypeClientStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  height: 100%;
  background-position: bottom center;
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }

  .main {
    padding: 6px 20px 47px;
    width: calc(115% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
    .head {
      display: flex;
      align-items: center;
      margin-block-end: 2%;
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
      .arrow {
        width: 40px;
        height: 40px;
        color: #103c82;
        font-size: 15px;
        margin-top: 10px;
        margin-left: 5px;
        background-color: none;
        border-radius: 35px;
        border: 1px solid whitesmoke;
        margin-right: 1%;
        cursor: pointer;
        &:hover {
          transition: 1s;
          transform: translate(-10px);
        }
      }
    }
    .main_prospects {
      padding: 30px;

      background-color: rgba(255, 255, 255, 0.85);
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
        min-height: 38px;
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
