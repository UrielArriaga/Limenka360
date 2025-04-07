import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { api } from "../../services/api";
import { DeleteStyled } from "./style";
import { handleGlobalAlert } from "../../utils";
import { useDispatch } from "react-redux";

export default function ConfirmDeleteFile(props) {
  const { open, close, file, onPreview, closePreview, setFlag } = props;
  const [isLoaderDelete, setIsLoaderDelete] = useState(false);
  const dispatch = useDispatch();
  const deleteFileRequest = async () => {
    setIsLoaderDelete(true);
    try {
      let response = await api.delete(`files/delete`, { data: { name: file.url } });
      deleteFileRegister(file.id);
    } catch (error) {
      setIsLoaderDelete(false);
      handleGlobalAlert("error", "Error al Eliminar el Archivo", "basic", dispatch, 6000);
      props.close();
      if (onPreview) props.closePreview();
      console.log(error);
    }
  };

  const deleteFileRegister = async id => {
    try {
      let response = await api.delete(`documents/${id}`);
      handleGlobalAlert("success", "Archivo Eliminado!", "basic", dispatch, 6000);
      props.close();
      props.setFlag();
      if (onPreview) props.closePreview();
      setIsLoaderDelete(false);
    } catch (error) {
      setIsLoaderDelete(false);
      handleGlobalAlert("error", "Error al Eliminar el Registro", "basic", dispatch, 6000);
      props.close();
      if (onPreview) props.closePreview();
      console.log(error);
    }
  };

  return (
    <DeleteStyled open={open} onClose={close}>
      <div className="container">
        <div className="container__head">
          <p className="title" onClick={() => console.log(file)}>
            Confirmación
          </p>
          {isLoaderDelete && <CircularProgress size={25} className="progress_loader" />}
        </div>
        <div className="container__body">
          <p className="alert_title">¿Desea Eliminar el Archivo?</p>
          <p className="file_info">
            Nombre del Archivo <span className="data">{file?.name}</span>
          </p>
          <p className="file_info">
            Tipo de Archivo <span className="data">{file?.filestype?.name}</span>
          </p>
        </div>
        <div className="container__footer">
          <Button className="accept_button" disabled={isLoaderDelete} onClick={deleteFileRequest}>
            Aceptar
          </Button>
          <Button className="cancel_button" disabled={isLoaderDelete} onClick={close}>
            Cancelar
          </Button>
        </div>
      </div>
    </DeleteStyled>
  );
}
