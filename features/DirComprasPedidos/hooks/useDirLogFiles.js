import React, { useEffect } from "react";
import useModal from "../../../hooks/useModal";
import { useState } from "react";
import { api } from "../../../services/api";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { replaceSpacesWithHyphens } from "../../../componentx/common/DirLog/FilesUpload/utils";

export default function useDirLogFiles(orderSelected) {
  // * Dialog Trackings
  const { id_user } = useSelector(userSelector);
  const { open: openFiles, toggleModal: handleToggleFiles } = useModal();
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

  const [showBy, setShowBy] = useState("all");
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { limit, page, handlePage: handleOnChangePageFiles } = usePagination({ defaultPage: 1, defaultLimit: 12 });

  useEffect(() => {
    if (orderSelected && openFiles) {
      getFiles();
    }
  }, [orderSelected, refetch, page, openFiles]);

  const getFiles = async () => {
    try {
      setFilesData(prevState => ({ ...prevState, isFetching: true }));
      const params = createParams();
      const filesResponse = (await api.get("documents", { params })).data;
      updateFilesData(filesResponse);
    } catch (error) {
      setFilesData(prevState => ({ ...prevState, isError: error, isFetching: false }));
    }
  };
  const updateFilesData = filesResponse => {
    setFilesData(prevState => ({
      ...prevState,
      results: page > 1 ? [...prevState.results, ...filesResponse.results] : filesResponse.results,
      count: filesResponse.count,
      isFetching: false,
    }));
  };

  // useEffect(() => {
  //   const getFiles = async () => {
  //     try {
  //       setFilesData({
  //         ...filesData,
  //         isFetching: true,
  //       });
  //       let params = {
  //         where: JSON.stringify({
  //           orderId: orderSelected.id,
  //         }),
  //         include: "filestype",
  //         all: 1,
  //       };
  //       let filesResponse = (await api.get("documents", { params })).data;

  //       setFilesData({
  //         results: filesResponse?.results || [],
  //         count: filesResponse.length,
  //         isFetching: false,
  //       });
  //     } catch (error) {
  //       setFilesData({
  //         ...filesData,
  //         isFetching: false,
  //         isError: true,
  //         isErrorMessage: error.message,
  //       });
  //     }
  //   };

  //   if (orderSelected) {
  //     getFiles();
  //   }
  // }, [orderSelected, refetch]);

  const createParams = () => ({
    where: JSON.stringify({ orderId: orderSelected.id }),
    include: "filestype,uploadby",
    join: "filestype,das",
    limit: limit,
    skip: page,
    count: 1,
    order: "-createdAt",
  });

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
  let handleOnProgress = progressEvent => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setUploadProgress(percent);
  };
  const handleOnClickUploadFiles = async () => {
    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        setFileUploading(filesToUpload[i]);
        let formDataFile = new FormData();
        formDataFile.append("file", filesToUpload[i].file);
        // formDataFile.append("name", filesToUpload[i].name);
        // formDataFile.append("fileextension", filesToUpload[i].type);
        // formDataFile.append("size", filesToUpload[i].size);
        formDataFile.append("oportunityId", orderSelected.oportunityId);
        formDataFile.append("prospectId", orderSelected.oportunity?.prospectId);
        formDataFile.append("uploadbyId", id_user);
        formDataFile.append("filestypeId", filesToUpload[i].idTypeFile);
        await api.post(
          `files/fileuploaddata/${orderSelected?.id}`,
          formDataFile,
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

      getFiles();
      setFileUploading(null);
    } catch (error) {
      setUploadProgress(0);
      setFileUploading(null);
      showAlertError("Error al subir archivo");
    }
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
      getFiles();
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
      handleDeleteFile,
      handleUpdateFile,
      handleOnClickUploadFiles,
      handleOnChangeFile,
      handleOnChangePageFiles,
      handleOnChangeEditFile,
      setFileToUpdate,
      setFilesToUpload,
      setUploadProgress,
      setShowBy,
    },

    statesFiles: {
      filesData,
      fileToUpdate,
      filesToUpload,
      fileUploading,
      uploadProgress,
      showBy,
    },

    paginationFiles: {
      limit,
      page,
    },
  };
}
