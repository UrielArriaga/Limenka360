import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
import { api } from "../../../services/api";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { replaceSpacesWithHyphens } from "../../../componentx/common/DirLog/FilesUpload/utils";

export default function useShoppingFiles(orderSelected) {
  const { id_user } = useSelector(userSelector);

  const [refetch, setRefetch] = useState(false);
  const [fileToUpdate, setFileToUpdate] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploading, setFileUploading] = useState(null);

  const [filesData, setFilesData] = useState({
    results: [],
    count: 0,
    isFetching: false,
    isError: false,
    isErrorMessage: "",
  });

  const { showAlertSucces, showAlertError } = useAlertToast();

  const { open: openFiles, toggleModal: handleToggleFiles } = useModal();
  const { limit, page, handlePage: handleOnChangePageFiles } = usePagination({ defaultPage: 1, defaultLimit: 12 });

  useEffect(() => {
    if (orderSelected && openFiles) {
      fetchFiles();
    }
  }, [orderSelected, refetch, page, openFiles]);

  const fetchFiles = async () => {
    try {
      setFilesData(prevState => ({ ...prevState, isFetching: true }));
      const params = createParams();
      const filesResponse = (await api.get("documents", { params })).data;
      updateFilesData(filesResponse);
    } catch (error) {
      setFilesData(prevState => ({ ...prevState, isError: error, isFetching: false }));
    }
  };

  const createParams = () => ({
    where: JSON.stringify({ purchaseorderId: orderSelected.id }),
    include: "filestype,uploadby",
    join: "filestype,das",
    limit: limit,
    skip: page,
    count: 1,
    order: "-createdAt",
  });

  const updateFilesData = filesResponse => {
    setFilesData(prevState => ({
      ...prevState,
      results: page > 1 ? [...prevState.results, ...filesResponse.results] : filesResponse.results,
      count: filesResponse.count,
      isFetching: false,
    }));
  };

  const handleRefetchFiles = () => setRefetch(!refetch);

  const handleUpdateFile = async () => {
    try {
      await api.put(`documents/${fileToUpdate.id}`, {
        name: fileToUpdate.name,
        filestypeId: fileToUpdate.filestypeId,
      });

      updateFileInState(fileToUpdate);

      showAlertSucces("Archivo actualizado correctamente");
    } catch (error) {
      showAlertError("Error al actualizar el archivo");
    }
  };

  const updateFileInState = updatedFile => {
    const newFiles = filesData.results.map(file => (file.id === updatedFile.id ? updatedFile : file));

    setFilesData(prevState => ({ ...prevState, results: newFiles }));
    setFileToUpdate(null);
  };

  const handleOnChangeFile = (key, value) => {
    if (key === "filestypeId") {
      setFileToUpdate(prevState => ({
        ...prevState,
        idTypeFile: value.id,
        filestype: {
          id: value.id,
          name: value.name,
        },
      }));
    } else {
      setFileToUpdate(prevState => ({ ...prevState, [key]: value }));
    }
  };

  let handleOnProgress = progressEvent => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setUploadProgress(percent);
  };

  const handleOnClickUploadFiles = async () => {
    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        setFileUploading(filesToUpload[i]);
        let dataObjFile = {};
        dataObjFile.url = "";
        dataObjFile.isevidence = false;
        dataObjFile.name = filesToUpload[i].name;
        dataObjFile.size = filesToUpload[i].size;
        dataObjFile.filestypeId = filesToUpload[i].idTypeFile;
        dataObjFile.fileextension = filesToUpload[i].fileextension;
        dataObjFile.purchaseorderId = orderSelected?.id
        await api.post(
          `documents`,
          dataObjFile,
          {
            onUploadProgress: handleOnProgress,
          }
        );
        setUploadProgress(0);
        setFilesToUpload(prevState => {
          return prevState.map((file, index) => {
            if (index === i) {
              return { ...file, issuccess: true };
            }
            return file;
          });
        });
      }

      showAlertSucces("Archivos subido correctamente");
      setFilesToUpload([]);
      setUploadProgress(0);

      fetchFiles();
      setFileUploading(null);
    } catch (error) {
      setUploadProgress(0);
      setFileUploading(null);

      showAlertError("Error al subir archivo");
    }
  };

  const handleOnChangeEditFile = (index, key, value) => {
    const newFiles = [...filesToUpload];
    newFiles[index][key] = value;
    setFilesToUpload(newFiles);
  };

  const handleDeleteFile = async file => {
    console.log(file);

    console.log(id_user);
    try {
      if (file.uploadbyId !== id_user) {
        showAlertError("No puedes eliminar un archivo que no hayas subido");
        return;
      }
      let isOk = window.confirm("¿Estás seguro de eliminar el archivo?");
      if (!isOk) return;

      await api.delete(`documents/${file.id}`);
      fetchFiles();
      showAlertSucces("Archivo eliminado correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Error al eliminar el archivo");
    }
  };

  return {
    openFiles,
    handleToggleFiles,

    fileToUpdate,
    setFileToUpdate,
    handleUpdateFile,
    handleOnChangeFile,
    handleOnChangePageFiles,

    actionsFiles: {
      handleRefetchFiles,
      handleUpdateFile,
      handleOnClickUploadFiles,
      handleOnChangeFile,
      handleOnChangePageFiles,
      handleOnChangeEditFile,
      handleDeleteFile,
      setFileToUpdate,
      setFilesToUpload,
      setUploadProgress,
    },

    statesFiles: {
      filesToUpload,
      uploadProgress,
      fileUploading,
      filesData,
      fileToUpdate,
    },
    paginationFiles: {
      limit,
      page,
    },
  };
}
