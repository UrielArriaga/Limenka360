import React, { useState, useEffect, useCallback } from "react";
import { api } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { validateURL } from "../../../utils";
import { userSelector } from "../../../redux/slices/userSlice";
import { commonSelector } from "../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import useAlertToast from "../../../hooks/useAlertToast";
import {
  FileCopy,
  Functions,
  Image,
  PictureAsPdf,
  TextFields,
} from "@material-ui/icons";

const admitTypeFiles = [
  { name: "pdf", color: "#D30204" },
  { name: "docx", color: "#0472D5" },
  { name: "xlsx", color: "#1C9B06" },
  { name: "jpeg", color: "#D5BD12" },
  { name: "jpg", color: "#B403C0" },
  { name: "png", color: "#E87706" },
];

export default function useFiles(data) {
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const { groupId, company, id_user } = useSelector(userSelector);
  const { filetypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoader, setIsLoader] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isLoaderUpload, setIsLoaderUpload] = useState(false);
  const [pageFiles, setPageFiles] = useState(1);
  const [file, setFile] = useState({ files: [], count: 0 });
  const [fileSelected, setFileSelected] = useState({});
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const limitFiles = 8;
  const filesLenght = files.count ? files.count : files.length;

  useEffect(() => {
    if (data?.id) {
      getFiles();
    }
  }, [pageFiles, refetch, data?.id]);

  const returnStyleTypeFile = (type) => {
    switch (type) {
      case "pdf":
        return <PictureAsPdf />;
      case "docx":
        return <TextFields />;
      case "xlsx":
        return <Functions />;
      case "jpeg":
      case "jpg":
      case "png":
        return <Image />;
      default:
        return <FileCopy />;
    }
  };

  const searchColorStyle = (type) => {
    const searchColor = admitTypeFiles.filter((item) => item.name === type);
    return searchColor[0]?.color || "black";
  };

  const verifyFileType = (dataFile) => {
    return dataFile.split(".").pop();
  };

  const handleFileSelect = (dataFile) => {
    getCatalogBy("filetypes");
    const file = dataFile.target.files[0];
    if (file) {
      const typeFile = verifyFileType(file.name);
      const validateExtension = admitTypeFiles.find(
        (item) => item.name === typeFile
      );
      if (validateExtension) {
        setFile({
          name: file.name,
          type: typeFile,
          file: file,
        });
      } else {
        showAlertWarning("Tipo de archivo no permitido");
      }
    }
  };

  const getFiles = async () => {
    setIsLoader(true);
    try {
      const query = {};
      const params = {
        where: JSON.stringify(query),
        order: "-createdAt",
        include: "filestype",
        limit: limitFiles,
        count: 1,
        skip: pageFiles,
      };

      const response = await api.get(`documents/order/${data.id}`, { params });
      normalizeFiles(response.data.results, response.data.count);
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      console.error(error);
    }
  };

  const normalizeFiles = (files, count) => {
    const newFiles = files.map((item) => ({
      id: item.id,
      name: item.name,
      fileType: item.filestype?.name,
      url: item.url,
      documentType: verifyFileType(item.url),
    }));
    setFiles({ files: newFiles, count: count });
  };

  const string_to_slug = (fileData) => {
    let str =
      fileData.name.substring(0, fileData.name.lastIndexOf(".")) ||
      fileData.name;
    const typeFile = fileData.name.split(".").pop();
    str = str.replace(/(<([^>]+)>)/gi, " ");
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "")
      .replace(/-+/g, "")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    const newBody = {
      name: `${str}.${typeFile}`,
      file: fileData.file,
    };
    uploadFileFolder(newBody);
  };

  const uploadFileFolder = async (dataFile) => {
    setIsLoaderUpload(true);
    try {
      const newData = new FormData();
      newData.append("file", dataFile.file);
      newData.append("name", dataFile.name);
      const response = await api.post(
        `files/uploadtofolder/${company}-G${groupId}-E${id_user}-P${data.prospectId}/${dataFile.name}`,
        newData
      );
      const fileBody = response.data;
      fileBody.name_file = dataFile.name;
      fileBody.typeFileId = searchFileTypeDefault("Otro");
      uploadFileOnDocuments(fileBody);
    } catch (error) {
      setIsLoaderUpload(false);
      console.error(error);
    }
  };

  const uploadFileOnDocuments = async (fileData) => {
    try {
      const bodyfile = {
        url: fileData.name,
        name: fileData.name_file,
        filestypeId: fileData.typeFileId,
        prospectId: data.prospectId,
        orderId: data.id,
      };
      if (data.oportunityId) bodyfile.oportunityId = data.oportunityId;
      if (data.id) bodyfile.id = data.id;
      const response = await api.post(`documents`, bodyfile);
      setRefetch(!refetch);
      setFile({});
      showAlertSucces("Guardado exitoso");
      restorePage();
      setIsLoaderUpload(false);
    } catch (error) {
      setIsLoaderUpload(false);
      showAlertError("Error al guardar");
      console.error(error);
    }
  };

  const searchFileTypeDefault = (typeName) => {
    const search = filetypes.results.filter((item) => item.name === typeName);
    return search[0]?.id;
  };

  const restorePage = () => {
    if (pageFiles > 1) setPageFiles(1);
  };

  const handleDownloadFile = async () => {
    try {
      const typeFile = fileSelected.url.split(".").pop();
      const responseURLSave = await api.post(
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
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        const typeFile = verifyFileType(droppedFile.name);
        const validateExtension = admitTypeFiles.find(
          (item) => item.name === typeFile
        );
        if (validateExtension) {
          setFile({
            name: droppedFile.name,
            type: typeFile,
            file: droppedFile,
          });
        } else {
          showAlertWarning("Tipo de archivo no permitido");
        }
      }
    },
    [dispatch]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  return {
    files,
    setFile,
    filesCount: files.count,
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
  };
}
