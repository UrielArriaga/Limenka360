import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  LinearProgress,
  Tooltip,
  Link,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@material-ui/core";

import styled from "styled-components";
import { BrokenImage, Close } from "@material-ui/icons";
import { URL_SPACE } from "../../../../services/api";
import { validateURL } from "../../../../utils";

const DrawerPreviewFile = ({ show, closeDrawer, file, setFile }) => {
  // * HANDLERS EVENTS
  const [typeExtensionFile, setTypeExtensionFile] = useState("");
  const [isErrorImage, setIsErrorImage] = useState(false);

  useEffect(() => {
    if (show) {
      validateExtensionFile(file);
    }
  }, [file, show]);

  const validateExtensionFile = dataFile => {
    console.log("data", dataFile);
    let typeFile = dataFile.url;

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
            alt={fileSelected.name}
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
    <PreviewStyled open={show} onClose={closeDrawer} anchor="left">
      <div className="container">
        <div className="container__head">
          <p className="title">Vista Previa de Archivo</p>
          <IconButton className="button_close" onClick={closeDrawer}>
            <Close className="icon_close" />
          </IconButton>
        </div>

        <div className="container__body">
          <div className="head">
            <p className="title">
              Nombre del Archivo: <span>{file?.name}</span>
            </p>
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
    </PreviewStyled>
  );
};

export default DrawerPreviewFile;

export const PreviewStyled = styled(Drawer)`
  overflow: hidden;
  .MuiDrawer-paper {
    border-radius: 12px;
    @media (min-width: 1151px) {
      width: 60%;
    }
    @media (max-width: 1150px) {
      width: 50%;
    }
    @media (max-width: 900px) {
      width: 70%;
    }
    @media (max-width: 590px) {
      width: 100%;
    }
  }
  .container {
    &__head {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #103c82;
      justify-content: space-between;
      padding: 8px;
      position: sticky;
      top: 0;
      z-index: 1;

      .title {
        color: #fff;
        font-size: 19px;
        font-weight: 500;
      }
      .button_close {
        width: 30px;
        height: 30px;
        transition: 0.2s;
        padding: 3px;
        &:hover {
          background-color: red;
          .icon_close {
            color: #fff;
          }
        }
        .icon_close {
          color: #fff;
          font-size: 25px;
        }
      }
    }
    &__body {
      padding: 10px;
      .title {
      }
      .head {
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin-bottom: 10px;
        .title {
          color: grey;
          span {
            font-weight: 500;
            color: black;
          }
        }
        .buttons {
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          .button_delete {
            background-color: red;
            color: #fff;
            text-transform: capitalize;
            font-size: 13px;
            margin-right: 5px;
          }
          .button_download {
            background-color: #405189;
            color: #fff;
            text-transform: capitalize;
            font-size: 13px;
          }
        }
      }
      .container_file {
        padding: 10px;
        .image_empty {
          align-items: center;
          display: flex;
          flex-direction: column;
          .img {
            height: 100px;
            width: 100px;
            margin-bottom: 20px;
          }
          .title {
            font-weight: 500;
            font-size: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .alert {
              color: #990000;
              font-weight: bold;
              margin-bottom: 10px;
            }
          }
          .dowload_file {
            text-transform: capitalize;
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
