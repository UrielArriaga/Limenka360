import { Publish } from "@material-ui/icons";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import FileUpdate from "./FileUpdate";
import ListFiles from "./ListFiles";
import ListFilesUpload from "./ListFilesUpload";
import PreviewFile from "./PreviewFile";
import { FilesUploadStyled } from "./styles";

// TODO Checar la validacion por archivo, indicar que archivo fallo y porque
// TODO Eliminar Archivo solo el que creo el archivo
export default function FilesUpload({
  open = true,
  handletoogle,
  orderData,
  articleData = null,
  actionsFiles,
  statesFiles,
  paginationFiles,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    "application/pdf": [".pdf"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/xml": [".xml"],
    "text/xml": [".xml"],
  },
}) {
  const {
    handleOnChangeEditFile,
    handleUpdateFile,
    handleOnChangeFile,
    handleOnChangePageFiles,
    setFileToUpdate,
    setFilesToUpload,
    handleOnClickUploadFiles,
    handleDeleteFile,
  } = actionsFiles;

  const { filesToUpload, uploadProgress, fileToUpdate, filesData, fileUploading } = statesFiles;
  const [showPreviewDocument, setShowPreviewDocument] = useState(null);
  const { limit, page } = paginationFiles;
  const { getCatalogBy } = useGlobalCommons();
  const { filetypes } = useSelector(commonSelector);
  const [newfiles, setNewFiles] = useState(filesData.results);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: acceptedFiles => setFilesToUpload([...filesToUpload, ...acceptedFiles.map(normalizeFile)]),
    accept: accept,
  });

  const HandleNewfiles = date => {
    setNewFiles(1);
  };

  const normalizeFile = file => ({
    name: file.name,
    description: "",
    preview: URL.createObjectURL(file),
    file: file,
    idTypeFile: null,
    size: bytesToMB(file.size),
    type: file.type,
    isError: false,
    isEditable: false,
  });

  const bytesToMB = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  };

  const resetFilesUpload = () => {
    setFilesToUpload([]);
  };

  const removeFile = index => {
    const newFiles = [...filesToUpload];
    newFiles.splice(index, 1);
    setFilesToUpload(newFiles);
  };

  const resetStates = () => {
    setFilesToUpload([]);
    handleOnChangePageFiles(1);
  };

  // const funtionSeleccion = id => {
  //

  // }

  return (
    <FilesUploadStyled
      open={open}
      anchor="right"
      onClose={() => {
        handletoogle();
        resetStates();
      }}
      isFocused={isFocused}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
    >
      <div className="header">
        {!articleData ? (
          <h3>Adjuntar archivo a pedido {orderData?.folio}</h3>
        ) : (
          <h3>
            Adjuntar archivo por articulo{" "}
            <span
              style={{
                textTransform: "uppercase",
                color: "#4C67FE",
              }}
            >
              {articleData?.serialnumber}
            </span>
          </h3>
        )}
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

      <PreviewFile
        showPreviewDocument={showPreviewDocument}
        setShowPreviewDocument={setShowPreviewDocument}
        fileUrl={showPreviewDocument?.preview}
      />

      {!fileToUpdate && (
        <ListFiles
          limit={limit}
          page={page}
          handlePage={handleOnChangePageFiles}
          fileToUpload={filesToUpload}
          total={filesData?.count}
          orderData={orderData}
          filesOrder={filesData.results}
          isFetching={filesData.isFetching}
          setShowPreviewDocument={setShowPreviewDocument}
          setFileToUpdate={setFileToUpdate}
          handleDeleteFile={handleDeleteFile}
        />
      )}

      <FileUpdate
        setShowPreviewDocument={setShowPreviewDocument}
        fileToUpdate={fileToUpdate}
        setFileToUpdate={setFileToUpdate}
        handleUpdateFile={handleUpdateFile}
        handleOnChangeFile={handleOnChangeFile}
      />

      <ListFilesUpload
        fileToUpload={filesToUpload}
        filetypes={filetypes}
        getCatalogBy={getCatalogBy}
        handleEditFile={handleOnChangeEditFile}
        removeFile={removeFile}
        resetFilesUpload={resetFilesUpload}
        uploadFiles={handleOnClickUploadFiles}
        uploadProgress={uploadProgress}
        setShowPreviewDocument={setShowPreviewDocument}
        fileUploading={fileUploading}
      />
    </FilesUploadStyled>
  );
}
