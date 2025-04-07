import React, { useState, useEffect } from "react";
import { Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import {
  Add,
  ArrowBack,
  ArrowForward,
  Cached,
  Edit,
  FileCopy,
  Functions,
  GetApp,
  Image,
  MoreVert,
  PictureAsPdf,
  TextFields,
  Visibility,
} from "@material-ui/icons";
import { CardDefault, CardFile, FilesStyle, MenuFile, selectStyle, selectStyleActive } from "./style";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { handleGlobalAlert, validateURL } from "../../../../utils";
import LoaderPreview from "../../../../components/LoaderPreviews";
import EditFilePros from "../../../../components/ModalEditFileProspect";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import Select from "react-select";
export default function FilesOrder(props) {
  const { filesFrom, data } = props;
  const { groupId, company, id_user } = useSelector(userSelector);
  const { filetypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoader, setIsLoader] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [openEditFile, setOpenEditFile] = useState(false);
  const [isLoaderUpload, setIsLoaderUpload] = useState(false);
  const [pageFiles, setPageFiles] = useState(1);
  const [file, setFile] = useState({});
  const [fileSelected, setFileSelected] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const limitFiles = 8;
  const filesLenght = files.count ? files.count : files.length;
  const countPages = Math.ceil(filesLenght / limitFiles);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => setAnchorEl(null);
  const handleCloseEditFile = () => setOpenEditFile(false);
  //limitar a una petición
  useEffect(() => {
    if (data?.id) {
      getFiles();
    }
  }, [pageFiles, refetch, data?.id]);
  const returnStyleTypeFile = type => {
    switch (type) {
      case "pdf":
        return <PictureAsPdf />;
      case "docx":
        return <TextFields />;
      case "xlsx":
        return <Functions />;
      case "jpeg":
        return <Image />;
      case "jpg":
        return <Image />;
      case "png":
        return <Image />;
      default:
        return <FileCopy />;
    }
  };
  const searchColorStyle = type => {
    let searchColor = admitTypeFiles.filter(item => item.name === type);
    let color = searchColor[0]?.color;
    if (!color) return "black";
    return color;
  };
  const handleFile = dataFile => {
    getCatalogBy("filetypes");
    let file = dataFile.target.files[0];
    if (file) {
      let typeFile = verifyFileType(file.name);
      let validateExtension = admitTypeFiles.find(item => item.name === typeFile);
      if (validateExtension) {
        setFile({
          name: file.name,
          type: `${typeFile}`,
          file: file,
          typeFile: searchFileTypeDefault("Otro", true),
        });
      } else {
        handleGlobalAlert("warning", "Tipo de Archivo no Permitido", "basic", dispatch, 6000);
      }
    }
  };
  const getFiles = async () => {
    setIsLoader(true);
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        order: "-createdAt",
        include: "filestype",
        limit: limitFiles,
        count: 1,
        skip: pageFiles,
      };
      if (filesFrom) {
        let response = await api.get(`documents/${filesFrom}/${data.id}`, { params });
        normalizeFiles(response.data.results, response.data.count);
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };
  const normalizeFiles = (files, count) => {
    let newFiles = files.map(item => {
      let file = {
        id: item.id,
        name: item.name,
        fileType: item.filestype.name,
        url: item.url,
        documentType: verifyFileType(item.url),
      };
      return file;
    });
    setFiles({ files: newFiles, count: count });
  };
  const verifyFileType = dataFile => {
    let fileType = dataFile.split(".").pop();
    return fileType;
  };
  const string_to_slug = file => {
    let str = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    let typeFile = file.name.split(".").pop();
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

    let newBody = {
      name: `${str}.${typeFile}`,
      file: file.file,
      filestypeId: file.typeFile.id,
    };
    uploadFileFolder(newBody);
  };
  const uploadFileFolder = async dataFile => {
    setIsLoaderUpload(true);
    try {
      let newData = new FormData();
      newData.append("file", dataFile.file);
      newData.append("name", dataFile.name);
      let response = await api.post(
        `files/uploadtofolder/${company}-G${groupId}-E${id_user}-P${data.oportunity.prospectId}/${dataFile.name}`,
        newData
      );
      let fileBody = response.data;
      fileBody.name_file = dataFile.name;
      fileBody.typeFileId = dataFile.filestypeId;
      uploadFileOnDocuments(fileBody);
    } catch (error) {
      setIsLoaderUpload(false);
      console.log(error);
    }
  };
  const uploadFileOnDocuments = async fileData => {
    try {
      let bodyfile = {
        url: fileData.name,
        name: fileData.name_file,
        filestypeId: fileData.typeFileId,
        prospectId: data.oportunity.prospectId,
        oportunityId: data.oportunity.id,
        orderId: data.id,
      };
      let response = await api.post(`documents`, bodyfile);
      setRefetch(!refetch);
      setFile({});
      handleGlobalAlert("success", "Archivos - Archivo Guardado!", "basic", dispatch, 6000);
      restorePage();
      setIsLoaderUpload(false);
    } catch (error) {
      setIsLoaderUpload(false);
      handleGlobalAlert("error", "Archivos - Error al Guardar el Archivo!", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  const searchFileTypeDefault = (typeName, isSelect) => {
    let search = filetypes.results.find(item => item.name === typeName);
    if (isSelect) return search;
    if (search) return search.id;
  };
  const restorePage = () => {
    if (pageFiles > 1) setPageFiles(1);
  };
  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };

  const handleChangeTypeFile = option => {
    setFile({ ...file, typeFile: option });
  };

  const handleDownloadFile = async () => {
    try {
      let typeFile = fileSelected.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: validateURL(fileSelected.url),
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${fileSelected.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (pageFiles < countPages) setPageFiles(pageFiles + 1);
  };
  return (
    <FilesStyle>
      <p className="title_files">
        Archivos <Cached className="icon_title" onClick={() => setRefetch(!refetch)} />
      </p>
      {isLoader ? (
        <LoaderPreview />
      ) : (
        <>
          <div className="container_files">
            {files?.files?.map((item, index) => (
              <CardFile key={index} elevation={3} typefile={searchColorStyle(item.documentType)}>
                <div className="header">
                  <Tooltip title="Opciones" arrow={true} className="menuButton">
                    <MoreVert className="options" aria-describedby={id} onClick={e => handleClick(e, item)} />
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
                        endIcon={<Edit />}
                        onClick={() => {
                          setOpenEditFile(true);
                          handleClose();
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="option"
                        endIcon={<Visibility />}
                        onClick={() => {
                          handleClose();
                          window.open(`${validateURL(fileSelected.url)}`, "_blank");
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
              <CardDefault>
                <label className="label">
                  <Add className="default_icon" />
                  <input className="input" type="file" onChange={handleFile} />
                </label>
              </CardDefault>
            ) : (
              <div className="uploadFile">
                <div className="media_file">
                  {isLoaderUpload ? <CircularProgress color="primary" /> : returnStyleTypeFile(file.type)}
                  <div className="content_file">
                    <Tooltip title={"" + file.name}>
                      <p onClick={() => console.log("archivo", file)} className="title_file">
                        {file.name}
                      </p>
                    </Tooltip>
                    <Select
                      className="type_file"
                      value={file.typeFile}
                      options={filetypes.results}
                      getOptionLabel={option => option.name}
                      getOptionValue={option => option.id}
                      styles={selectStyle}
                      onChange={option => handleChangeTypeFile(option)}
                      placeholder="Tipo"
                      maxMenuHeight={100}
                      isDisabled={isLoaderUpload}
                    />
                  </div>
                </div>
                <div className="buttons">
                  <Button className="cancel" disabled={isLoaderUpload ? true : false} onClick={() => setFile("")}>
                    Cancelar
                  </Button>
                  <Button
                    className="upload"
                    disabled={isLoaderUpload ? true : false}
                    onClick={() => string_to_slug(file)}
                  >
                    Subir
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="pagination">
            <p className="title_count">
              Total de Archivos: <span className="count">{files.count}</span>
            </p>
            <div className="navigation_buttons">
              <p className="pagesCount">
                Página {pageFiles} de {countPages || 1}
              </p>
              <IconButton
                className="btBack"
                disabled={pageFiles <= 1 && true}
                onClick={() => setPageFiles(pageFiles - 1)}
              >
                <ArrowBack />
              </IconButton>
              <IconButton className="btNext" disabled={pageFiles >= countPages} onClick={handleNextPage}>
                <ArrowForward />
              </IconButton>
            </div>
          </div>
        </>
      )}
      <EditFilePros
        open={openEditFile}
        close={handleCloseEditFile}
        file={fileSelected}
        setFlag={() => setRefetch(!refetch)}
      />
    </FilesStyle>
  );
}
const admitTypeFiles = [
  { name: "pdf", color: "red" },
  { name: "docx", color: "blue" },
  { name: "xlsx", color: "green" },
  { name: "jpeg", color: "#66B2FF" },
  { name: "jpg", color: "#9999FF" },
  { name: "png", color: "#FFB266" },
];
