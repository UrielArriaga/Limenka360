import React from "react";
import { FilesOrderStyled, TrackingsOrderStyled } from "./styles";
import { Close, DescriptionOutlined } from "@material-ui/icons";

export default function FilesOrder({ open = true, handletoogle, filesData }) {
  return (
    <FilesOrderStyled open={open} anchor="right" onClose={() => handletoogle()}>
      <div className="header">
        <div className="header__title">
          <p>Archivos Adjuntos</p>
        </div>

        <div className="header__close">
          <Close />
        </div>
      </div>
      <div className="newtracking"></div>

      <div className="files">
        {filesData.results.map((file, index) => (
          <div className="files__file" key={index}>
            <div className="files__file--icon">
              <DescriptionOutlined />
            </div>

            <div className="files__file--name">
              <p>{file.filestype?.name}</p>
              <p>{file.name}</p>
            </div>

            <div className="files__file--actions">
              <p>Visualizar</p>
              <p>Descargar</p>
            </div>
          </div>
        ))}
      </div>
    </FilesOrderStyled>
  );
}
