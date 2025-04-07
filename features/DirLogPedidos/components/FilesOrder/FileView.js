import React, { useEffect, useState } from "react";
import { validateURL } from "../../../../utils";
import { Backdrop, Dialog, IconButton, Modal } from "@material-ui/core";
import { BrokenImage, Close } from "@material-ui/icons";
import { saveAs } from "file-saver";
import { PreviewStyled } from "./styles";

export default function FileView({ file, open, setOpen }) {
  const [typeExtensionFile, setTypeExtensionFile] = useState("");
  const [isErrorImage, setIsErrorImage] = useState(false);

  useEffect(() => {
    if (open) {
      validateExtensionFile(file);
    }
  }, [file, open]);

  const validateExtensionFile = dataFile => {
    let typeFile = dataFile.url.split(".").pop();
    setTypeExtensionFile(typeFile);
  };

  const handleOnError = error => setIsErrorImage(true);
  const handleLoadImage = load => setIsErrorImage(false);

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
  const showTypeVisualizer = typeExtension => {
    switch (typeExtension) {
      case "pdf":
        return <iframe width="100%" height="780px" src={validateURL(file.url)} />;
      case "jpg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file?.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file?.name}
          />
        );
      case "jpeg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file?.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file?.name}
          />
        );
      case "png":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(file?.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={file?.name}
          />
        );
      default:
        return (
          <iframe
            width="100%"
            height="780px"
            src={`https://docs.google.com/gview?url=${validateURL(file?.url)}&embedded=true`}
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <PreviewStyled>
        <div className="container">
          <div className="container__head">
            <p className="title">Visualización de Archivo</p>
            <IconButton className="button_close" onClick={() => setOpen(false)}>
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
        </div>
      </PreviewStyled>
    </Dialog>
  );
}
