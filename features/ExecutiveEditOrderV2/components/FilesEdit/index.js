import { Avatar, IconButton } from "@material-ui/core";
import { Assignment, Delete, Publish, Visibility } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { URL_SPACE } from "../../../../services/api";
import { renderTypeFile } from "../../utils/normalizeOrder";
import { FilesEditStyled, selectStyle } from "./styles";

import { useDropzone } from "react-dropzone";
import Select from "react-select";
import { generateTemporalId } from "../../../../utils";

export default function FilesEdit({ filesData, filesControl }) {
  const { handleUpdateFile, handleDeleteFileFromArray } = filesControl;

  const { results: files } = filesData;
  const { filetypes } = useSelector(commonSelector);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: acceptedFiles => {
      filesControl.setFiles(prev => {
        return {
          ...prev,
          results: [...prev.results, ...acceptedFiles.map(normalizeFile)],
        };
      });
    },
    // onDrop: acceptedFiles => filesControl.set([...files, ...acceptedFiles.map(normalizeFile)]),
    accept: accept,
  });

  console.log(filesData);

  const { getCatalogBy } = useGlobalCommons();

  const normalizeFile = file => ({
    name: file.name,
    description: "",
    preview: URL.createObjectURL(file),
    file: file,
    filestypeId: null,
    size: bytesToMB(file.size),
    fileextension: file.type,
    isError: false,
    isNew: true,
    id: "TEMPFILE" + generateTemporalId(16),
  });

  const bytesToMB = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  };

  console.log(files);
  return (
    <FilesEditStyled>
      <div className="sectionheader">
        <h1 className="title">Archivos de Pedido</h1>

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
              <th>
                <input
                  type="checkbox"
                  onChange={e => {
                    if (e.target.checked) {
                      setFilesSelected(filesOrder);
                    } else {
                      setFilesSelected([]);
                    }
                  }}
                />
              </th>
              <th>Nombre del archivo</th>
              <th>Tipo de Archivo</th>
              <th>Fecha de Subida</th>
              <th>Subido por</th>
              <th>Acc.</th>
            </tr>
          </thead>
          <tbody>
            {files?.map((file, index) => (
              <tr key={index}>
                <td>
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
                </td>
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
                  />

                  {/* {file?.filestype?.name} */}
                </td>
                <td>
                  <div>
                    {dayjs(file?.createdAt).format("DD/MM/YYYY")}
                    <p>{dayjs(file?.createdAt).format("h:mm:ss A")}</p>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Avatar
                      src={URL_SPACE + file?.uploadby?.photo}
                      sizes="small"
                      style={{
                        width: 20,
                        height: 20,
                        marginBottom: 4,
                        background: "#9e9e9e",
                        fontSize: 12,
                        marginRight: 5,
                        textTransform: "capitalize",
                      }}
                    >
                      {file?.uploadby?.fullname?.slice(0, 2)}
                    </Avatar>
                    <p
                      style={{
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {file?.uploadby?.fullname || "N/A"}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="row">
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

                    {file.isNew && (
                      <IconButton className="iconButton" onClick={() => handleDeleteFileFromArray(file.id)}>
                        <Delete className="iconMUI" />
                      </IconButton>
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
