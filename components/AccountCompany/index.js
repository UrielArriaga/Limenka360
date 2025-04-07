import React from "react";
import { useState } from "react";
import { CameraAlt } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { validateURL } from "../../utils";
import ReadInput from "../ReadInput.js";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice.js";
export default function AccountCompany(props) {
  const [photo, setphoto] = useState({ url: "", file: undefined });
  const { groupId, company, id_user, userData, group, roleId } = useSelector(userSelector);

  const showThePhoto = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop();
    let acceptFile = ["jpg", "png", "jpeg"];
    let validate = acceptFile.filter(item => item === typeFile);
    if (validate.length === 0) return props.handleAlert("error", "Error al actualizar", "basic", props.setAlert);
    const url = URL.createObjectURL(e.target.files[0]);
    setphoto({ url: url, file: e.target.files[0] });
  };

  const handleImageError = event => {
    event.target.onerror = null;
    event.target.src = "/load.png";
  };

  return (
    <Grid container>
      <Grid item xs={12} md={4}>
        <div className="photo">
          <label className={`photo__label ${roleId !== "ejecutivo" && "active"}`}>
            {photo.file === undefined ? (
              props.dataCompanies?.photo === "" ? (
                <CameraAlt className="photo__icon" />
              ) : (
                <img className="photo__img" src={validateURL(props.dataCompanies?.photo)} onError={handleImageError} />
              )
            ) : (
              <img className="photo__img" src={validateURL(photo.url)} onError={handleImageError} />
            )}
            <input
              className="photo__input"
              type="file"
              id="photo"
              name="photo"
              accept="image/png, image/jpeg, image/jpg"
              disabled={props.role === "Admin_compania" ? false : true}
              onChange={e => showThePhoto(e)}
            />
          </label>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Empresa"} value={props.dataCompanies?.company} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Teléfono"} value={props.dataCompanies?.phone} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput
              label={"Teléfono opcional"}
              value={props.dataCompanies?.optionalophone}
              isDisable={roleId === "ejecutivo"}
            />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Correo"} value={props.dataCompanies?.email} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"RFC"} value={props.dataCompanies?.rfc} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <ReadInput label={"Calle"} value={props.dataCompanies?.street} isDisable={roleId === "ejecutivo"} />
          </Grid>
          <Grid item xs={4} md={4} sm={4} className="input">
            <div className="input__text">
              <p>Color Primario</p>
            </div>
            <input
              type="color"
              className="input__color"
              name="primarycolor"
              value={props.dataCompanies?.primarycolor}
              disabled={props.role === "Admin_compania" ? false : true}
            />
          </Grid>
          <Grid item xs={4} md={4} sm={4} className="input">
            <div className="input__text">
              <p>Color Secundario</p>
            </div>
            <input
              type="color"
              className="input__color"
              name="secondarycolor"
              value={props.dataCompanies?.secondarycolor}
              disabled={props.role === "Admin_compania" ? false : true}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
