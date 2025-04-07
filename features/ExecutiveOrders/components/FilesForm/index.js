import { FilesFormStyled } from "./styles";
import { Assignment } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { renderTypeFile } from "../../../../utils/DirLog";
import React, { useEffect, useRef } from "react";
import { salesTypes } from "../../data";
export default function FilesForm({
  setFilesToUpload,
  filesToUpload,
  handleOnClickFilePreview,
  register,
  setValue,
  errors,
  setError,
  actions,
  selectedTypeSale,
}) {
  const fileInputRefs = useRef([]);

  const { handleBackBtForm, handleDirectStep, clearFormError } = actions;

  const normalizeFile = (file, type) => ({
    name: file.name,
    description: "",
    preview: URL.createObjectURL(file),
    file: file,
    idTypeFile: type.id,
    size: bytesToMB(file.size),
    type: file.type,
    isError: false,
    isEditable: false,
  });

  const bytesToMB = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  };

  const handleFileChange = (event, index) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const updatedFile = normalizeFile(selectedFile, salesTypes[selectedTypeSale][index]);
      const updatedFiles = [...filesToUpload];
      updatedFiles[index] = updatedFile;
      setFilesToUpload(updatedFiles);
      console.log(updatedFile);
    }
  };

  const handleEditFile = (index, key, value) => {
    let newFiles = [...filesToUpload];
    newFiles[index][key] = value;
    setFilesToUpload(newFiles);
  };

  const removeFile = index => {
    const newFiles = [...filesToUpload];
    if (newFiles[index]) {
      newFiles[index] = null;
      setFilesToUpload(newFiles);
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = "";
      }
    }
  };

  const validateEmptyDataFiles = () => {
    let emptyFiles = filesToUpload.some(
      file => !file || file.idTypeFile === "" || file.idTypeFile === null || file.idTypeFile === undefined
    );
    if (filesToUpload.length <= 0) {
      setError("files", { type: "custom", message: "Agrega por lo menos un archivo" });
      setValue("files", "");
      return;
    }
    if (emptyFiles) {
      setError("files", { type: "custom", message: "Completa los campos faltantes en los archivos" });
      setValue("files", "");
    } else {
      clearFormError(["files"]);
      setValue("files", "good files");
    }
  };

  useEffect(() => {
    validateEmptyDataFiles();
  }, [filesToUpload]);
  return (
    <FilesFormStyled>
      {selectedTypeSale && (
        <div>
          <div className="sectionheader">
            <h1 className="title">Documentos requeridos para {selectedTypeSale}</h1>
            <Assignment className="icon_primary" />
          </div>
          {salesTypes[selectedTypeSale].map((file, index) => (
            <div className="sectionfiles" key={file.id}>
              <label className="labels">{file.name}</label>
              <div className="file-input">
                <input
                  className="inputfiles"
                  type="file"
                  ref={el => (fileInputRefs.current[index] = el)}
                  onChange={event => handleFileChange(event, index)}
                  accept=".jpeg,.jpg,.png,.gif,.pdf"
                />
              </div>

              <input
                className="form_input"
                {...register("files", { required: "Llena todos los campos de los Archivos" })}
                readOnly
              />

              {filesToUpload[index] && filesToUpload[index].type && (
                <div className="sectionlist">
                  <div className="filestoupload">
                    <Grid className="fileselected" container spacing={1}>
                      <Grid item md={4}>
                        <div className="row rowname">
                          {renderTypeFile(filesToUpload[index].type)}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "flex-start",
                              width: "100%",
                            }}
                          >
                            <input
                              style={{ marginTop: 14, fontWeight: "bold" }}
                              value={filesToUpload[index].name}
                              onChange={e => handleEditFile(index, "name", e.target.value)}
                              className="inputfile"
                            />
                            <p
                              style={{
                                color: "#3f51b5",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                              onClick={() => handleOnClickFilePreview(filesToUpload[index])}
                            >
                              Ver Vista Previa
                            </p>
                          </div>
                        </div>
                      </Grid>

                      <Grid item md={4}>
                        <div className="row flexend">
                          <p onClick={() => removeFile(index)} className="removefile">
                            Quitar Archivo
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="buttons">
        <Button variant="contained" className="bt_next" onClick={() => handleDirectStep(4)}>
          Continuar
        </Button>
        <Button className="bt_back" onClick={() => handleBackBtForm()}>
          Atrás
        </Button>
      </div>
    </FilesFormStyled>
  );
}
