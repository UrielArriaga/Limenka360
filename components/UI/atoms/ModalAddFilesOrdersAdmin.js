import React, { useEffect, useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";
import styled from "styled-components";
import { Collapse, Grid, CircularProgress } from "@material-ui/core";
import { Block, Close, FileCopy, Functions, Image, Lock, PictureAsPdf, PostAdd, TextFields } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { device } from "../../../styles/global.styles";
import { generateTemporalId, handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../redux/slices/commonSlice";

export default function ModalAddFilesOrders({ open, setOpen, filesToSave, setFilesToSave }) {
  const dispatch = useDispatch();
  const [dataViewFile, setDataViewFile] = useState({});
  const { filetypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
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
    if (!open) {
      clearAll();
    }
  }, [open]);

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
          name: watch("name_file"),
          type: `.${typeFile}`,
          file: file,
        });
      } else {
        handleGlobalAlert("warning", "Tipo de Archivo no Permitido", "basic", dispatch, 6000);
      }
    }
  };

  const handleOnClickAddFile = async formData => {
    if (dataViewFile.name) {
      try {
        let id = generateTemporalId(10);
        let fileObject = dataViewFile;
        fileObject.id = id;
        let dataType = formData.type_file;
        fileObject.filestype = dataType;
        fileObject.filestypeId = dataType.id;
        setFilesToSave([...filesToSave, fileObject]);
        clearAll();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const returnStyleTypeFile = type => {
    switch (type) {
      case ".pdf":
        return <PictureAsPdf className="iconData pdf_icon" />;
      case ".docx":
        return <TextFields className="iconData word_icon" />;
      case ".xlsx":
        return <Functions className="iconData xlsx_icon" />;
      case ".jpeg":
        return <Image />;
      case ".jpg":
        return <Image />;
      case ".png":
        return <Image />;

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

  return (
    <div>
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
                    onMenuOpen={() => getCatalogBy("filetypes")}
                    isLoading={filetypes.isFetching}
                    loadingMessage={() => "Cargando Opciones..."}
                    options={filetypes?.results}
                    getOptionLabel={e => e.name}
                    getOptionValue={e => e.id}
                    maxMenuHeight={130}
                    noOptionsMessage={() => "Sin Opciones"}
                  />
                )}
              />
            </Grid>

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
                  render={({ field }) => <input hidden id="button-file" type="file" onChange={handleFile} />}
                />
                <label htmlFor="button-file">
                  <Button component="span" className="buttonFile" endIcon={<PostAdd />}>
                    {dataViewFile.name ? "Seleccionar otro" : "Seleccionar Archivo"}
                  </Button>
                </label>
              </div>
            </Grid>
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
    </div>
  );
}
const admitTypeFiles = ["pdf", "docx", "xlsx", "jpeg", "jpg", "png"];

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

export const Error = styled.div`
  color: red;
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
