import React, { useEffect } from "react";

import { Button, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Select from "react-select";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { URL_SPACE } from "../../../../services/api";
import { selectStyle } from "./styles";
import { renderTypeFile } from "./utils";
import { userSelector } from "../../../../redux/slices/userSlice";

export default function FileUpdate({
  fileToUpdate,
  setFileToUpdate,
  handleUpdateFile,
  setShowPreviewDocument,
  handleOnChangeFile,
}) {
  const { getCatalogBy } = useGlobalCommons();
  const { userData } = useSelector(userSelector);
  let user = userData?.roleId;
  useEffect(() => {
    if (fileToUpdate) {
      getCatalogBy("filetypes");
    }
  }, [fileToUpdate,user]);

  const { filetypes } = useSelector(commonSelector);

   
  const fileTypesToShow = (user === 'encargado_de_egresos') ? [filetypes?.results[18]] : filetypes?.results; 

  if (!fileToUpdate) return null;

  return (
    <div className="sectionList">
      <div className="filestoupload">
        <div className="itemupload">
          <Grid className="fileselected" container spacing={2}>
            <Grid item md={4}>
              <div className="row rowname" onClick={() => {}}>
                {renderTypeFile(fileToUpdate.fileextension)}
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
                    value={fileToUpdate.name}
                    onChange={e => handleOnChangeFile("name", e.target.value)}
                    className="inputfile"
                  />
                  <p
                    style={{
                      color: "#3f51b5",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      setShowPreviewDocument({
                        preview: URL_SPACE + fileToUpdate.url,
                        name: fileToUpdate.name,
                        type: fileToUpdate.fileextension,
                      });
                    }}
                  >
                    Ver Vista Previa
                  </p>
                </div>
                {/* <p className="name">
                        {file.name} <span className="size">({file.size} mb)</span>
                      </p> */}
              </div>
            </Grid>

            <Grid item md={4}>
              <Select
                className="type_file"
                placeholder="Seleccione una Opción"
                styles={selectStyle}
                onMenuOpen={() => getCatalogBy("filetypes")}
                isLoading={fileTypesToShow}
                options={fileTypesToShow}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                defaultValue={filetypes.results.find(f => f.id === fileToUpdate.filestypeId)}
                onChange={option => handleOnChangeFile("filestypeId", option)}
              />
            </Grid>
            <Grid item md={4}>
              <div className="row flexend">
                <Button
                  className="btncancel"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    setFileToUpdate(null);
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  className="btnupload"
                  onClick={() => {
                    handleUpdateFile();
                  }}
                >
                  Guardar
                </Button>
              </div>
            </Grid>
          </Grid>

          {/* <div className="progress">
            {uploadProgress > 0 && fileUploading.name == file.name && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}
