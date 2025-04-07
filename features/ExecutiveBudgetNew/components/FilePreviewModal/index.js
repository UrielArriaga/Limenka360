import React from "react";
import { Modal, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600, // Aumenta el ancho del modal
    bgcolor: "white", // Fondo blanco para el modal
    borderRadius: "10px", // Bordes redondeados
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Sombra suave
    p: 4,
    border: "none", // Quita el borde negro
  };

const PreviewImage = styled.img`
  width: 100%; // Aumenta el tamaño de la imagen para que ocupe todo el ancho del modal
  height: auto; // Mantiene la proporción de la imagen
  object-fit: cover;
  margin: 5px 0; // Margen arriba y abajo
  border-radius: 10px; // Bordes redondeados en la imagen
`;

const PDFPreview = styled.iframe`
  width: 100%; // Ocupa todo el ancho del modal
  height: 600px; // Aumenta la altura del PDF
  border: none; // Sin borde para una mejor presentación
  border-radius: 10px; // Bordes redondeados en el iframe
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px; // Tamaño de fuente más grande para el título
  color: #333; // Color del texto
`;

const FilePreviewModal = ({ open, onClose, file }) => {
  const isImage = file && file.type.startsWith("image/");
  const isPDF = file && file.type === "application/pdf";

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ModalHeader>
          <ModalTitle>Vista Previa</ModalTitle>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer", color: "#EF5350" }} />
        </ModalHeader>
        {isImage && <PreviewImage src={URL.createObjectURL(file)} alt={file.name} />}
        {isPDF && (
          <PDFPreview src={URL.createObjectURL(file)} title={file.name} />
        )}
        {isImage && <h3 style={{ textAlign: "center" }}>{file.name}</h3>}
        {isPDF && <h3 style={{ textAlign: "center" }}>{file.name}</h3>}
      </Box>
    </Modal>
  );
};

export default FilePreviewModal;
