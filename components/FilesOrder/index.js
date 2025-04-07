import React, { useEffect, useState } from "react";
import { Button, Grid, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { FormatListNumbered, Image, InsertDriveFile, MoreVert, PictureAsPdf, TextFields } from "@material-ui/icons";
import dayjs from "dayjs";
import { Files, ConfirmDelete, MenuFile, EmptyFiles } from "./styles";
import { api } from "../../services/api";
export default function FilesOrders({ handleAlert, idOrder }) {
  const [files, setFiles] = useState([]);
  const [orderDataSelect, setOrderDataSelect] = useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isLoaderFiles, setIsLoaderFiles] = useState(false);
  const [isloaderSaveChanges, setIsloaderSaveChanges] = useState(false);
  const id = open ? "simple-popover" : undefined;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getFilesOrder();
   
  }, [idOrder]);

  const getFilesOrder = async () => {
    setIsLoaderFiles(true);
    try {
      let response = await api.get(`documents/order/${idOrder}`);
      setIsLoaderFiles(false);
      setFiles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const menuFileHidden = () => {
    setAnchorEl(null);
    setOrderDataSelect({});
  };
  const menuFileShow = (event, item) => {
    setAnchorEl(event.currentTarget);
    setOrderDataSelect(item);
  };
  const handleCloseConfirm = () => {
    setOpenConfirmDelete(false);
    menuFileHidden();
  };
  const optionAction = option => {
    setOpenConfirmDelete(true);
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
      case "docx":
        return <TextFields className="icon" />;
      case "pdf":
        return <PictureAsPdf className="icon" />;
      case "png":
        return <Image className="icon" />;
      case "jpg":
        return <Image className="icon" />;
      case "xlsx":
        return <FormatListNumbered className="icon" />;
      default:
        return <InsertDriveFile className="icon" />;
    }
  };
  const updateOrder = async () => {
    try {
      setOpenConfirmDelete(false);
      menuFileHidden();
      handleAlert("success", `Archivo Eliminado Correctamente!`, "basic");
    } catch (error) {}
  };

  const openFile = url => {
    window.open(url, "_blank");
  };
  return (
    <Files container spacing={3}>
      {isLoaderFiles ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : files.length >= 1 ? (
        files?.map((item, index) => (
          <Grid key={index} item md={4} xs={4} sm={4} className="filesItem">
            <div className={`fileData ${styleTypeFile(item)}`}>
              <div className="fileData__header">
                {iconTypeFile(item)}
                {/* <IconButton className="buttonMenu" onClick={e => menuFileShow(e, item)}>
                  <MoreVert className="buttonMenu__icon" />
                </IconButton> */}
                <MenuFile
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={menuFileHidden}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div className="bodyMenu">
                    <Button className="bodyMenu__option" onClick={() => optionAction("delete")}>
                      Eliminar
                    </Button>
                  </div>
                </MenuFile>
              </div>
              <Tooltip title={"" + item.name} arrow>
                <p className="nameFile" onClick={() => openFile(true)}>
                  {item.name ? item.name : "Sin Nombre"}
                </p>
              </Tooltip>
              <div className="fileData__footer">
                <p className="titleDate">{dayjs(item.createdAt).format("DD/MMMM/YYYY")}</p>
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
      <ConfirmDelete open={openConfirmDelete} onClose={handleCloseConfirm}>
        <div className="container">
          <div className="container__head">
            <p className="title">Confirmación</p>
          </div>
          <Grid container className="container__body">
            <Grid item md={12} sm={12} xs={12} className="container__body__item">
              <p className="title">¿Estas Seguro de Eliminar el Archivo?</p> 
              <p className="info">{orderDataSelect.name}</p>
            </Grid>
          </Grid>
          <div className="container__footer">
            <div className="buttons">
              {isloaderSaveChanges ? (
                <CircularProgress className="buttons__loader" />
              ) : (
                <>
                  <Button className="buttons__cancel" onClick={handleCloseConfirm}>
                    Cancelar
                  </Button>

                  <Button className="buttons__confirm" onClick={updateOrder}>
                    Aceptar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </ConfirmDelete>
    </Files>
  );
}
