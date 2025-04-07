import { Avatar, Button, IconButton } from "@material-ui/core";
import { CloudDownloadRounded, Delete, Edit, RemoveRedEye } from "@material-ui/icons";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
// import JSZip from "jszip";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useAlertToast from "../../../../hooks/useAlertToast";
import { URL_SPACE } from "../../../../services/api";
import LoaderTable from "./LoaderTable";
import { renderTypeFile } from "./utils";

export default function ListFiles({
  filesOrder = [],
  fileToUpload = [],
  total = 0,
  orderData,
  limit,
  page,
  handlePage,
  isFetching,
  setShowPreviewDocument,
  setFileToUpdate,
  handleDeleteFile,
  showBy,
  setShowBy,
}) {
  if (fileToUpload.length > 0) return null;

  const [filesSelected, setFilesSelected] = useState([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const divTableRef = useRef(null);
  useEffect(() => {
    const div = divTableRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const element = divTableRef.current;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      fetchMoreData();
    }
  }, []);

  const fetchMoreData = useCallback(async () => {
    if (isFetching) return;
    let totalpages = Math.ceil(total / limit);

    if (page < totalpages) {
      handlePage(page + 1);
    }
  }, [page, total, limit]);

  const dowloandFile = async (url, name) => {
    try {
      setIsCreatingFolder(true);

      const response = await fetch(URL_SPACE + url);
      const blob = await response.blob();
      showAlertSucces("El Archivo se descargará automáticamente");
      saveAs(blob, name);
      setIsCreatingFolder(false);
    } catch (error) {
      showAlertError("Error al descargar el archivo");
      setIsCreatingFolder(false);
    }
  };

  const downloadFilesAsZip = async () => {
    try {
      setIsCreatingFolder(true);
      const zip = new JSZip();
      for (const file of filesSelected) {
        const response = await fetch(URL_SPACE + file.url);
        const blob = await response.blob();
        zip.file(file.name, blob);
      }

      showAlertSucces("El Archivo se descargar automaticamente");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${orderData?.folio}.zip`);
      setFilesSelected([]);
      setIsCreatingFolder(false);
    } catch (error) {
      showAlertError("Error al descargar los archivos");
      setIsCreatingFolder(false);
    }
  };

  if (isFetching && filesOrder.length === 0) {
    return <LoaderTable />;
  }

  const tabs = [
    {
      name: "Todos",
      value: "all",
    },
    {
      name: "Compras",
      value: "compras",
    },
    {
      name: "Logistica",
      value: "logistica",
    },
  ];

  return (
    <div className="sectionList ">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>
          Archivo Adjuntos
          <span
            style={{
              color: "#616161",
              fontSize: "14px",
              fontWeight: "normal",
              marginLeft: "10px",
            }}
          >
            Total ({total})
          </span>
        </h3>

        <Button
          disabled={filesSelected.length === 0 || isCreatingFolder}
          className={`${filesSelected.length === 0 ? "disabled" : "btndowloand"}`}
          variant="contained"
          color="primary"
          onClick={downloadFilesAsZip}
        >
          {isCreatingFolder ? "Generando Carpeta..." : `Descargar archivos`}
        </Button>
      </div>

      <div className="sectionList__tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`sectionList__tab ${showBy === tab.value ? "active" : ""}`}
            onClick={() => setShowBy(tab.value)}
          >
            <p>{tab.name}</p>
          </div>
        ))}
        {/* <div className="sectionList__tab">
          <p>Todos</p>
        </div>
        <div className="sectionList__tab">
          <p>Compras</p>
        </div>

        <div className="sectionList__tab">
          <p>Logistica</p>
        </div> */}
      </div>
      <div
        className="sectionList__table"
        ref={divTableRef}
        style={{ height: "600px", overflowY: "auto", position: "relative" }}
      >
        <table>
          <thead>
            <tr>
              <th>
                <input
                  checked={filesSelected.length === filesOrder.length}
                  type="checkbox"
                  onChange={e => {
                    if (e.target.checked) {
                      setFilesSelected(filesOrder);
                    } else {
                      setFilesSelected([]);
                    }
                  }}
                />
              </th>
              <th>Nombre del archivo</th>
              <th>Tipo de Archivo</th>
              <th>Fecha de Subida</th>
              <th>Subido por</th>
              <th>Acc.</th>
            </tr>
          </thead>
          <tbody>
            {filesOrder?.map((file, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <input
                      checked={filesSelected.some(f => f.id === file.id)}
                      type="checkbox"
                      onChange={e => {
                        if (e.target.checked) {
                          setFilesSelected([...filesSelected, file]);
                        } else {
                          setFilesSelected(filesSelected.filter(f => f.id !== file.id));
                        }
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div
                    className="row rowname"
                    onClick={() => {
                      setShowPreviewDocument({
                        preview: URL_SPACE + file.url,
                        name: file.name,
                        type: file.fileextension,
                      });
                    }}
                  >
                    <div className="file">{renderTypeFile(file.fileextension)}</div>
                    <div>
                      {index + 1}.- {file.name}
                      {file?.warehouseproductId !== null && <p className="articleproduct">Archivo de producto</p>}
                    </div>
                  </div>
                </td>
                <td>{file?.filestype?.name}</td>
                <td>
                  <div>
                    {dayjs(file?.createdAt).format("DD/MM/YYYY")}
                    <p>{dayjs(file?.createdAt).format("h:mm:ss A")}</p>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={URL_SPACE + file?.uploadby?.photo}
                      sizes="small"
                      style={{
                        width: 20,
                        height: 20,
                        marginBottom: 4,
                        background: "#9e9e9e",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {file?.uploadby?.fullname?.slice(0, 2)}
                    </Avatar>
                    <p
                      style={{
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {file?.uploadby?.fullname}
                    </p>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <IconButton className="iconButton" onClick={() => dowloandFile(file.url, file.name)}>
                      <CloudDownloadRounded className="iconMUI" />
                    </IconButton>
                    <IconButton className="iconButton" onClick={() => handleDeleteFile(file)}>
                      <Delete className="iconMUI" />
                    </IconButton>
                    {/* <IconButton
                      className="iconButton"
                      onClick={() =>
                        setShowPreviewDocument({
                          preview: URL_SPACE + file.url,
                          name: file.name,
                          type: file.fileextension,
                        })
                      }
                    >
                      <RemoveRedEye className="iconMUI" />
                    </IconButton> */}

                    <IconButton className="iconButton" onClick={() => setFileToUpdate(file)}>
                      <Edit className="iconMUI" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filesOrder.length < total && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
            <Button variant="outlined" onClick={fetchMoreData}>
              {isFetching ? "Cargando..." : "Cargar más"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
