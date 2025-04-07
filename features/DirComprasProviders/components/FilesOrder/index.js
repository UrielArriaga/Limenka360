import React, { useEffect, useState } from "react";
import { Close, DescriptionOutlined, Help, Publish } from "@material-ui/icons";
import { Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import Select from "react-select";
import FileView from "./FileView";
import { FilesOrderStyled, selectStyle } from "./styles";
import { api } from "../../../../services/api";
import { validateURL } from "../../../../utils";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import { handleGlobalAlert } from "../../../../utils";

export default function FilesOrder({ open = true, handletoogle, filesData, idOrder, refetch }) {
  const { company } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const [openFileView, setOpenFileView] = useState(false); // Nuevo estado para el segundo Drawer
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const [openNewFile, setOpenNewFile] = useState(false);
  const [isUploadImages, setIsUploadImages] = useState(false);
  const [newFiles, setNewFiles] = useState([]);
  const { filetypes } = useSelector(commonSelector);

  useEffect(() => {
    if (!open) setNewFiles([]);
  }, [open]);

  const download = async item => {
    try {
      let typeFile = item.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: validateURL(item.url),
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${item.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenFileView = file => {
    setSelectedFile(file);
    handletoogle(); // Cierra el primer Drawer
    setOpenFileView(true); // Abre el segundo Drawer
  };
  const handleVisualizarClick = file => {
    handleOpenFileView(file);
    handletoogle();
  };
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    onDrop: acceptedFiles => {
      setIsDrag(false);
      setNewFiles(
        acceptedFiles.map(file => ({
          name: file.name,
          description: "",
          preview: URL.createObjectURL(file),
          file: file,
          ext: verifyFileType(file.name),
          id: generateTemporalId(5),
          idTypeFile: "",
        }))
      );
    },
    maxFiles: 5,
  });
  const verifyFileType = dataFile => {
    let fileType = dataFile.split(".").pop();
    return fileType;
  };
  const generateTemporalId = length => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const handleEditFile = (position, ide, value) => {
    let copyFiles = [...newFiles];
    copyFiles[position][ide] = value;
    setNewFiles(copyFiles);
  };
  const handleDeleteFile = id => {
    let copyFiles = [...newFiles];
    let filterFiles = copyFiles.filter(item => item.id !== id);
    setNewFiles(filterFiles);
  };
  const validateDataNewFiles = () => {
    for (let i = 0; i < newFiles.length; i++) {
      if (newFiles[i].idTypeFile === "" || newFiles[i].name === "") {
        handleGlobalAlert("error", "Verifique que todos los campos esten llenos", "basic", dispatch, 6000);
        return;
      }
    }
    handleSaveFiles();
  };

  const handleinDrag = () => setIsDrag(true);
  const handleLeaveDrag = () => setIsDrag(false);
  const handleOpenNewFile = () => setOpenNewFile(true);

  const handleSaveFiles = async () => {
    setIsUploadImages(true);
    try {
      let files = await handleUploadFiles();
      let dataupdate = {
        addfiles: files.map((item, index) => ({
          name: item.name,
          filestypeId: item.idTypeFile,
          url: item.url,
          orderId: idOrder,
          companyId: company,
        })),
      };

      let orderupdate = await api.put(`orders/${idOrder}`, dataupdate);
      cleanAll();
      handleGlobalAlert("success", "Archivos Guardados!", "basic", dispatch, 6000);
      setIsUploadImages(false);
    } catch (error) {
      handleGlobalAlert("error", "Error al Guardar los Archivos, verifique los campos", "basic", dispatch, 6000);
      setIsUploadImages(false);
      console.log(error);
    }
  };
  const handleUploadFiles = async () => {
    let files = [...newFiles];
    try {
      for (let i = 0; i < files.length; i++) {
        const fileToSave = files[i];
        let newData = new FormData();
        newData.append("name", fileToSave.name);
        newData.append("file", fileToSave.file);
        let responseFiles = await api.post(`files/uploadtofolder/orders/${fileToSave.name}`, newData);
        files[i].url = responseFiles?.data?.url;
      }
    } catch (error) {
      handleGlobalAlert("error", "Al Subir Archivos", "basic", dispatch, 6000);

      console.log(error);
    }
    return files;
  };

  const cleanAll = () => {
    setNewFiles([]);
    refetch();
  };

  return (
    <FilesOrderStyled open={open} anchor="right" onDragEnter={() => handleinDrag()} onClose={() => handletoogle()}>
      <div className="content_filesOrder">
        <div className="content_filesOrder__header">
          <p className="title" onClick={() => console.log("archivos", idOrder)}>
            Archivos Adjuntos ({filesData.results.length})
            <Tooltip
              title="Nota: Para agregar algún documento, arrastre y suelte el archivo dentro del recuadro (Máx 5 archivos a la vez)"
              arrow
            >
              <Help />
            </Tooltip>
          </p>
          <IconButton className="bt_close">
            <Close onClick={() => handletoogle()} />
          </IconButton>
        </div>

        {/* <Input placeholder="Nombre del Archivo" fullWidth startAdornment={<Search />}  /> */}

        {isDrag && (
          <div className="add_files" {...getRootProps()} onDragLeave={() => handleLeaveDrag()}>
            <p className="title_file">
              Arrastra y Suelte el archivo <Publish className="icon_upload" />
            </p>
          </div>
        )}
        <div className={`content_filesOrder__body ${isDrag && "opacity"}`}>
          <div className="newtracking"></div>
          {newFiles.length > 0 && (
            <>
              <div className="new_files">
                <p className="title">Archivos a Agregar ({newFiles.length})</p>
                {newFiles.map((item, index) => (
                  <div key={index} className="item_file">
                    <DescriptionOutlined className="icon_file" />
                    <div className="file_data">
                      <input
                        className="name"
                        placeholder="Nombre del Archivo"
                        value={item.name}
                        onChange={e => handleEditFile(index, "name", e.target.value)}
                        disabled={isUploadImages}
                      />
                      <Select
                        className="type_file"
                        placeholder="Seleccione una Opción"
                        styles={selectStyle}
                        isDisabled={isUploadImages}
                        onMenuOpen={() => getCatalogBy("filetypes")}
                        loadingMessage={"Cargando Opciones.."}
                        isLoading={filetypes.isFetching}
                        options={filetypes.results}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        onChange={option => handleEditFile(index, "idTypeFile", option?.id)}
                      />
                    </div>
                    {!isUploadImages && <Close className="delete_file" onClick={() => handleDeleteFile(item.id)} />}
                  </div>
                ))}
              </div>
              <div className="buttons">
                {newFiles.length > 0 && (
                  <Button className="bt_save" onClick={() => validateDataNewFiles()} disabled={isUploadImages}>
                    {isUploadImages && <CircularProgress className="loader" size={18} />}
                    {isUploadImages ? "Subiendo Archivos" : "Subir Archivos"}
                  </Button>
                )}
              </div>
            </>
          )}
          <div className="files">
            {filesData.results.map((file, index) => (
              <div className="files__file" key={index}>
                <div className="files__file--icon">
                  <DescriptionOutlined />
                </div>

                <div className="files__file--name">
                  <p>{file.filestype?.name}</p>
                  <p>{file.name}</p>
                </div>

                <div className="files__file--actions">
                  <p onClick={() => handleVisualizarClick(file)}>Visualizar</p>
                  <p onClick={() => download(file)}>Descargar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="content_filesOrder__footer"></div>
      </div>
      <FileView file={selectedFile} open={openFileView} setOpen={setOpenFileView} />
    </FilesOrderStyled>
  );
}
