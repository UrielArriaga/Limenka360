import React, { useEffect } from "react";
import useModal from "../../../hooks/useModal";
import { useState } from "react";
import { api } from "../../../services/api";

export default function useDirLogFiles(orderSelected) {
  // * Dialog Trackings
  const { open: openFiles, toggleModal: handleToggleFiles } = useModal();
  const [refetch, setRefetch] = useState(false);
  const [filesData, setFilesData] = useState({
    results: [],
    count: 0,
    isFetching: false,
    isError: false,
    isErrorMessage: "",
  });

  useEffect(() => {
    const getFiles = async () => {
      try {
        setFilesData({
          ...filesData,
          isFetching: true,
        });
        let params = {
          where: JSON.stringify({
            orderId: orderSelected.id,
          }),
          include: "filestype",
          all: 1,
        };
        let filesResponse = (await api.get("documents", { params })).data;

        setFilesData({
          results: filesResponse?.results || [],
          count: filesResponse.length,
          isFetching: false,
        });
      } catch (error) {
        setFilesData({
          ...filesData,
          isFetching: false,
          isError: true,
          isErrorMessage: error.message,
        });
      }
    };

    if (orderSelected) {
      getFiles();
    }
  }, [orderSelected, refetch]);

  const handleRefetchFiles = () => setRefetch(!refetch);

  return {
    openFiles,
    handleToggleFiles,
    handleRefetchFiles,
    filesData,
  };
}
