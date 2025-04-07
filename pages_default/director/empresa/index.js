import React, { useEffect, useState } from "react";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { StyledCompany, StyledDialogPhoto } from "../../../styles/Director/empresa";
import { Avatar, Button, Dialog, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { api } from "../../../services/api";
import { Close, Edit, Save } from "@material-ui/icons";
import { useRef } from "react";
import { handleGlobalAlert, validateURL } from "../../../utils";
import { showThePhoto, stringToSlug } from "../../../utils/utils_photo";

export default function Empresa() {
  const { groupId, company, id_user, roleId } = useSelector(userSelector);
  const [dataCompany, setDataCompany] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [photo, setPhoto] = useState({ url: "", file: undefined });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    let res = await api.get(`companies/${company}`);
    setDataCompany(res.data);
  };

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
        let resUpdateURL = await api.put(`companies/${company}`, { photo: resUpdatePhoto.data.name });
        if (resUpdateURL.status == 200) {
          getCompany();
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

  return (
    <DirectorLayout>
      {roleId == "Admin_compania" || roleId == "director" ? (
        <StyledCompany>
          <div className="containerAvatar">
            <Avatar src={validateURL(dataCompany?.photo)} onClick={() => setOpenModal(true)} />
            <p className="nameCompany">{dataCompany?.company ? dataCompany?.company : "-"}</p>
          </div>
          <div className="containerDataCompany">
            <CompanyInfo label={"Correo"} value={dataCompany?.email} />
            <Divider />
            <CompanyInfo label={"Télefono"} value={dataCompany?.phone} />
            <Divider />
            <CompanyInfo label={"Teléfono opcional"} value={dataCompany?.optionalphone} />
            <Divider />
            <CompanyInfo label={"RFC"} value={dataCompany?.rfc} />
            <Divider />
            <CompanyInfo label={"Calle"} value={dataCompany?.street} />
          </div>
          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <StyledDialogPhoto>
              <div className="title">
                <Close className="close" onClick={() => setOpenModal(false)} />
                <p>Imagen de la empresa</p>
                <div />
              </div>
              <p>Selecciona una foto y da clic en guardar, para actualizar la foto de la empresa.</p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={e => showThePhoto(e, setPhoto)}
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
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Save />}
                  disabled={isLoading}
                  onClick={savePhoto}
                >
                  Guardar
                </Button>
              </div>
            </StyledDialogPhoto>
          </Dialog>
        </StyledCompany>
      ) : (
        <div></div>
      )}
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
