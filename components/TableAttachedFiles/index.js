import { Button, Dialog, Grid } from "@material-ui/core";
import {
  BackupOutlined,
  Close,
  NavigateBefore,
  NavigateNext,
  TableChartOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import TableCustom from "../TableCustom";

const AttachedFiles = () => {
  const [data, setData] = useState([
    {
      _id: "2i3891327jwhge198731231",
      nombre: "Jose",
      fecha: "hoy xD",
      tamaño: "32kb",
      origen: "5565235192",
      firma: "5565235192",
    },
    {
      _id: "2i3891327jwhge198733221",
      nombre: "Jose",
      fecha: "tal vez mañana",
      tamaño: "8kb",
      origen: "5565235192",
      firma: "5565235192",
    },
  ]);
  const [showAdd, setshowAdd] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [ifSelectFile, setIfSelectFile] = useState(false);
  const handleCloseAdd = () => {
    setIfSelectFile(false);
    setSelectedFile(undefined);
    setshowAdd(false);
  };

  const changeHandler = (event) => {
    try {
      if (validationType(event.target.files[0].type)) {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIfSelectFile(true);
      } else {
        alert("Tipo de archivo invalido");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationType = (type) => {
    if (type === "application/pdf") {
      return true;
    } else {
      return false;
    }
  };

  const deleteFile = (file) => {
    console.log("borrar documento");
  };

  const sendEmail = (file) => {
    console.log("enviar correo");
  };

  const openFile = (file) => {
    console.log("abrir archivo");
  };

  return (
    <AttachedFilesStyled>
      <div className="title_table">
        <TableChartOutlined />
        <p>Archivos Adjuntos</p>
      </div>

      <TableCustom
        heads={["id", "nombre", "fecha", "tamaño", "origen", "firma"]}
        data={data}
        identificador={"nombre"}
        custom={false}
        selectmultiple={false}
        keyJson="AttachedFiles"
        actionsPerItem={[
          { title: "vizualizar", action: (e) => openFile(e) },
          { title: "enviar correo", action: (e) => sendEmail(e) },
          { title: "eliminar", action: (e) => deleteFile(e) },
        ]}
        actionsItemsSelect={[
          {
            title: "enviar correo múltiple",
            action: () => console.log("enviooo"),
          },
        ]}
      />
      <div className="tfooter">
        <div className="tfooter__ctr_button">
          <Button
            variant="contained"
            color="primary"
            className="add_buton"
            onClick={() => setshowAdd(true)}
          >
            Agregar Archivo
          </Button>
        </div>
        <div className="tfooter__ctr_pagination">
          <p className="">{`Total de contactos: 10 Pagina: 1 - 10`}</p>
          <div className="tfooter__ctr_pagination__pagination">
            <button className="before">
              <NavigateBefore />
            </button>
            <button className="next">
              <NavigateNext />
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={showAdd}
        keepMounted
        onClose={handleCloseAdd}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <p className="title">Subir archivo</p>

          <div className="ctr_drop">
            <div className="ctr_drop__dropCV">
              <input
                type="file"
                margin="normal"
                className="inputRef"
                variant="outlined"
                accept=".pdf"
                onChange={changeHandler}
              />
              <BackupOutlined className="iconUpload" />
              <p className="label">Arrasta tu archivo aquí o </p>
              <p className="label">Has clic para seleccionarlo</p>
              <span className="span">Formatos aceptados: PDF </span>
            </div>

            {ifSelectFile ? (
              <div className="ctr_drop__file">
                <Close
                  className="icon"
                  onClick={() => {
                    setSelectedFile(undefined);
                    setIfSelectFile(false);
                  }}
                />
                <p className="name_file">{selectedFile?.name}</p>
              </div>
            ) : (
              <div style={{ height: 20 }} />
            )}
          </div>
          <Grid container className="ctr_buttons">
            <Button
              variant="contained"
              color="secondary"
              className="btn_cancel"
              onClick={handleCloseAdd}
            >
              Cancelar
            </Button>
            <Button
              disabled={ifSelectFile ? false : true}
              variant="contained"
              color="primary"
              className="btn_upload"
            >
              Subir Archivo
            </Button>
          </Grid>
        </DialogContainer>
      </Dialog>
    </AttachedFilesStyled>
  );
};

export default AttachedFiles;

const AttachedFilesStyled = styled.div`
  p {
    margin: 0;
  }
  .title_table {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    svg {
      width: 30px;
      height: 30px;
      padding: 5px;
      margin-right: 5px;
      background: #dce1f6;
      color: #0c203b;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
    }
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    margin: 10px;
    width: 100%;
    max-width: 600px;
  }
`;

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
  }

  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      color: #fff;
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .ctr_drop {
    padding: 20px;
    &__dropCV {
      border: 2px dotted #c0c0c0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      position: relative;
      height: 200px;
      min-width: 350px;
      width: 100%;
      margin-bottom: 15px;
      cursor: pointer;
      .inputRef {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
      .iconUpload {
        font-size: 80px;
        color: #8a8a8a;
      }
      .label {
        font-size: 14px;
        color: #8a8a8a;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
      .span {
        margin-top: 10px;
        font-size: 12px;
        color: #8a8a8a;
      }
    }
    &__file {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 20px;
        height: 20px;
        font-size: 15px;
        color: #f50;
        &:hover {
          cursor: pointer;
        }
      }
      .name_file {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
`;
