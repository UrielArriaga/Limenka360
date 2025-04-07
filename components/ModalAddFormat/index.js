import React, { useState } from "react";
import styled from "styled-components";
import { Button, Dialog, IconButton } from "@material-ui/core";
import { BackupOutlined, Check, Clear, Close } from "@material-ui/icons";
import { URL_SPACE, api } from "../../services/api";

// #region constants

// #endregion

// #region styled-components
const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  /* min-width: 700px; */
  width: 100%;
  /* min-height: 300px; */

  display: flex;
  flex-direction: column;
  overflow: scroll;
  transition: all 0.6s ease;
  .headerDialog {
    padding: 0;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background: #0c203b;
    justify-content: space-between;

    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }
  .actionsDialog {
    padding: 20px;
    float: right;
    gap: 20px;
  }
  .btn {
    color: white;
  }
  display: block;
  .bodyDialog {
    width: 500px;
    /* margin: 30px; */
    margin-bottom: 50px;
    display: block;
    height: 200px;
    padding: 20px;

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
  }
`;

// #endregion

// #region functions

// #endregion

// #region component

/**
 * @author Montoya
 */
const ModalAddFormat = ({ open, setOpen, reload }) => {
  // #region Handlers

  // #endregion

  const handleClose = () => {
    setOpen(false);
  };
  const [ifSelectFile, setIfSelectFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);

  const changeHandler = event => {
    try {
      if (validationType(event.target.files[0].type)) {
        console.log("event.target.files[0]", event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIfSelectFile(true);
      } else {
        alert("Tipo de archivo invalido");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFiles = async () => {
    try {
      console.log("handleUploadFiles,selectedFile", selectedFile);

      let newData = new FormData();

      let cleanName = string_to_slug(selectedFile.name);

      newData.append("name", selectedFile.name);
      newData.append("file", selectedFile);
      let results = await api.post(`files/upload/${cleanName}`, newData);
      console.log("-----", results.data);
      if (results.status === 201) {
        let body = {
          name: selectedFile.name,
          url: results.data.url,
        };

        let resFormat = await api.post(`formats`, body);
        console.log("resFormat", resFormat);

        let formatsAp = await api.get(`formats`);
        console.log("->formats", formatsAp.data);
        reload();
        handleClose();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const string_to_slug = str => {
    str = str.replace(/(<([^>]+)>)/gi, " ");
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    return str;
  };

  const validationType = type => {
    return true;
    if (type === "application/pdf") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Añadir formato</p>
          <IconButton onClick={handleClose} className="btn">
            <Close />
          </IconButton>
        </div>
        <div className="bodyDialog">
          <div className="ctr_drop__dropCV">
            <input
              type="file"
              margin="normal"
              className="inputRef"
              variant="outlined"
              accept=".docx"
              onChange={changeHandler}
            />
            <BackupOutlined className="iconUpload" />
            <p className="label">Arrasta tu archivo aquí o </p>
            <p className="label">Haz clic para seleccionarlo</p>
            <span className="span">Formatos aceptados: DOC </span>
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
        <div className="actionsDialog">
          <Button color="primary" variant="outlined" endIcon={<Clear></Clear>} onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            endIcon={<Check></Check>}
            disabled={ifSelectFile ? false : true}
            onClick={handleUploadFiles}
          >
            Aceptar
          </Button>
        </div>
      </DialogContainer>
    </Dialog>
  );
};

// #endregion

export default ModalAddFormat;
