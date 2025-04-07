import React, { useEffect, useState } from "react";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { Grid, Button, fade, Fade } from "@material-ui/core";
import MainLayout from "../../../../components/MainLayout";
import {Error, TemplatesStyled } from "../../styles/index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import router from "next/router";
import { api } from "../../../../services/api";


export default function TemplateForm() {
  const {
     register,
     handleSubmit,
 
     formState: { errors },
   } = useForm();
   const [showAll, setShowAll] = useState(false);
   const [mensaje, setMensaje] = useState("");
   const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const navigateGroups = () => {
    router.push("../plantillas");
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando plantilla", type: "load" });
      let body = {};
      body.description = formData.description.toLocaleLowerCase();
      body.type = formData.type.toLocaleLowerCase();
      body.share = formData.share;
      body.message = mensaje;
      body.createdbyId = id_user;

      if (formData.share === "0") {
        body.ejecutiveId = id_user;
        body.groupId = "";
        body.companyId = "";
      }

      if (formData.share === "1") {
        body.groupId = groupId;
        body.ejecutiveId = "";
        body.companyId = "";
      }
      if (formData.share === "2") {
        body.groupId = "";
        body.ejecutiveId = "";
        body.companyId = company;
      }

      console.log(body);
      let plantillanew = await api.post("templates", body);
      if (plantillanew.status == 201) {
        handleAlert("success", "Plantilla - ¡Agregada correctamente!", "basic");
        // console.log(plantillanew.status);
        setTimeout(() => {
          router.push("../plantillas");
        }, 2000);
      }
    } catch (err) {

      console.log(err);
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Plantilla - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Plantilla - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Plantilla - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Plantilla - ¡Error al cargar los datos!", "basic");
      }
    }
  };
  const { id_user, groupId, company } = useSelector(userSelector);

  return (
    <MainLayout>
      <TemplatesStyled>
        <div className="main">
          <div className="head">
            <h1> Agregar Plantilla</h1>
          </div>

          <div className="main_prospects">
            <form onSubmit={handleSubmit(createData)}>
              <Grid container className="form">
                <Grid item xs={12} sm={12} md={12}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Titulo de la plantilla <strong>*</strong>
                      </p>

                      {errors.description && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.description?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder=" Ingrese la Descripción"
                      className="input"
                      {...register("description", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Tipo <strong>*</strong>
                      </p>
                      {errors.type && errors.type.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>

                    <select
                      className="input"
                      {...register("type", {
                        required: "*Requerido",
                      })}
                    >
                      <option value="" hidden>
                        Seleccione tipo de mensaje
                      </option>
                      <option value="whatsapp"> Whats App</option>
                      <option value="correo"> Correo</option>
                    </select>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Compartir <strong>*</strong>
                      </p>
                      {errors.type && errors.type.type === "required" && (
                        <>
                          <div className="point"></div> <Error>{"*Requerido"}</Error>
                        </>
                      )}
                    </div>

                    <select
                      className="input"
                      {...register("share", {
                        required: "*Requerido",
                      })}
                    >
                      <option value="" hidden>
                        Seleccione con quien compartir
                      </option>
                      <option value="0"> Solo para mi </option>
                      <option value="1"> Compartir con mi grupo </option>
                      <option value="2"> Compartir para todos </option>
                    </select>
                  </div>
                </Grid>

                <Fade in={showAll}>
                  <Grid item xs={12} md={12} style={{ marginTop: "-0.5%", marginBlockEnd: "1%" }}>
                    <div className="item">
                      <p>
                        Asunto <strong>*</strong>
                      </p>

                      <input
                        placeholder=" Ingrese la Descripción"
                        className="input"
                        {...register("subject", {
                          required: false,
                        })}
                      />
                    </div>
                  </Grid>
                </Fade>

                <Grid item xs={12} md={12} style={{ marginTop: "-1.5%" }}>
                  <label className="item">
                    <p>Mensaje</p>
                    <textarea
                      className="textarea"
                      onChange={e => {
                        setMensaje(e.target.value);
                        console.log(e.target.value);
                      }}
                      value={mensaje}
                    />
                  </label>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className="item">
                    <p>Datos del ejecutivo</p>
                    <select className="input" onChange={e => setMensaje(mensaje + e.target.value)}>
                      <option hidden> Seleccione</option>
                      <option value={"*_${ejecutive.name}_*"}>Nombre del ejecutivo</option>
                      <option value={"*_${ejecutive.lastname}_*"}>Apellido del ejecutivo</option>
                      <option value={"*_${ejecutive.email}_*"}>Correo del ejecutivo</option>
                      <option value={"*_${ejecutive.phone}_*"}> Numero del ejecutivo</option>
                      <option value={"*_${ejecutive.optionalphone}_*"}> Movil del ejecutivo</option>
                      <option value={"*_${ejecutive.company}_*"}> Compañía del ejecutivo</option>
                    </select>
                  </label>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className="item">
                    <p>Datos del Prospecto</p>
                    <select className="input" onChange={e => setMensaje(mensaje + e.target.value)}>
                      <option hidden> Seleccione</option>
                      <option value={"*_${prospect.name}_*"}>Nombre del prospecto</option>
                      <option value={"*_${prospect.lastname}_*"}>Apellido del prospecto</option>
                      <option value={"*_${prospect.email}_*"}>Correo del prospecto</option>
                      <option value={"*_${prospect.phone}_*"}> Numero del prospecto</option>
                      <option value={"*_${prospect.optionalphone}_*"}> Numero opcional del prospecto</option>
                      <option value={"*_${prospect.product}_*"}> Producto del prospecto</option>
                    </select>
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
    </MainLayout>
  );
}
