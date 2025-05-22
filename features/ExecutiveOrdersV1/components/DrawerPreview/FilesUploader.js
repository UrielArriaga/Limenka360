import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  ArrowBack,
  ArrowForward,
  Cached,
  GetApp,
  MoreVert,
  Visibility,
  CloudUpload,
} from "@material-ui/icons";
import {
  CardDefault,
  CardFile,
  FilesStyle,
  MenuFile,
  DropArea,
} from "./styles";
import LoaderPreview from "../../../../components/LoaderPreviews";
import { validateURL } from "../../../../utils";

export default function Files({
  files,
  setFile,
  filesCount,
  isLoader,
  isLoaderUpload,
  refetch,
  pageFiles,
  file,
  fileSelected,
  setFileSelected,
  setPageFiles,
  handleFileSelect,
  handleDrop,
  handleDragOver,
  handleDownloadFile,
  setRefetch,
  string_to_slug,
  returnStyleTypeFile,
  searchColorStyle,
  limitFiles,
  filesLenght,
}) {
  const countPages = Math.ceil(filesLenght / limitFiles);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };

  const handleNextPage = () => {
    if (pageFiles < countPages) setPageFiles(pageFiles + 1);
  };

  return (
    <FilesStyle>
      <p className="title_files">
        Archivos (<span className="count">{files.count}</span>){" "}
        <Cached className="icon_title" onClick={() => setRefetch(!refetch)} />
      </p>
      {isLoader ? (
        <LoaderPreview />
      ) : (
        <>
          <DropArea
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="container_files drag-drop-area"
          >
            {files?.files?.map((item, index) => (
              <CardFile
                key={index}
                elevation={3}
                typefile={searchColorStyle(item.documentType)}
              >
                <div className="header">
                  <Tooltip title="Opciones" arrow={true} className="menuButton">
                    <MoreVert
                      className="options"
                      aria-describedby={id}
                      onClick={(e) => handleClick(e, item)}
                    />
                  </Tooltip>
                  <MenuFile
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div className="container">
                      <Button
                        className="option"
                        endIcon={<Visibility />}
                        onClick={() => {
                          handleClose();
                          window.open(
                            `${validateURL(fileSelected.url)}`,
                            "_blank"
                          );
                        }}
                      >
                        Visualizar
                      </Button>
                      <Button
                        className="option"
                        endIcon={<GetApp />}
                        onClick={() => {
                          handleClose();
                          handleDownloadFile();
                        }}
                      >
                        Descargar
                      </Button>
                    </div>
                  </MenuFile>
                </div>
                <div className="body">
                  {returnStyleTypeFile(item.documentType)}
                  <Tooltip title={"" + item.name} arrow={true}>
                    <p className="title_name">{item.name}</p>
                  </Tooltip>
                  <Tooltip title={"" + item.fileType} arrow={true}>
                    <p className="title_fileType">{item.fileType}</p>
                  </Tooltip>
                </div>
                <div className="footer"></div>
              </CardFile>
            ))}
            {!file.type ? (
              <CardDefault onDrop={handleDrop} onDragOver={handleDragOver}>
                <label className="label">
                  <CloudUpload className="default_icon" />
                  <input
                    className="input"
                    type="file"
                    onChange={handleFileSelect}
                  />
                </label>
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    marginTop: "10px",
                  }}
                >
                  Arrastra y suelta archivos o haz clic para seleccionar
                </p>
              </CardDefault>
            ) : (
              <div className="uploadFile">
                {isLoaderUpload ? (
                  <CircularProgress color="primary" />
                ) : (
                  returnStyleTypeFile(file.type)
                )}
                <div className="content_file">
                  <Tooltip title={"" + file.name}>
                    <p className="title_file">{file.name}</p>
                  </Tooltip>
                  <div className="buttons">
                    <Button
                      className="cancel"
                      disabled={isLoaderUpload}
                      onClick={() => setFile("")}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="upload"
                      disabled={isLoaderUpload}
                      onClick={() => string_to_slug(file)}
                    >
                      Subir
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DropArea>
          <div className="pagination">
            <p className="title_count"></p>
            <div className="navigation_buttons">
              <p className="pagesCount">
                Página {pageFiles} de {countPages || 1}
              </p>
              <IconButton
                className="btBack"
                disabled={pageFiles <= 1}
                onClick={() => setPageFiles(pageFiles - 1)}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                className="btNext"
                disabled={pageFiles >= countPages}
                onClick={handleNextPage}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </FilesStyle>
  );
}
