import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { salesTypes } from "../../ExecutiveOrders/data";
import { generateTemporalId } from "../../../utils";

export default function useFiles(oportunity, formControls) {
  const [filesData, setFiles] = useState({
    results: [],
    count: 1,
    isFetching: false,
  });

  const bytesToMB = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2);
  };

  useEffect(() => {
    let typeSale = formControls.getValues("order.typesale") || null;
    if (!typeSale) return;

    let defaultFiles = salesTypes[typeSale.name];

    let files = defaultFiles?.map(file => {
      return {
        name: "",
        description: "",
        preview: null,
        file: null,
        filestypeId: file.id,
        size: null,
        fileextension: null,
        isError: false,
        isDefault: true,
        isNew: false,
        id: "TEMPFILE" + generateTemporalId(16),
      };
    });

    setFiles({
      results: files,
      count: files?.length,
      isFetching: false,
    });
  }, [formControls.getValues("order.typesale")]);

  const handleDeleteFileFromArray = async (id, isDeault = false) => {
    if (isDeault) {
      const newFiles = filesData.results.map(file => {
        if (file.id === id) {
          return {
            ...file,
            name: "",
            file: null,
            preview: null,
            size: null,
            fileextension: null,
            isError: false,
            isNew: false,
          };
        }
        return file;
      });

      setFiles({
        ...filesData,
        results: newFiles,
      });

      return;
    }

    const newFiles = filesData.results.filter(file => file.id !== id);
    setFiles({
      ...filesData,
      results: newFiles,
    });
  };

  const handleOnChangeFile = (id, file) => {
    if (!file || !(file instanceof File)) {
      console.error("Archivo no válido:", file);
      return;
    }

    const newFiles = filesData.results.map(f => {
      if (f.id === id) {
        let newFile = {
          ...f,
          name: f ? f.name : file.name,
          preview: file ? URL.createObjectURL(file) : f.preview,
          file: file,
          size: bytesToMB(file.size),
          fileextension: file.type,
          isError: false,
          isNew: true,
        };

        console.log(newFile);
        return newFile;
      }
      return f;
    });

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
      handleOnChangeFile,
      handleDeleteFileFromArray,
      setFiles,
      filesData,
    },
  };
}
