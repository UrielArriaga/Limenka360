import React from "react";
import { useState } from "react";
import { CameraAlt } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { api } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updatePhoto, userSelector } from "../../redux/slices/userSlice";
import { handleGlobalAlert, validateURL } from "../../utils";
import ReadInput from "../ReadInput.js";

export default function AccountEjecutives({ alert }) {
  const { groupId, company, id_user, userData, group, userPhoto, roleId } = useSelector(userSelector);
  const [photo, setphoto] = useState({ url: "", file: undefined });
  const [linkPhoto, setLinkPhoto] = useState(userData.photo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const showThePhoto = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop();
    let acceptFile = ["jpg", "png", "jpeg", "JPG", "PNG"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0) return alert("error", "Error al actualizar");
    const url = URL.createObjectURL(e.target.files[0]);
    setphoto({ url: url, file: e.target.files[0] });
  };

  const stringToSlug = str => {
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

  const handleImageError = event => {
    event.target.onerror = null;
    event.target.src = "/load.png";
  };

  const savePhoto = async () => {
    setIsLoading(true);
    const newData = new FormData();
    newData.append("name", photo.file?.name);
    newData.append("file", photo.file);
    if (photo.file?.name == undefined) {
      handleGlobalAlert("warning", "Selecciona una foto nueva", "basic", dispatch, 6000);
    } else {
      let resUpdatePhoto = await api.post(
        `files/uploadtofolder/${company}-G${groupId}-E${id_user}/${stringToSlug(photo.file?.name)}.${
          photo.file?.type?.split("/")[1]
        }`,
        newData
      );

      if (resUpdatePhoto.status == 201) {
        let resUpdateURL = await api.put(`ejecutives/${id_user}`, { photo: resUpdatePhoto.data.name });
        if (resUpdateURL.status == 200) {
          dispatch(updatePhoto({ photo: resUpdatePhoto?.data.name }));
          handleGlobalAlert("success", "Se guardó la foto correctamente", "basic", dispatch, 6000);
        } else {
          handleGlobalAlert("error", "Error al actualizar la ruta de la foto", "basic", dispatch, 6000);
        }
      } else {
        handleGlobalAlert("error", "Error al guardar la foto en base", "basic", dispatch, 6000);
      }
    }
    setIsLoading(false);
  };

  const deletePhoto = async () => {
    if (userData?.photo === "" && photo.file?.name === undefined) {
      handleGlobalAlert("warning", "Aun no hay imagen seleccionada", "basic", dispatch, 6000);
    } else {
      if (photo.file?.name !== undefined && userData?.photo !== "") {
        deletePhotoChange();
      } else {
        if (photo.file?.name === undefined && userData?.photo !== "") {
          deletePhotoChange();
        } else {
          setphoto({ url: "", file: undefined });
        }
      }
    }
  };

  const deletePhotoChange = async () => {
    setIsLoading(true);
    let resDeletePhoto = await api.delete(`files/delete`, { data: { name: userData.photo } });
    if (resDeletePhoto.status == 200) {
      let resUpdateURL = await api.put(`ejecutives/${id_user}`, { photo: "" });
      if (resUpdateURL.status == 200) {
        setLinkPhoto("");
        dispatch(updatePhoto({ photo: "" }));
        setphoto({ url: "", file: undefined });
        handleGlobalAlert("success", "Se elimino la foto correctamente", "basic", dispatch, 6000);
      } else {
        handleGlobalAlert("error", "Error al borrar la ruta de la foto", "basic", dispatch, 6000);
      }
    } else {
      handleGlobalAlert("error", "Error al borrar la foto de la base", "basic", dispatch, 6000);
    }
    setIsLoading(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <div className="photo">
          <label className="photo__label">
            {photo?.file === undefined ? (
              linkPhoto === "" ? (
                <CameraAlt className="photo__icon" />
              ) : (
                <img className="photo__img" onError={handleImageError} src={validateURL(userPhoto)} />
              )
            ) : (
              <img className="photo__img" onError={handleImageError} src={validateURL(photo.url)} />
            )}
            <input
              className="photo__input"
              type="file"
              id="photo"
              name="photo"
              accept="image/png, image/jpeg, image/jpg"
              onChange={e => showThePhoto(e)}
              onClick={e => (e.target.value = null)}
            />
          </label>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ width: "70%", marginBottom: "10px" }}
            onClick={() => savePhoto()}
            disabled={isLoading}
          >
            Guardar foto
          </Button>

          <Button
            variant="contained"
            size="small"
            color="secondary"
            style={{ width: "70%" }}
            onClick={() => deletePhoto()}
            disabled={isLoading}
          >
            Eliminar foto
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <ReadInput label={"Nombre"} value={userData.name} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12}>
            <ReadInput label={"Apellido"} value={userData.lastname} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12}>
            <ReadInput label={"Correo"} value={userData.email} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12}>
            <ReadInput label={"Grupo"} value={group} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Iniciales"} value={userData.username} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Titulo"} value={userData.title} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <ReadInput label={"Teléfono"} value={userData.phone} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
            <ReadInput label={"Teléfono opcional"} value={userData.optionalphone} isDisable={roleId === "ejecutivo"} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
