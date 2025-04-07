import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Select from "react-select";
import { renderTypeFile } from "./utils";
import { Button, LinearProgress } from "@material-ui/core";
import { selectStyle } from "./styles";
import { Check } from "@material-ui/icons";

export default function ListFilesUpload({
  fileToUpload,
  filetypes,
  getCatalogBy,
  handleEditFile,
  resetFilesUpload,
  uploadFiles,
  uploadProgress,
  filesOrder,
  removeFile,
  total,
  setShowPreviewDocument,
  fileUploading,
}) {
  const classes = useStyles();

  return (
    <div className="sectionList">
      {fileToUpload.length > 0 && (
        <div className="filestoupload">
          {fileToUpload.map((file, index) => {
            return (
              <div className="itemupload">
                <Grid className="fileselected" container spacing={2}>
                  <Grid item md={4}>
                    <div className="row rowname">
                      {renderTypeFile(file.type)}
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
                          value={file.name}
                          onChange={e => handleEditFile(index, "name", e.target.value)}
                          className="inputfile"
                        />
                        <p
                          style={{
                            color: "#3f51b5",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          onClick={() => {
                            setShowPreviewDocument(file);
                          }}
                        >
                          Ver Vista Previa
                        </p>
                      </div>
                    </div>
                  </Grid>

                  <Grid item md={4}>
                    <Select
                      className="type_file"
                      placeholder="Seleccione una Opción"
                      styles={selectStyle}
                      onMenuOpen={() => getCatalogBy("filetypes")}
                      isLoading={filetypes.isFetching}
                      options={filetypes.results}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                      onChange={option => handleEditFile(index, "idTypeFile", option?.id)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <div className="row flexend">
                      {fileToUpload.length > 1 ? (
                        file?.issuccess == true ? (
                          <Check style={{ color: "green" }} />
                        ) : (
                          <p onClick={() => removeFile(index)} className="removefile">
                            Quitar Archivo
                          </p>
                        )
                      ) : (
                        <Button
                          className="btncancel"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            resetFilesUpload();
                          }}
                        >
                          Cancelar
                        </Button>
                      )}

                      {fileToUpload.length == 1 && (
                        <Button
                          color="primary"
                          variant="contained"
                          className="btnupload"
                          disabled={file?.idTypeFile ? false : true}
                          onClick={() => {
                            uploadFiles();
                          }}
                        >
                          Subir Archivo
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>

                <div className="progress">
                  {uploadProgress > 0 && fileUploading.name == file.name && (
                    <LinearProgress
                      classes={{ root: classes.root, bar: classes.bar }}
                      variant="determinate"
                      value={uploadProgress}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {fileToUpload.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Button
                className="btncancel"
                style={{ marginRight: "10px" }}
                onClick={() => {
                  resetFilesUpload();
                }}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="btnupload"
                disabled={fileToUpload.some(file => !file.idTypeFile)}
                onClick={() => {
                  uploadFiles();
                }}
              >
                Subir Archivos
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    height: 5,
    backgroundColor: "lightgray",
  },
  bar: {
    backgroundColor: "#4caf50",
  },
});
