import React, { useState } from "react";
import { Add, CameraAlt } from "@material-ui/icons";
import NavBarDashboard from "../../../../components/NavBarDashboard";
import { useForm } from "react-hook-form";
import { Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../../../../redux/slices/companySlice";
import { api } from "../../../../services/api";
import router from "next/router";
import AlertGlobal from "../../../../components/Alerts/AlertGlobal";
import { handleGlobalAlert, validateURL } from "../../../../utils";
import SideBar from "../../../../components/SideBar";
import LoaderCompleteScreen from "../../../../components/LoaderCompleteScreen";
import { Error, NewGroupStyled } from "../../../../styles/Catalogos/Grupos/NewGroups";
import DirectorLayout from "../../../../layouts/DirectorLayout";
import Head from "next/head";

export default function NewProspect() {
  const dispatch = useDispatch();
  const { id_company } = useSelector(companySelector);
  const [logo, setLogo] = useState({ url: "", file: undefined });
  const [linkLogo, setLinkLogo] = useState("");
  const [deleteLinkLogo, setDeleteLinkLogo] = useState("");
  const [isDeleteLogo, setIsDeleteLogo] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigateGroups = () => {
    router.push("../grupos");
  };

  const createData = async (formData, nameLogo) => {
    try {
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Grupo", type: "load" });
      setIsCreatingGroup(true);
      let body = {};
      body.name = formData.name.toLocaleLowerCase();
      body.primarycolor = formData.primarycolor;
      body.secondarycolor = formData.secondarycolor;
      body.companyId = "62dz3qnimTqzfPfKpt7JtOtE";
      body.code = formData.code;
      if (isDeleteLogo === true) {
        body.logo = "";
      } else {
        body.logo = nameLogo;
      }
      let newGroup = await api.post("groups", body);
      if (newGroup.status == 201) {
        handleAlert("success", "Grupo - ¡Agregado correctamente!", "basic");
        setTimeout(() => {
          router.push("../grupos");
          setIsCreatingGroup(false);
        }, 2000);
      }
    } catch (err) {
      setIsCreatingGroup(false);
      switch (err.request?.status) {
        case 401:
          return handleAlert("error", "Grupos - ¡No cuentas con las credenciales!", "basic");
        case 403:
          return handleAlert("error", "Grupos - ¡No tienes permisos!", "basic");
        case 404:
          return handleAlert("error", "Grupos - ¡Ruta no encontrada!", "basic");

        default:
          return handleAlert("error", "Grupos - ¡Error al cargar los datos!", "basic");
      }
    }
  };

  const showTheLogo = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop().toLocaleLowerCase();
    let acceptFile = ["jpg", "png", "jpeg"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0)
      return handleGlobalAlert("warning", "Grupos-Tipo de archivo no adminitido.", "basic", dispatch, 6000);
    const url = URL.createObjectURL(e.target.files[0]);
    setLogo({ url: url, file: e.target.files[0] });
  };

  const string_to_slug = str => {
    str = str.replace(/(<([^>]+)>)/gi, " ");
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    return str;
  };

  const deleteLogo = () => {
    setIsDeleteLogo(true);
    setLinkLogo("");
    setLogo("");
    setDeleteLinkLogo(linkLogo);
  };

  const onSubmit = data => {
    uploadLogo(logo?.file, logo.file?.name, true, data);
  };

  const uploadLogo = async (file, name, type, dataGroup) => {
    if (file !== undefined) {
      try {
        let cleanName = string_to_slug(name);
        let newData = new FormData();
        newData.append("name", name);
        newData.append("file", file);
        let results = await api.post(`files/upload/${cleanName}`, newData);
        createData(dataGroup, results.data.name);
      } catch (error) {
        console.log(error);
        // props.handleAlert("error", "Error - No se Subió la Imagen", "basic", props.setAlert);
      }
    } else {
      createData(dataGroup, linkLogo);
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
      <NewGroupStyled>
        <Head>
          <title>CRM JOBS - Nuevo Grupo</title>
        </Head>
        {/* <SideBar />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="main_prospects">
            <div className="head">
              <p className="titleForm"> Agregar Grupo</p>
            </div>

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
                      placeholder="Nombre del Grupo"
                      className="input"
                      {...register("name", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label className="item">
                    {" "}
                    <p>
                      Color primario <strong>*</strong>
                    </p>
                    <input
                      placeholder="Nombre de la Fase"
                      type="color"
                      {...register("primarycolor", {
                        required: false,
                      })}
                    />
                    {errors.primarycolor && <Error>{errors.primarycolor?.message}</Error>}
                  </label>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <label className="item">
                    {" "}
                    <p>
                      Color secundario<strong>*</strong>
                    </p>
                    <input
                      placeholder="Nombre de la Fase"
                      type="color"
                      {...register("secondarycolor", {
                        required: false,
                      })}
                    />
                    {errors.secondarycolor && <Error>{errors.secondarycolor?.message}</Error>}
                  </label>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <div className="item">
                    <div className="ContentTitleandAlert">
                      <p>
                        Codigo <strong>*</strong>
                      </p>
                      {errors.code && (
                        <>
                          <div className="point"></div>
                          <Error>{errors.code?.message}</Error>
                        </>
                      )}
                    </div>
                    <input
                      placeholder="Codigo del Grupo"
                      className="input"
                      {...register("code", {
                        required: "*Requerido",
                      })}
                    />
                  </div>
                </Grid>{" "}
                <Grid item xs={12} sm={4} md={4} className="imageContainer">
                  <Grid item xs={12} md={12} className="logo">
                    <label className="logo__label">
                      {logo.file === undefined ? (
                        linkLogo === "" ? (
                          <CameraAlt className="logo__icon" />
                        ) : (
                          <img className="logo__img" src={validateURL(linkLogo)} alt="" />
                        )
                      ) : (
                        <img className="logo__img" src={validateURL(logo.url)} alt="" />
                      )}

                      <input
                        className="logo__input"
                        type="file"
                        id="logo"
                        name="logo"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={e => showTheLogo(e)}
                        onClick={e => (e.target.value = null)}
                      />
                    </label>
                  </Grid>
                  {linkLogo == "" && (
                    <Grid item xs={6} md={6}>
                      <Button className="imageContainer__deleteImage" onClick={() => deleteLogo()}>
                        Eliminar
                      </Button>
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={12} md={12} className="buttons">
                  <Button variant="outlined" color="primary" className="btnsalir" onClick={() => navigateGroups()}>
                    Cancelar
                  </Button>
                  <Button variant="contained" color="primary" className="btnGuardar" onClick={handleSubmit(onSubmit)}>
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
        {isCreatingGroup && <LoaderCompleteScreen />}
      </NewGroupStyled>
    </DirectorLayout>
  );
}
