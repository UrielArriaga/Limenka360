import { Description, Close, CloudUpload } from "@material-ui/icons";
import React, { useState } from "react";
import { PreviewBox, PreviewContainer, PreviewImage, Text, UploadContainer } from "./style";
import FilePreviewModal from "../FilePreviewModal";

const FileUpload = ({ files, setFiles }) => {
  const [dragOver, setDragOver] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleChange = e => {
    const selectedFiles = Array.from(e.target.files);
    console.log("files cambio", e.target.files)
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = index => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleOpenModal = file => {
    setSelectedFile(file);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFile(null);
  };

  return (
    <div>
      <Text className="text">Archivos</Text>
      <UploadContainer
        className={dragOver ? "dragover" : ""}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <CloudUpload style={{ color: "#64B5F6" }} />
        <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos</p>
        <input type="file" id="fileInput" multiple style={{ display: "none" }} onChange={handleChange} />
      </UploadContainer>
      <PreviewContainer>
        {files.map((file, index) => {
          const fileURL = URL.createObjectURL(file);
          const isImage = file.type.startsWith("image/");
          const isPDF = file.type === "application/pdf";

          return (
            <PreviewBox key={index} onClick={() => (isImage || isPDF) && handleOpenModal(file)}>
              {isImage ? (
                <PreviewImage src={fileURL} alt={file.name} />
              ) : (
                <Description style={{ fontSize: "40px", color: "#EF5350", marginRight: "10px" }} />
              )}
              <span>{file.name}</span>
              <Close
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                  color: "#EF5350",
                }}
                onClick={() => handleRemoveFile(index)} // Eliminar archivo
              />
            </PreviewBox>
          );
        })}
      </PreviewContainer>

      {/* Modal para vista previa */}
      <FilePreviewModal open={openModal} onClose={handleCloseModal} file={selectedFile} />
    </div>
  );
};

export default FileUpload;
