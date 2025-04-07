import React, { useState } from "react";
import { Add, ArrowBack } from "@material-ui/icons";
import { NewProspectStyled, Error } from "../../../../styles/Propectos/NewProspect";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { useForm } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { userSelector } from "../../../../redux/slices/userSlice";
import MainLayout from "../../../../components/MainLayout";

export default function NewProspect() {
  const { company } = useSelector(userSelector);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigateEtiquetas = () => {
    router.push("../etiquetas");
  };

  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando etiqueta", type: "load" });

      let dataJson = {};
      dataJson.label = formData.name.toLocaleLowerCase();
      dataJson.color = formData.color;
      dataJson.companyId = company;
      console.log(dataJson);

      let etiquetaNew = await api.post("labels", dataJson);
      if (etiquetaNew.status == 201) {
        handleAlert("success", "Etiqueta - ¡Agregada correctamente!", "basic");

        setValue("name", "");
        setValue("color", "");
        setTimeout(() => {
          router.push("../etiquetas");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Etiqueta - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Etiqueta - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Etiqueta - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Etiqueta - ¡Error al cargar los datos!", "basic");
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
    <MainLayout>
      <NewProspectStyled>
        {/* <NavBarDashboard /> */}
        <div className="main">
          <div className="head">
            <Tooltip title="Regresar">
              <ArrowBack className="arrow" onClick={() => router.push({ pathname: `/catalogos/etiquetas` })} />
            </Tooltip>
            <h1> Agregar Etiqueta</h1>
          </div>

          <div className="main_prospects">
            {" "}
            <form onSubmit={handleSubmit(createData)}>
              <Grid container className="form">
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Nombre de la etiqueta<strong>*</strong>
                      </p>
                      {errors.name && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.name?.message}</Error>
                        </>
                      )}
                    </div>

                    <input
                      placeholder="Nombre de la etiqueta"
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
                        Color <strong>*</strong>
                      </p>
                      {errors.color && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.color?.message}</Error>
                        </>
                      )}
                    </div>

                    <input
                      type="color"
                      {...register("color", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={12} className="buttons">
                  <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateEtiquetas()}>
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
      </NewProspectStyled>
    </MainLayout>
  );
}
