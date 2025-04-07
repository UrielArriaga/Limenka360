import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";

export default function useFiles(oportunity, orderData) {
  const [filesData, setFiles] = useState({});

  useEffect(() => {
    if (orderData) {
      fetchFiles();
    }
  }, [orderData]);

  const fetchFiles = async () => {
    try {
      let params = {
        include: "filestype,uploadby",
        join: "filestype,uploay",
        where: {
          orderId: orderData?.id,
        },
        count: 1,
      };
      const response = await api.get("/documents", { params });

      setFiles({
        isFetching: false,
        results: response.data?.results,
        count: response.data?.count,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFileFromArray = async id => {
    const newFiles = filesData.results.filter(file => file.id !== id);
    setFiles({
      ...filesData,
      results: newFiles,
    });
  };

  const handleUpdateFile = (id, propertyName, value) => {
    const newFiles = filesData.results.map(file => {
      if (file.id === id) {
        if (propertyName === "filetype") {
          return { ...file, [propertyName]: value, filestypeId: value.id, isChanged: true };
        } else {
          return { ...file, [propertyName]: value, isChanged: true };
        }
      }
      return file;
    });

    if (propertyName === "filetype") {
    }

    setFiles({
      ...filesData,
      results: newFiles,
    });
  };

  return {
    filesData,
    setFiles,

    filesControl: {
      handleUpdateFile,
      handleDeleteFileFromArray,
      setFiles,
      filesData,
    },
  };
}
