import { Box, Button, Collapse, Dialog, Grid, Tooltip } from "@material-ui/core";
import {
  Delete,
  Description,
  Folder,
  FileCopy,
  Functions,
  Image,
  PictureAsPdf,
  PostAdd,
  TextFields,
} from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import styled from "styled-components";
import { api } from "../../services/api";
import { colors, device } from "../../styles/global.styles";
import { generateTemporalId, handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

export default function AddFiles({ open, setOpen, filesToSave, setFilesToSave }) {
  const [typeFiles, setTypeFiles] = useState([]);
  const dispatch = useDispatch();
  const [dataViewFile, setDataViewFile] = useState({});
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    requestTypeFile();
  }, []);

  useEffect(() => {
    if (!open) {
      clearAll();
    }
  }, [open]);

  const requestTypeFile = async () => {
    try {
      let params = {
        order: "name",
        all: 1,
      };
      let response = await api.get("filetypes", { params });
      setTypeFiles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFile = dataFile => {
    let file = dataFile.target.files[0];

    if (file) {
      let typeFile = file.name.split(".").pop().toLocaleLowerCase();
      let validateExtension = admitTypeFiles.find(item => item === typeFile);
      if (validateExtension) {
        setDataViewFile({
          name: file.name,
          type: `${typeFile}`,
          file: file,
          fileextension: file.type,
        });
      } else {
        handleGlobalAlert("warning", "Tipo de Archivo no Permitido", "basic", dispatch, 6000);
      }
    }
  };

  const handleOnClickAddFile = async formData => {
    try {
      let id = generateTemporalId(10);
      let fileObject = {
        name: formData?.name_file,
        type: `.${dataViewFile?.type}`,
        file: dataViewFile?.file,
        fileextension: dataViewFile?.fileextension,
      };
      fileObject.id = id;
      let dataType = formData.type_file;
      fileObject.filestype = dataType;
      setFilesToSave([...filesToSave, fileObject]);
      clearAll();
      handleResetFileInput();
    } catch (error) {
      handleGlobalAlert("error", "Archivos - Error al Agregar el Archivo!", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  const handleResetFileInput = () => {
    // Resetea el campo de entrada de tipo file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const returnStyleTypeFile = type => {
    switch (type) {
      case ".pdf":
        return <PictureAsPdf className="pdf" />;
      case ".docx":
        return <TextFields className="word" />;
      case ".xlsx":
        return <Functions className="xlsx" />;
      case ".jpeg":
        return <Image className="image" />;
      case ".jpg":
        return <Image className="image" />;
      case ".png":
        return <Image className="image" />;

      default:
        return <FileCopy className="iconData" />;
    }
  };
  const clearAll = () => {
    setDataViewFile({});
    setValue("name_file", "");
    setValue("type_file", "");
    setValue("file_data", "");
    handleClose();
  };
  const handleDeleteFile = id => {
    let newFiles = filesToSave.filter((item, index) => item.id != id);

    setFilesToSave(newFiles);
  };
  return (
    <AddFilesLayout>
      <div className="files">
        {filesToSave.map((item, index) => {
          return (
            <Box key={index} className="box-file" onClick={() => console.log(item.file.name)}>
              {returnStyleTypeFile(item?.type)}
              <Tooltip title={item?.name}>
                <p className="text">{item?.name.slice(0, 15)}</p>
              </Tooltip>
              <Tooltip title={item.filestype?.name}>
                <p className="type">{item.filestype?.name.slice(0, 20)}</p>
              </Tooltip>

              <Delete className="delete" onClick={() => handleDeleteFile(item?.id)} />
            </Box>
          );
        })}
      </div>
      {filesToSave.length <= 0 && <p className="na">no hay archivos</p>}
      <Button
        className="btn_add"
        startIcon={<FileCopy />}
        variant="contained"
        onClick={() => {
          setOpen(true);
          console.log("add", filesToSave);
        }}
      >
        <p>Agregar Archivos</p>
      </Button>

      <DialogStyled
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContainer>
          <div className="headerDialog">
            <p className="headerDialog__title">Agregar Archivo</p>
            {isLoadingCreate && <CircularProgress className="headerDialog__loader" />}
          </div>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Nombre que se Asignara al Archivo <strong>*</strong>
                  </p>

                  {errors.name_file && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.name_file?.message}</Error>
                    </>
                  )}
                </div>
                <input
                  className="input_data"
                  {...register("name_file", {
                    required: "Requerido",
                  })}
                />
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <div className="item">
                <div className="ContentTitleandAlert">
                  <p>
                    Tipo de archivo <strong>*</strong>
                  </p>

                  {errors.type_file && (
                    <>
                      <div className="point"></div>
                      <Error>{errors.type_file?.message}</Error>
                    </>
                  )}
                </div>
              </div>

              <Controller
                name="type_file"
                control={control}
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select_data"
                    placeholder="Elige una Opción"
                    options={typeFiles}
                    getOptionLabel={e => e.name}
                    getOptionValue={e => e.id}
                    maxMenuHeight={130}
                    noOptionsMessage={() => "Sin Opciones"}
                  />
                )}
              />
            </Grid>
            <div className="containerUpload">
              <Grid item xs={12} md={12}>
                <div className="item">
                  <div className="ContentTitleandAlert">
                    <p>
                      Archivo <strong>*</strong>
                    </p>

                    {!dataViewFile.name && (
                      <>
                        <div className="point"></div>
                        <Error>Selecciona un archivo</Error>
                      </>
                    )}
                  </div>
                  <Controller
                    name="file_data"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <input ref={fileInputRef} hidden id="button-file" type="file" onChange={handleFile} />
                    )}
                  />
                  <label htmlFor="button-file">
                    <Button component="span" className="buttonFile" endIcon={<PostAdd />}>
                      Seleccionar Archivo
                    </Button>
                  </label>
                </div>
              </Grid>
            </div>
            <Grid item md={12} xs={12}>
              <Collapse in={dataViewFile.name ? true : false}>
                <div className="style_viewFile">
                  {returnStyleTypeFile(dataViewFile.type)}
                  <div className="data_file">
                    <p className="title">
                      <span>{dataViewFile.name}</span>
                    </p>
                  </div>
                </div>
              </Collapse>
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              className={`btn_cancel ${isLoadingCreate && "disabled"}`}
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              className={`btn_upload ${isLoadingCreate && "disabled"}`}
              onClick={handleSubmit(handleOnClickAddFile)}
            >
              Agregar
            </Button>
          </Grid>
        </DialogContainer>
      </DialogStyled>
    </AddFilesLayout>
  );
}
export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    margin-bottom: 15px;
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
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    .ContentTitleandAlert {
      font-size: 12px;
      font-weight: bold;
      color: rgb(79, 79, 79);
      display: flex;
      margin-bottom: 4px;
    }
    .buttonFile {
      border: #1976d2 2px dashed;
    }
    &__label {
      font-size: 12px;
      font-weight: bold;
      color: #4f4f4f;
    }
    .input_data {
      background-color: hsl(0, 0%, 100%);
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 4px;
      height: 38px;
      outline: none;
      padding: 5px;
      width: 100%;
      font-size: 15px;
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .style_viewFile {
    display: flex;
    align-items: center;
    .word {
      color: #2979ff;
      font-size: 28px;
    }
    .pdf {
      color: #ff1212;
      font-size: 28px;
    }
    .jpg {
      color: #39b2e7;
      font-size: 28px;
    }
    .image {
      color: #39b2e7;
      font-size: 28px;
    }
    .xlsx {
      color: #148248;
      font-size: 28px;
    }
    .default {
      color: #405189;
      font-size: 28px;
    }
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
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;
      .label {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 0.02em;
        color: #626262;
        svg {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 5px;

          color: #115293;
        }
      }
      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;

const AddFilesLayout = styled.div`
  margin-top: 20px;

  .select-options {
    z-index: 51;
  }

  .files {
    display: flex;
    margin-bottom: 6px;
  }
  .na {
    /* text-align: center; */
    color: #8a8a8a;
    margin: 6px 0px 14px 0px;
    font-weight: 500;
    margin: 0px 0px 12px 11px;
  }
  .btn_add {
    text-transform: capitalize;
    border: 2px px solid #103c82;
    color: #103c82;
    border-radius: 2px solid;
    font-size: 13px;
    border-radius: 10px;
    background: white;
    margin: 2px;
    font-size: 13px;
    border-radius: 10px;
    margin-left: 5px;
    padding: 10px 15px;
  }
  .box-file {
    background-color: #f9f9f9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    position: relative;
    margin-right: 10px;
    width: 138px;
    height: 94px;

    .word {
      color: #2979ff;
      font-size: 28px;
    }
    .pdf {
      color: #ff1212;
      font-size: 28px;
    }
    .jpg {
      color: #39b2e7;
      font-size: 28px;
    }
    .image {
      color: #39b2e7;
      font-size: 28px;
    }
    .xlsx {
      color: #148248;
      font-size: 28px;
    }
    .default {
      color: #405189;
      font-size: 28px;
    }
    .type {
      font-size: 12px;
      font-weight: 500;
      color: #407aff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .icon {
    font-size: 40px;
    color: ${colors.primaryColor};
  }

  .text {
    font-size: 12px;
    font-weight: bold;
  }

  .delete {
    font-size: 15px;
    position: absolute;
    right: 2px;
    cursor: pointer;
    &:hover {
      color: red;
      transition: all 0.2s ease-in-out;
    }
  }
  .btn_salir {
    margin: 9px 14px;
  }
`;

// f> r>  u> r' u'  f'
export const Error = styled.div`
  color: red;
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;

  /* @media ${device.md} {
    width: 40%;
  } */
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
const DialogStyled = styled(Dialog)`
  .options {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    button {
      /* background-color: #0f3c81; */
    }
  }
  .inputlabel {
    display: flex;
    flex-direction: column;
    label {
      color: rgb(86 86 86);
      font-weight: 600;
      font-size: 14px;
    }
    input {
      margin-top: 10px;
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 10px 23px 9px 11px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
    }

    .disabled {
      background-color: #e0e0e0;
    }
  }

  .amountFinal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    label {
      color: #000;
    }

    .total {
      color: #424242;
      font-weight: bold;
    }
    /* color: #0f3c81; */
  }
`;
const admitTypeFiles = ["pdf", "docx", "xlsx", "jpeg", "jpg", "png"];
