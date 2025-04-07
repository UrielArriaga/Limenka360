import React, { useEffect, useRef, useCallback, useState } from "react";
import { Skeleton } from "@material-ui/lab"; // O la biblioteca que uses para Skeleton
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadRounded from "@material-ui/icons/CloudDownloadRounded";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import dayjs from "dayjs";
import { renderTypeFile } from "./utils";

const InfiniteScrollTable = ({ fetchData, URL_SPACE, filesOrder }) => {
  const [filesSelected, setFilesSelected] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const divTableRef = useRef(null);

  const handleScroll = useCallback(() => {
    const element = divTableRef.current;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      console.log("im in the bottom");
      fetchMoreData();
    }
  }, []);

  const fetchMoreData = useCallback(async () => {
    if (isFetching) return;
    // setIsFetching(true);
    // const newData = await fetchData();
    // setFilesOrder(prevFiles => [...prevFiles, ...newData]);
    // setIsFetching(false);
  }, [fetchData, isFetching]);

  useEffect(() => {
    const element = divTableRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  //   useEffect(() => {
  //     fetchMoreData();
  //   }, [fetchMoreData]);

  return (
    <div className="sectionList__table" ref={divTableRef} style={{ height: "600px", overflowY: "auto" }}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                checked={filesSelected > 1 && filesSelected.length === filesOrder.length}
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
                  {file.name}
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
                    style={{ width: 30, height: 30, marginBottom: 4, background: "#9e9e9e" }}
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
                    <CloudDownloadRounded />
                  </IconButton>
                  <IconButton className="iconButton">
                    <OpenInBrowser />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
          {/* {isFetching &&
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton variant="rectangular" width={40} height={20} />
                </td>
                <td>
                  <Skeleton variant="rectangular" width="100%" height={20} />
                </td>
                <td>
                  <Skeleton variant="rectangular" width="80px" height={20} />
                </td>
                <td>
                  <Skeleton variant="rectangular" width="80px" height={20} />
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
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="text" width={50} height={20} />
                  </div>
                </td>
                <td>
                  <div className="row">
                    <Skeleton variant="rectangular" width={24} height={24} style={{ marginRight: 8 }} />
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </div>
                </td>
              </tr>
            ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default InfiniteScrollTable;
