import { useState } from "react";

const useFileUpload = (initialFiles = []) => {
  const [files, setFiles] = useState(initialFiles);
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

  return {
    files,
    dragOver,
    openModal,
    selectedFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleChange,
    handleRemoveFile,
    handleOpenModal,
    handleCloseModal,
    setFiles,
  };
};

export default useFileUpload;
