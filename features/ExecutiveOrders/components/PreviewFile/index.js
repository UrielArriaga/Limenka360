import React from "react";
import { PreviewFileStyled } from "./styles";

const renderPreview = (type, fileUrl) => {
  switch (type) {
    case "application/pdf":
      return <iframe src={fileUrl} width="100%" height="780px"></iframe>;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <p>No hay vista previa</p>;
    case "image/jpeg":
    case "image/png":
    case "image/webp":
      return <img style={{ width: "100%", height: "100%" }} src={fileUrl} alt={fileUrl} />;
    default:
      return <p>No hay vista previa</p>;
  }
};

export default function PreviewFile({ open = true, onClose, fileSelect = {} }) {
  return (
    <PreviewFileStyled open={open} anchor="right" onClose={() => onClose()}>
      <div className="header">
        <h3>Vista Previa del archivo</h3>
      </div>

      <div className="body">{renderPreview(fileSelect?.type, fileSelect?.preview)}</div>
    </PreviewFileStyled>
  );
}
