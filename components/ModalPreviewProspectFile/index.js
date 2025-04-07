import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { BrokenImage, Close, DeleteForever, PlayForWork } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import ConfirmDeleteFile from "../ModalConfirmDeleteFiles";
import { saveAs } from "file-saver";
import { api, URL_SPACE } from "../../services/api";
import { DeleteConfirm, PreviewStyled } from "./style";
import { validateURL } from "../../utils";
export default function PreviewFile(props) {
  const { open, close, file, setFlag } = props;
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [typeExtensionFile, setTypeExtensionFile] = useState("");
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  useEffect(() => {
    if (open) {
      validateExtensionFile(file);
    }
  }, [file, open]);

  const validateExtensionFile = dataFile => {
    let typeFile = dataFile.url.split(".").pop();

    setTypeExtensionFile(typeFile);
  };

  const handleDownloadFile = async () => {
    try {
      let typeFile = file.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + file.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${file.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnError = error => setIsErrorImage(true);
  const handleLoadImage = load => setIsErrorImage(false);

  const showTypeVisualizer = typeExtension => {
    switch (typeExtension) {
      case "pdf":
        return <iframe width="100%" height="780px" src={validateURL(file.url)} />;
      case "jpg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file.name}
          />
        );
      case "jpeg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file.name}
          />
        );
      case "png":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file.name}
          />
        );
      default:
        return (
          <iframe
            width="100%"
            height="780px"
            src={`https://docs.google.com/gview?url=${validateURL(file.url)}&embedded=true`}
          />
        );
    }
  };

  return (
    <PreviewStyled open={open} onClose={close} anchor="right">
      <div className="container">
        <div className="container__head">
          <p className="title">Visualización de Archivo</p>
          <IconButton className="button_close" onClick={close}>
            <Close className="icon_close" />
          </IconButton>
        </div>
        <div className="container__body">
          <div className="head">
            <p className="title">
              Nombre del Archivo: <span>{file?.name}</span>
            </p>
            <p className="title">
              Tipo de Archivo: <span>{file?.filestype?.name}</span>
            </p>
            <div className="buttons">
              <Button className="button_download" onClick={handleDownloadFile} endIcon={<PlayForWork />}>
                Descargar Archivo
              </Button>
              <Button className="button_delete" onClick={() => setShowConfirmDelete(true)} endIcon={<DeleteForever />}>
                Eliminar Archivo
              </Button>
            </div>
          </div>
          <div className="container_file">
            {isErrorImage ? (
              <div className="image_empty">
                <BrokenImage className="img" />
                <p className="title">
                  <span className="alert">Vista Previa No Disponible</span> Descargue el Archivo para Visualizarlo
                </p>
                <Button className="dowload_file" onClick={handleDownloadFile}>
                  Descargar
                </Button>
              </div>
            ) : (
              showTypeVisualizer(typeExtensionFile)
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteFile
        open={showConfirmDelete}
        close={handleCloseConfirmDelete}
        file={file}
        onPreview={true}
        closePreview={close}
        setFlag={setFlag}
      />
    </PreviewStyled>
  );
}
