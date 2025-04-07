import React, { useState } from "react";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { StyledCompany, StyledDialogPhoto } from "../../../styles/Director/empresa";
import { Avatar, Button, Dialog, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updatePhoto, userSelector } from "../../../redux/slices/userSlice";
import { api } from "../../../services/api";
import { Close, Edit, Save } from "@material-ui/icons";
import { useRef } from "react";
import { handleGlobalAlert, validateURL } from "../../../utils";
import { showThePhoto, stringToSlug } from "../../../utils/utils_photo";

export default function Micuenta() {
  const { groupId, company, id_user, userData, group, userPhoto } = useSelector(userSelector);
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState({ url: "", file: undefined });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
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
          dispatch(updatePhoto({ photo: resUpdatePhoto.data.name }));
          handleGlobalAlert("success", "Se guardó la foto correctamente", "basic", dispatch, 6000);
          setOpenModal(false);
        } else {
          handleGlobalAlert("error", "Error al actualizar la ruta de la foto", "basic", dispatch, 6000);
        }
      } else {
        handleGlobalAlert("error", "Error al guardar la foto en base", "basic", dispatch, 6000);
      }
    }
    setIsLoading(false);
  };

  return (
    <DirectorLayout>
      <StyledCompany>
        <div className="containerAvatar">
          <Avatar src={validateURL(userPhoto)} onClick={() => setOpenModal(true)} />
          <p className="nameCompany">{userData?.name + " " + userData?.lastname}</p>
        </div>
        <div className="containerDataCompany">
          <CompanyInfo label={"Correo"} value={userData?.email} />
          <Divider />
          <CompanyInfo label={"Grupo"} value={group} />
          <Divider />
          <CompanyInfo label={"Iniciales"} value={userData?.username} />
          <Divider />
          <CompanyInfo label={"Télefono"} value={userData?.phone} />
          <Divider />
          <CompanyInfo label={"Teléfono opcional"} value={userData?.optionalphone} />
        </div>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <StyledDialogPhoto>
            <div className="title">
              <Close className="close" onClick={() => setOpenModal(false)} />
              <p>Imagen de la cuenta</p>
              <div />
            </div>
            <p>Selecciona una foto y da clic en guardar, para actualizar la foto de la cuenta.</p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={e => showThePhoto(e, setPhoto)}
              accept="image/png, image/jpeg, image/jpg"
              onClick={e => (e.target.value = null)}
            />
            <div className="avatar">
              <Avatar src={validateURL(photo?.url)} className={isLoading && "pulseShadow"} />
            </div>
            <div className="containerButtons">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                disabled={isLoading}
                onClick={handleAvatarClick}
              >
                Seleccionar
              </Button>
              <Button variant="outlined" color="primary" startIcon={<Save />} disabled={isLoading} onClick={savePhoto}>
                Guardar
              </Button>
            </div>
          </StyledDialogPhoto>
        </Dialog>
      </StyledCompany>
    </DirectorLayout>
  );
}

export const CompanyInfo = ({ label, value }) => {
  return (
    <div className="companyInfo">
      <p className="label">{label}:</p>
      <p className="value">{value ? value : "-"}</p>
    </div>
  );
};
