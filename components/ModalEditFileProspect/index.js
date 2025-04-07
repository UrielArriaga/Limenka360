import { Button, CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AlertRequired, EditFileStyle } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { handleGlobalAlert } from "../../utils";
import { commonSelector } from "../../redux/slices/commonSlice";
import Select from "react-select";
export default function EditFilePros(props) {
  const { close, open, file } = props;
  const dispatch = useDispatch();
  const { filetypes } = useSelector(commonSelector);
  const [isLoaderSaveChanges, setIsLoaderSaveChanges] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    showValuesFiles();
  }, [file]);
  const showValuesFiles = () => {
    if (file.name) {
      setValue("name", file.name);
      let searchTypeFile = filetypes.results.filter(item => item.name === file.fileType);
      setValue("filestypeId", searchTypeFile[0]);
    }
  };
  const nameFormat = nameFile => {
    let str = nameFile.substring(0, file.name.lastIndexOf(".")) || nameFile;
    // let typeFile = nameFile.split(".").pop();
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
      .replace(/\s+/g, "")
      .replace(/-+/g, "")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
    return str;
  };

  const requestUpdateFile = async formData => {
    setIsLoaderSaveChanges(true);
    try {
      let response = await api.put(`documents/${file.id}`, {
        name: nameFormat(formData.name),
        filestypeId: formData?.filestypeId?.id,
      });
      handleGlobalAlert("success", "Archivo - Archivo Actualizado!", "basic", dispatch, 6000);
      handleClearAll();
      setIsLoaderSaveChanges(false);
    } catch (error) {
      handleGlobalAlert("error", "Archivo - Ocurrió un Error Al Actualizar el Archivo!", "basic", dispatch, 6000);
      setIsLoaderSaveChanges(false);
    }
  };

  const handleClearAll = () => {
    props.close();
    setValue("name", "");
    setValue("filestypeId", "");
    props.setFlag();
  };

  const handleCancel = () => {
    props.close();
    setValue("name", "");
    setValue("filestypeId", "");
  };
  return (
    <EditFileStyle open={open} onClose={close}>
      <div className="container">
        <div className="container__head">
          <p className="title" onClick={() => console.log("archivo", file)}>
            Editar Archivo
          </p>
          {isLoaderSaveChanges && <CircularProgress className="loader_save" size={25} />}
        </div>
        <div className={`container__body ${isOpenMenu && "container__openMenu"}`}>
          <Grid container className="container_dataFile">
            <Grid item md={12} className="item">
              <p className="title">
                Nombre del Archivo {errors.name && <AlertRequired>{errors.name.message}</AlertRequired>}
              </p>
              <input className="file_name" {...register("name", { required: "Requerido" })} />
            </Grid>
            <Grid item md={12} className="item">
              <p className="title" onClick={() => console.log("tipos de archivo", filetypes.results)}>
                Tipo de Archivo {errors.filestypeId && <AlertRequired>{errors.filestypeId.message}</AlertRequired>}
              </p>
              <Controller
                name="filestypeId"
                control={control}
                rules={{ required: "*Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Selecciona una Opción"
                    options={filetypes.results}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    maxMenuHeight={140}
                    onMenuOpen={() => setIsOpenMenu(true)}
                    onMenuClose={() => setIsOpenMenu(false)}
                  />
                )}
              />
            </Grid>
          </Grid>
        </div>
        <div className="container__footer">
          <div className="buttons">
            <Button className="save_button" disabled={isLoaderSaveChanges} onClick={handleSubmit(requestUpdateFile)}>
              Guardar Cambios
            </Button>
            <Button className="cancel_button" disabled={isLoaderSaveChanges} onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </EditFileStyle>
  );
}
