import React, { useEffect, useState } from "react";
import { Button, Grid, CircularProgress, IconButton, Tooltip, Dialog, Popover, Drawer } from "@material-ui/core";
import {
  BrokenImage,
  Close,
  FormatListNumbered,
  Image,
  InsertDriveFile,
  MoreVert,
  PictureAsPdf,
  TextFields,
  PlayForWork,
  Functions,
  PlayForWorkOutlined,
  Today,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { api, URL_SPACE } from "../../../../services/api";
import styled from "styled-components";
import { formatDate, toUpperCaseChart, validateURL } from "../../../../utils";
export default function FilesOrdersAdminLeft({ idOrder }) {
  const [files, setFiles] = useState([]);
  const [isLoaderFiles, setIsLoaderFiles] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [isErrorImage, setIsErrorImage] = useState(false);
  const [typeExtensionFile, setTypeExtensionFile] = useState("");
  const [fileSelected, setFileSelected] = useState({});

  const handleClosePreviewFile = () => setOpenPreview(false);
  useEffect(() => {
    getFilesOrder();
  }, [idOrder]);

  const getFilesOrder = async () => {
    setIsLoaderFiles(true);
    try {
      let response = await api.get(`documents?where={"orderId":"${idOrder}"}`);
      setIsLoaderFiles(false);
      setFiles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadFile = async () => {
    try {
      let typeFile = fileSelected.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + fileSelected.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${fileSelected.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };

  const validateExtensionFile = dataFile => {
    let typeFile = dataFile.url.split(".").pop();
    setTypeExtensionFile(typeFile);
  };
  const styleTypeFile = file => {
    let typeFile = file.url.split(".").pop();
    switch (typeFile) {
      case "docx":
        return "word";
      case "pdf":
        return "pdf";
      case "jpg":
        return "image";
      case "png":
        return "image";
      case "xlsx":
        return "excel";
      default:
        return "default";
    }
  };
  const iconTypeFile = file => {
    let typeFile = file.url.split(".").pop();
    switch (typeFile) {
      case "pdf":
        return <PictureAsPdf className="icon" onClick={() => handleFile(file)} />;
      case "docx":
        return <TextFields className="icon" onClick={() => handleFile(file)} />;
      case "xlsx":
        return <Functions className="icon" onClick={() => handleFile(file)} />;
      case "jpeg":
        return <Image className="icon" onClick={() => handleFile(file)} />;
      case "jpg":
        return <Image className="icon" onClick={() => handleFile(file)} />;
      case "png":
        return <Image className="icon" onClick={() => handleFile(file)} />;
      default:
        return <InsertDriveFile className="icon" onClick={() => handleFile(file)} />;
    }
  };

  const showTypeVisualizer = typeExtension => {
    switch (typeExtension) {
      case "pdf":
        return <iframe width="100%" height="780px" src={validateURL(fileSelected.url)} />;
      case "jpg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(fileSelected.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={fileSelected.name}
          />
        );
      case "jpeg":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(fileSelected.url)}
            onError={handleOnError}
            onLoad={handleLoadImage}
            alt={fileSelected.name}
          />
        );
      case "png":
        return (
          <img
            width="100%"
            height="50%"
            src={validateURL(fileSelected.url)}
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
            src={`https://docs.google.com/gview?url=${URL_SPACE}${fileSelected.url}&embedded=true`}
          />
        );
    }
  };

  const handleOnError = error => setIsErrorImage(true);
  const handleLoadImage = load => setIsErrorImage(false);
  const handleFile = fileData => {
    validateExtensionFile(fileData);
    setFileSelected(fileData);
    setOpenPreview(true);
  };

  return (
    <Filess container spacing={3}>
      {isLoaderFiles ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : files.length >= 1 ? (
        files?.map((item, index) => (
          <Grid key={index} item md={3} xs={6} className="filesItem">
            <div className={`fileData ${styleTypeFile(item)}`}>
              <div className="fileData__header">{iconTypeFile(item)}</div>
              <Tooltip title={"Ver Vista Previa" + " " + item.name} arrow>
                <p className="nameFile" onClick={() => handleFile(item)}>
                  {toUpperCaseChart(item.name)}
                </p>
              </Tooltip>
              <div className="fileData__footer">
                <Today className="iconDate" />
                <p className="titleDate">{formatDate(item.createdAt)}</p>
              </div>
            </div>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} md={12} sm={12}>
          <EmptyFiles>
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>Sin Archivos</p>
            </div>
          </EmptyFiles>
        </Grid>
      )}
      <PreviewStyled open={openPreview} onClose={handleClosePreviewFile} anchor="left">
        <div className="container">
          <div className="container__head">
            <p className="title">Vista Previa de Archivo</p>
            <IconButton className="button_close" onClick={handleClosePreviewFile}>
              <Close className="icon_close" />
            </IconButton>
          </div>
          <div className="container__body">
            <div className="head">
              <p className="title">
                Nombre del Archivo: <span>{fileSelected?.name}</span>
              </p>
              <div className="buttons">
                <Button className="button_download" onClick={handleDownloadFile} endIcon={<PlayForWorkOutlined />}>
                  Descargar Archivo
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
      </PreviewStyled>
    </Filess>
  );
}
const Filess = styled(Grid)`
  .filesItem {
    padding: 5px;
    .fileData {
      background-color: #e5efff66;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      position: relative;
      margin-right: 10px;
      /* width: 100px; */
      margin: 5px;
      padding: 8px;
      border-radius: 5px;
      transition: 0.3s;
      &:hover {
        background-color: rgb(41, 121, 255, 0.1);
      }
      &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .icon {
          font-size: 30px;
        }
        .buttonMenu {
          font-size: 25px;
          height: 5px;
          width: 5px;
          &__icon {
            color: #2979ff;
            &:hover {
              color: #2979ff;
            }
          }
        }
      }
      .titleFile {
        font-size: 12px;
        color: #585858;
      }
      .nameFile {
        font-weight: 500;
        font-size: 15px;
        width: 100%;
        margin-bottom: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      &__footer {
        display: flex;
        align-items: center;
        .titleDate {
          font-size: 12px;
          font-weight: 500;
        }
        .iconDate {
          color: #3f51b5;
          font-size: 13px;
        }
      }
    }
    .word {
      .icon {
        color: #2979ff;
      }
    }
    .pdf {
      .icon {
        color: #ff1212;
      }
    }
    .image {
      .icon {
        color: #39b2e7;
      }
    }
    .excel {
      .icon {
        color: #148248;
      }
    }
    .default {
      .icon {
        color: #405189;
      }
    }
  }
  .loader {
    display: flex;
    justify-content: center;
    padding: 30px;
    width: 100%;
    margin-top: 20px;
    height: fit-content;
  }
`;

const EmptyFiles = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 170px;
  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;
export const PreviewStyled = styled(Drawer)`
  overflow: hidden;
  .MuiDrawer-paper {
    border-radius: 0px 12px 12px 0px;
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
