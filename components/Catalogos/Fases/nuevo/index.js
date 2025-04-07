import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ArrowBack } from "@material-ui/icons";
import { NewPhasesStyled, Error } from "../../../../styles/Catalogos/Fases/NewPhases";
import Head from "next/head";

export default function NewPhase() {
  const { company } = useSelector(userSelector);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navigateFases = () => {
    router.push("../fases");
  };

  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando fase", type: "load" });

      let jsonToCreate = {};
      jsonToCreate.name = formData.name.toLocaleLowerCase();
      jsonToCreate.objetive = formData.objetive.toLocaleLowerCase();
      jsonToCreate.color = formData.color;
      jsonToCreate.companyId = company;
      let faseNew = await api.post(`phases`, jsonToCreate);
      if (faseNew.status == 201) {
        handleAlert("success", "Fase - ¡Agregada correctamente!", "basic");
        setTimeout(() => {
          router.push("../fases");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Fases - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Fases - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Fases - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Fases - ¡Error al cargar los datos!", "basic");
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
    <NewPhasesStyled>
      <Head>
        <title>CRM JOBS - Nueva Fase</title>
      </Head>
      {/* <NavBarDashboard /> */}

      <div className="main">
        <div className="main_prospects">
          <div className="head">
            <Tooltip title="Regresar">
              <ArrowBack className="arrow" onClick={() => router.push({ pathname: `/catalogos/fases` })} />
            </Tooltip>
            <h1> Agregar Fase</h1>
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
                    placeholder="Nombre de la Fase"
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
                      Objetivo <strong>*</strong>
                    </p>
                    {errors.objetive && (
                      <>
                        <div className="point"></div>
                        <Error>{errors.objetive?.message}</Error>
                      </>
                    )}
                  </div>

                  <input
                    placeholder="Nombre de la Fase"
                    className="input"
                    {...register("objetive", {
                      required: "*Requerido",
                    })}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label className="item">
                  {" "}
                  <p>
                    Color <strong>*</strong>
                  </p>
                  <input
                    placeholder="Nombre de la Fase"
                    type="color"
                    {...register("color", {
                      required: "*Requerido",
                    })}
                  />
                  {errors.color && <Error>{errors.color?.message}</Error>}
                </label>
              </Grid>
              <Grid item xs={12} md={12} className="buttons">
                <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateFases()}>
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
    </NewPhasesStyled>
  );
}
