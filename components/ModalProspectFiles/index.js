import { Button, IconButton, Tooltip, Zoom } from "@material-ui/core";
import { Cached, FolderShared, InsertDriveFile, MoreHoriz } from "@material-ui/icons";
import React, { useState } from "react";
import AddFilesProspect from "../ModalAddFilesProspect";
import { FilesStyled } from "./styles";
import dayjs from "dayjs";
export default function ProspectFiles() {
  const [openAddFile, setOpenAddFile] = useState(false);

  const handleCloseAddFile = () => setOpenAddFile(false);

  return (
    <FilesStyled>
      <div className="container">
        <div className="container__head">
          <FolderShared className="iconfolder" />
          <p className="title">Archivos</p>
          <Cached className="iconreload" />
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
              {files.map((item, index) => {
                return (
                  <tr key={index} className="row">
                    <td className="data">
                      <p className="ctr_td">{dayjs(item.createdAt).format("MMMM DD, YYYY. hh:mm a ")}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">
                        <InsertDriveFile className="iconfolder" />
                      </p>
                    </td>
                    <td className="data">
                      <p className="file">{item.name}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="container__footer">
          <Button className="addfile" onClick={() => setOpenAddFile(true)}>
            Agregar Archivo
          </Button>
        </div>
      </div>
      <AddFilesProspect open={openAddFile} close={handleCloseAddFile} />
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
    title: "",
  },
  {
    id: 3,
    title: "Nombre de Archivo",
  },
];

const files = [
  {
    id: 1,
    name: "archivo con nombre muy largo para la visualización daedea deajdbae d aehdea hdeahdhaedhaedheaehd deha dhaehdeahd beahdea",
    url: "ver_c.com",
    createdAt: "2023-03-06T18:45:10.675Z",
  },
  {
    id: 2,
    name: "archivo con nombre muy largo para la visualización",
    url: "ver_c.com",
    createdAt: "2023-03-06T18:45:10.675Z",
  },
  {
    id: 3,
    name: "archivo con nombre muy largo para la visualización",
    url: "ver_c.com",
    createdAt: "2023-03-06T18:45:10.675Z",
  },
  {
    id: 4,
    name: "archivo con nombre muy largo para la visualización",
    url: "ver_c.com",
    createdAt: "2023-03-06T19:45:10.675Z",
  },
];
