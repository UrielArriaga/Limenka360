import React, { useState } from "react";
import { Add, ArrowBack } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { api } from "../../../../services/api";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { Error, NewCategorieStyled } from "../../../../styles/Compras/categorias";

export default function NewCategorie() {
  const { company } = useSelector(userSelector);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const navigateCategories = () => {
    router.push("../categorias");
  };

  const createData = async (formData, e) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando categoría", type: "load" });

      let body = {};
      body.name = formData.name.toLocaleLowerCase();
      body.companyId = company;

      let categoriaNew = await api.post("categories", body);
      if (categoriaNew.status == 201) {
        handleAlert("success", "Categoría - ¡Agregada correctamente!", "basic");
        console.log(categoriaNew.data);
        setTimeout(() => {
          router.push("../categorias");
        }, 2000);
      }
    } catch (err) {
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Categoría - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Categoría - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Categoría - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Categoría - ¡Error al cargar los datos!", "basic");
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
      <NewCategorieStyled>
        <div className="main">
          <div className="main_prospects">
            <div className="head">
              <div className="head__title">
                <Tooltip title="Regresar">
                  <ArrowBack className="arrow" onClick={() => router.push({ pathname: `/compras/categorias` })} />
                </Tooltip>
                <h1> Agregar Categoría</h1>
              </div>
            </div>
            <form onSubmit={handleSubmit(createData)}>
              <Grid container className="form">
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        {" "}
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
                      placeholder="Nombre de la Categoría"
                      className="input"
                      {...register("name", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>

                <Grid item xs={12} md={12} className="buttons">
                  <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateCategories()}>
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
      </NewCategorieStyled>
    </MainLayout>
  );
}
