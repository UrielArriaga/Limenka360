/* eslint-disable jsx-a11y/alt-text */
import { Button, Chip, CircularProgress, Divider, Grid, IconButton, Popover, Tooltip, Zoom } from "@material-ui/core";
import {
  AccountBalanceWallet,
  Assignment,
  Cached,
  Category,
  Close,
  DeleteForever,
  Edit,
  FilterList,
  FolderShared,
  Functions,
  Image,
  InsertDriveFile,
  MoreHoriz,
  MoreVert,
  Person,
  PictureAsPdf,
  PlayForWork,
  StarBorder,
  TextFields,
  Visibility,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import AddFilesProspect from "../ModalAddFilesProspect";
import PreviewFile from "../ModalPreviewProspectFile";
import EditFilePros from "../ModalEditFileProspect";
import { DrawerFilters, FilesStyled, MenuFile } from "./styles";
import dayjs from "dayjs";
import { api, URL_SPACE } from "../../services/api";
import ConfirmDeleteFile from "../ModalConfirmDeleteFiles";
import Select from "react-select";
import { Pagination } from "@material-ui/lab";
import { saveAs } from "file-saver";
export default function ClientsFiles(data) {
  const { prospect, setFlag } = data;
  const [openAddFile, setOpenAddFile] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openEditFile, setOpenEditFile] = useState(false);
  const [refetchFiles, setRefetchFiles] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loaderFiles, setLoaderFiles] = useState(false);
  const [fileSelected, setFileSelected] = useState({});
  const [filtersToApply, setFiltersToApply] = useState([]);
  const [filesProspect, setFilesProspect] = useState([]);
  const [typeFiles, setTypeFiles] = useState([]);
  const [pageFiles, setPageFiles] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const [limitFiles, setLimitFiles] = useState(10);
  const totalPagesFiles = Math.ceil(totalFiles / limitFiles);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCloseFilters = () => setOpenFilters(false);
  const handleCloseAddFile = () => setOpenAddFile(false);
  const handleClosePreviewFile = () => setOpenPreview(false);
  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleCloseEditFile = () => setOpenEditFile(false);
  const handleRefetchFiles = () => setRefetchFiles(!refetchFiles);
  const handleClose = () => setAnchorEl(null);
  const handlePreviewFile = fileData => {
    setFileSelected(fileData);
    setOpenPreview(true);
  };
  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getRequestTypeFile();
  }, []);

  useEffect(() => {
    getRequesFiles();
  }, [refetchFiles]);

  const formatingFilters = filters => {
    let bodyWhere = {};
    bodyWhere.prospectId = prospect?.id;
    for (let i = 0; i < filters.length; i++) {
      switch (filters[i].filterId) {
        case "name":
          bodyWhere[filters[i].filterId] = { iRegexp: `${filters[i].value}` };
          break;

        default:
          bodyWhere[filters[i].filterId] = filters[i].value;
          break;
      }
    }
    return JSON.stringify(bodyWhere);
  };

  const getRequesFiles = async () => {
    setLoaderFiles(true);
    try {
      let params = {
        where: formatingFilters(filtersToApply),
        order: "-createdAt",
        include: "filestype,prospect,oportunity,order",
        join: "filestype,prospect,opor,ord",
        skip: pageFiles,
        limit: limitFiles,
        count: 1,
      };
      let response = await api.get(`documents`, { params });
      setLoaderFiles(false);
      normalizeFiles(response.data.results, response.data.count);
    } catch (error) {
      setLoaderFiles(false);
      console.log(error);
    }
  };

  const normalizeFiles = (files, count) => {
    let newFiles = files.map(item => {
      let file = {
        id: item.id,
        name: item.name,
        fileType: item.filestype.name,
        filestype: item.filestype,
        url: item.url,
        documentType: verifyFileType(item.url),
        createdAt: item.createdAt,
        itemOrder: item?.order,
        itemOportunity: item?.oportunity,
        itemProspect: item?.prospect,
      };
      return file;
    });

    setFilesProspect(newFiles);
    setTotalFiles(count);
  };
  const verifyFileType = dataFile => {
    let fileType = dataFile.split(".").pop();
    return fileType;
  };
  const getRequestTypeFile = async () => {
    try {
      let params = {
        order: "name",
        all: 1,
      };
      let response = await api.get("filetypes");
      setTypeFiles(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectFileType = option => {
    let fileTypeBody = {
      filterId: "filestypeId",
      label: "Tipo de Archivo: ",
    };
    if (option) {
      fileTypeBody.value = option.id;
      fileTypeBody.name = option.name;
    }
    handleValidateFilters(fileTypeBody);
  };

  const handleKeySearch = searchBy => {
    let searchBody = {
      filterId: "name",
      label: "Nombre del Archivo: ",
    };
    if (searchBy) {
      searchBody.value = searchBy;
      searchBody.name = searchBy;
    }
    handleValidateFilters(searchBody);
  };

  const handleValidateFilters = option => {
    let filters = [...filtersToApply];
    if (option.value) {
      let valdiateFilter = filters.filter(item => item.filterId !== option.filterId);
      valdiateFilter.push(option);
      setFiltersToApply(valdiateFilter);
    } else {
      let removeFilter = filters.filter(item => item.filterId !== option.filterId);
      setFiltersToApply(removeFilter);
    }
  };

  const handleApplyFilters = () => {
    setRefetchFiles(!refetchFiles);
    handleCloseFilters();
  };

  const handleDeleteFilter = filterOption => {
    let deleteFilter = [...filtersToApply];
    let filtersAfterDelete = deleteFilter.filter(filterItem => filterItem.filterId !== filterOption.filterId);
    setFiltersToApply(filtersAfterDelete);
    setRefetchFiles(!refetchFiles);
  };

  const handleChangePage = (e, page) => {
    setPageFiles(page);
    setRefetchFiles(!refetchFiles);
  };

  const handleDownloadFile = async () => {
    try {
      let typeFile = fileSelected.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + fileSelected.url,
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

  const styleIconDoument = file => {
    let typeFile = file.url.split(".").pop();
    switch (typeFile) {
      case "pdf":
        return <PictureAsPdf className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      case "docx":
        return <TextFields className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      case "xlsx":
        return <Functions className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      case "jpeg":
        return <Image className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      case "jpg":
        return <Image className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      case "png":
        return <Image className="iconfolder" onClick={() => handlePreviewFile(file)} />;
      default:
        return <InsertDriveFile className="iconfolder" onClick={() => handlePreviewFile(file)} />;
    }
  };

  return (
    <FilesStyled>
      <div className="container">
        <div className="container__head">
          <div className="container_name">
            <FolderShared className="iconfolder" />
            <p className="title">Archivos ({totalFiles})</p>
            {loaderFiles ? (
              <CircularProgress size={20} />
            ) : (
              <Cached className="iconreload" onClick={handleRefetchFiles} />
            )}
          </div>
          <div className="chips_filter">
            {!openFilters &&
              filtersToApply.map((item, index) => (
                <Chip
                  className="chip_filter"
                  key={index}
                  size="small"
                  color="primary"
                  label={`${item.label} "${item.name}"`}
                  onDelete={() => handleDeleteFilter(item)}
                />
              ))}
          </div>
          <div className="container_filter">
            <Button
              className="button_filter"
              onClick={() => setOpenFilters(true)}
              startIcon={<FilterList className="icon" />}
            >
              Filtros
            </Button>
          </div>
        </div>
        <div className="container__body">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item.id == 1 && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item.title}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {filesProspect.length > 0 ? (
                filesProspect?.map((item, index) => {
                  return (
                    <tr key={index} className="row">
                      <td className="data">
                        <p className="ctr_td">{dayjs(item?.createdAt).format("MMMM DD, YYYY. hh:mm a ")}</p>
                      </td>
                      <td className="data">
                        <p className="ctr_td">{styleIconDoument(item)}</p>
                      </td>

                      <td className="data">
                        <p className="file" onClick={() => handlePreviewFile(item)}>
                          {item.name}
                        </p>
                      </td>
                      <td className="data">
                        <p className="">{item.filestype?.name}</p>
                      </td>
                      <td className="data">
                        <p className="ctr_td">
                          <Tooltip title="Menu Opciones" arrow={true}>
                            <IconButton
                              aria-describedby={id}
                              onClick={e => handleClick(e, item)}
                              className="menuButton"
                            >
                              <MoreVert />
                            </IconButton>
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
                                  setOpenPreview(true);
                                  handleClose();
                                }}
                              >
                                Visualizar
                              </Button>
                              <Divider />
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
                              <Divider />
                              <Button
                                className="option"
                                endIcon={<PlayForWork />}
                                onClick={() => {
                                  // handleClose();
                                  handleDownloadFile();
                                }}
                              >
                                {/* <a href={fileSelected.url} target="_blank" rel="noreferrer" download> */}
                                Descargar
                                {/* </a> */}
                              </Button>
                              <Divider />
                              <Button
                                className="option"
                                endIcon={<DeleteForever />}
                                onClick={() => {
                                  setShowConfirmDelete(true);
                                  handleClose();
                                }}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </MenuFile>
                        </p>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="body_empty">
                      <div className="message_ctr">
                        <img src="/empty_table.svg" />
                        <p>Aun no hay datos</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="table_pagination">
            <Pagination
              className="pagination"
              count={totalPagesFiles}
              onChange={handleChangePage}
              defaultPage={1}
              color="primary"
            />
          </div>
        </div>

        <div className="container__footer">
          <Button className="addfile" onClick={() => setOpenAddFile(true)}>
            Agregar Archivo
          </Button>
        </div>
      </div>
      <DrawerFilters anchor="right" open={openFilters} onClose={handleCloseFilters}>
        <div className="container">
          <div className="container__head">
            <p className="title">Filtra los Archivos por tu Preferencia</p>
            <IconButton onClick={handleCloseFilters} className="button_close">
              <Close className="icon" />
            </IconButton>
          </div>
          <div className="container__body">
            <Grid container spacing={2} className="filter_options">
              <Grid item md={12} sm={12}>
                <p className="title_option">Nombre del Archivo:</p>
                <input className="input_search" type="text" onChange={e => handleKeySearch(e.target.value)} />
              </Grid>
              <Grid item md={12} sm={12}>
                <p className="title_option">Filtrar por Tipo de Archivo:</p>
                <Select
                  className="select_filter"
                  placeholder="Selecciona una Opción"
                  noOptionsMessage={() => "Sin Opciones"}
                  isClearable={true}
                  options={typeFiles}
                  onChange={handleSelectFileType}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                />
              </Grid>
            </Grid>
          </div>
          <div className="container__footer">
            <div className="buttons">
              <Button className="apply_button" onClick={handleApplyFilters}>
                Aplicar
              </Button>
              <Button className="cancel_button">Cancelar</Button>
            </div>
          </div>
        </div>
      </DrawerFilters>
      <AddFilesProspect
        open={openAddFile}
        close={handleCloseAddFile}
        prospect={prospect}
        setFlag={handleRefetchFiles}
      />
      <EditFilePros open={openEditFile} close={handleCloseEditFile} file={fileSelected} setFlag={setFlag} />
      <PreviewFile open={openPreview} close={handleClosePreviewFile} file={fileSelected} setFlag={setFlag} />
      <ConfirmDeleteFile
        open={showConfirmDelete}
        close={handleCloseConfirmDelete}
        file={fileSelected}
        setFlag={setFlag}
      />
    </FilesStyled>
  );
}
const heads = [
  {
    id: 1,
    title: "Fecha de Creación",
  },
  {
    id: 2,
    title: "Formato",
  },

  {
    id: 3,
    title: "Nombre de Archivo",
  },
  {
    id: 4,
    title: "Tipo de Archivo",
  },
  {
    id: 5,
    title: "",
  },
];
