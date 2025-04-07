import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
import { Assignment, Block, Delete, Publish, Visibility } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { URL_SPACE } from "../../../../services/api";
import { renderTypeFile } from "../../utils/normalizeOrder";
import { FilesEditStyled, selectStyle } from "./styles";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { generateTemporalId } from "../../../../utils";

export default function FilesEdit({ filesData, filesControl }) {
  const { handleUpdateFile, handleOnChangeFile, handleDeleteFileFromArray } = filesControl;

  const { results: files } = filesData;
  const { filetypes } = useSelector(commonSelector);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: acceptedFiles => {
      filesControl.setFiles(prev => {
        return {
          ...prev,
          results: [...acceptedFiles.map(normalizeFile), ...prev.results],
        };
      });
    },
    // onDrop: acceptedFiles => filesControl.set([...files, ...acceptedFiles.map(normalizeFile)]),
    accept: accept,
  });

  console.log(filesData);

  const { getCatalogBy } = useGlobalCommons();

  const normalizeFile = file => {
    // Verificar que el archivo es un objeto 'File' válido
    if (!file || !(file instanceof File)) {
      console.error("El archivo no es válido:", file);
      return null; // Retorna null o puedes lanzar un error dependiendo de tu lógica
    }

    // Crear el objeto URL solo si el archivo es válido
    const preview = URL.createObjectURL(file);

    return {
      name: file.name,
      description: "",
      preview: preview, // Usa el objeto URL solo si el archivo es válido
      file: file,
      filestypeId: null,
      size: bytesToMB(file.size),
      fileextension: file.type,
      isError: false,
      isNew: true,
      id: "TEMPFILE" + generateTemporalId(16),
    };
  };

  const bytesToMB = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  };

  console.log(files);
  return (
    <FilesEditStyled>
      <div className="sectionheader">
        <h1 className="title" onClick={() => console.log("files", filesData)}>
          Archivos de Pedido
        </h1>

        <Assignment className="icon_primary" />
      </div>

      <div className="dropzone" {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <div className="dropzone__content">
          <Publish className="iconupload" />
          {isDragAccept ? (
            <p>Suelta los archivos </p>
          ) : (
            <p>
              Arrastra y suelta algunos archivos aquí, o
              <span className="highligth"> haz clic para seleccionar archivos.</span>
            </p>
          )}
          <input {...getInputProps()} />
        </div>
      </div>

      <div className="sectionList">
        <table>
          <thead>
            <tr>
              <th>Nombre Asignado</th>

              <th>Tipo de Archivo</th>
              <th>Archivo</th>
              <th>Acciones.</th>
            </tr>
          </thead>

          <tbody>
            {files?.map((file, index) => (
              <tr key={index}>
                {/* <td>
                  <div>
                    <input
                      type="checkbox"
                      onChange={e => {
                        if (e.target.checked) {
                          setFilesSelected([...filesSelected, file]);
                        } else {
                          setFilesSelected(filesSelected.filter(f => f.id !== file.id));
                        }
                      }}
                    />
                  </div>
                </td> */}
                <td>
                  <div className="row rowname">
                    {index + 1}.-
                    <div className="file">{renderTypeFile(file.fileextension)}</div>
                    <input
                      className="inputfile"
                      type="text"
                      value={file.name}
                      onChange={e => handleUpdateFile(file.id, "name", e.target.value)}
                    />
                    {/* {index + 1}.- {file.name} */}
                    {/* {file?.warehouseproductId !== null && <p className="articleproduct">Archivo de producto</p>} */}
                  </div>
                </td>
                <td>
                  <Select
                    className="type_file"
                    placeholder="Seleccione una Opción"
                    styles={selectStyle}
                    onMenuOpen={() => getCatalogBy("filetypes")}
                    isLoading={filetypes.isFetching}
                    options={filetypes.results}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    value={filetypes.results.filter(item => item.id === file.filestypeId)}
                    onChange={option => handleUpdateFile(file.id, "filetype", option)}
                    isDisabled={file?.isDefault}
                    maxMenuHeight={100}
                  />

                  {/* {file?.filestype?.name} */}
                </td>

                <td>
                  {file?.isDefault && (
                    <>
                      <input
                        type="file"
                        className="inputfiles"
                        accept=".jpeg,.jpg,.png,.gif,.pdf"
                        id={`file-input-${file.id}`}
                        onChange={e => handleOnChangeFile(file.id, e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <div className="containerTitleFile">
                          <label htmlFor={`file-input-${file.id}`} className={file?.file ? "file-label" : "file-none"}>
                            {file?.file ? "Archivo seleccionado" : "Seleccionar archivo"}
                          </label>

                          {file?.file && (
                            <Tooltip title={file?.file?.name} arrow>
                              <label htmlFor={`file-input-${file.id}`}>
                                {file?.file?.name ? file?.file?.name?.slice(0, 15) + "..." : " "}
                              </label>
                            </Tooltip>
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}

                  {!file?.isDefault && <p>Archivo adjunto</p>}
                </td>
                <td>
                  <div className="row">
                    {file.isNew ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <IconButton
                          className="iconButton"
                          onClick={() => {
                            if (file?.isNew) {
                              window.open(file?.preview, "_blank");
                            } else {
                              window.open(URL_SPACE + file?.url, "_blank");
                            }
                          }}
                        >
                          <Visibility className="iconMUI" />
                        </IconButton>

                        <IconButton
                          className="iconButton"
                          onClick={() => handleDeleteFileFromArray(file.id, file?.isDefault)}
                        >
                          <Delete className="iconMUI" />
                        </IconButton>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <IconButton
                          className="iconButtonDisabled"
                          // onClick={() => handleDeleteFileFromArray(file.id, file?.isDefault)}
                        ></IconButton>
                        <IconButton
                          className="iconButtonDisabled"
                          // onClick={() => handleDeleteFileFromArray(file.id, file?.isDefault)}
                        >
                          <Block className="iconMUI" />
                        </IconButton>
                      </motion.div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Grid className="container_form" container spacing={2}>
        {results?.map((item, index) => {
          return (
            <Grid item md={4} key={index}>
              <p>xx</p>
            </Grid>
          );
        })}
      </Grid> */}
    </FilesEditStyled>
  );
}
let accept = {
  "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  "application/pdf": [".pdf"],
};
