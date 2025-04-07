import { Button, CircularProgress, Collapse, Grid, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AddFilesStyled, ErrorForm } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../services/api";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { handleGlobalAlert } from "../../utils";
import { FileCopy, Functions, Image, PictureAsPdf, PostAdd, TextFields } from "@material-ui/icons";
export default function AddFilesProspect(props) {
  const { open, close, prospect } = props;
  const dispatch = useDispatch();
  const [dataViewFile, setDataViewFile] = useState({});
  const [typeFiles, setTypeFiles] = useState([]);
  const [loaderSave, setLoaderSave] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    control,
    watch,
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

  const handleFile = dataFile => {
    let file = dataFile.target.files[0];
    if (file) {
      let typeFile = file.name.split(".").pop().toLocaleLowerCase();
      let validateExtension = admitTypeFiles.find(item => item === typeFile);
      if (validateExtension) {
        setDataViewFile({
          name: file.name,
          type: `.${typeFile}`,
          file: file,
        });
      } else {
        handleGlobalAlert("warning", "Tipo de Archivo no Permitido", "basic", dispatch, 6000);
      }
    }
  };

  const handleSaveChanges = async formData => {
    if (dataViewFile.name) {
      setLoaderSave(true);
      try {
        let newData = new FormData();
        newData.append("file", dataViewFile.file);
        let response = await api.post(
          `files/uploadtofolder/${prospect.id}/${formData.name_file}${dataViewFile.type}`,
          newData
        );
        let fileBody = response.data;
        fileBody.nameFile = formData.name_file;
        fileBody.typeFileId = formData.type_file;
        console.log("respuesta al guardar", fileBody);
        uploadFileOnProspect(fileBody);
      } catch (error) {
        handleGlobalAlert("error", "Archivos - Error al Subir el Archivo!", "basic", dispatch, 6000);
        setLoaderSave(false);
        console.log(error);
      }
    }
  };

  const uploadFileOnProspect = async fileData => {
    try {
      let bodyfile = {
        url: fileData.name,
        name: fileData.nameFile,
        filestypeId: fileData.typeFileId.id,
        prospectId: prospect.id,
      };
      let response = await api.post(`documents`, bodyfile);
      props.setFlag();
      handleGlobalAlert("success", "Archivos - Archivo Guardado!", "basic", dispatch, 6000);
      clearAll();
    } catch (error) {
      setLoaderSave(false);
      handleGlobalAlert("error", "Archivos - Error al Guardar el Archivo!", "basic", dispatch, 6000);
      console.log(error);
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
    setLoaderSave(false);
    props.close();
  };

  return (
    <AddFilesStyled open={open} onClose={close}>
      <div className="container">
        <div className="container__head">
          <p className="title">Agregar Archivo</p>
          {loaderSave && <CircularProgress className="progress" size={33} />}
        </div>
        <div className="container__body">
          <Grid container spacing={1} className="form_file">
            <Grid item md={12}>
              <p className="title">
                Nombre que se Asignara al Archivo
                {errors.name_file && <ErrorForm className="point">{errors.name_file?.message}</ErrorForm>}
              </p>
              <input
                className="input_data"
                {...register("name_file", {
                  required: "Requerido",
                })}
              />
            </Grid>
            <Grid item md={6}>
              <p className="title">
                Tipo de Archivo
                {errors.type_file && <ErrorForm className="point">{errors.type_file?.message}</ErrorForm>}
              </p>
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
            <Grid item md={6}>
              <p className="title_hidden">
                {!dataViewFile.name && <ErrorForm className="point">Selecciona un Archivo</ErrorForm>}+
              </p>
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
            </Grid>
            <Collapse in={dataViewFile.name ? true : false}>
              <Grid item md={12}>
                <div className="style_viewFile">
                  {returnStyleTypeFile(dataViewFile.type)}
                  <div className="data_file">
                    <p className="title">
                      <span>{dataViewFile.name}</span>
                    </p>
                  </div>
                </div>
              </Grid>
            </Collapse>
          </Grid>
        </div>
        <div className="container__footer">
          <Button className="button_save" onClick={handleSubmit(handleSaveChanges)} disabled={loaderSave}>
            Guardar Cambios
          </Button>
          <Button className="button_cancel" onClick={close} disabled={loaderSave}>
            Cancelar
          </Button>
        </div>
      </div>
    </AddFilesStyled>
  );
}

const admitTypeFiles = ["pdf", "docx", "xlsx", "jpeg", "jpg", "png"];
