import React, { useState } from "react";
import { Button } from "@mui/material";
import { StyledBox, StyledContainer, StyledModal, SidebarContainer } from "./styled";
import { Print } from "@material-ui/icons";

export default function PrintPdf({ documents = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const openModal = () => {
    if (documents.length > 0) {
      setSelectedDocument(documents[0]);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfError(false);
  };

  const setSelectedDocument = doc => {
    setPdfUrl(doc.url);
    setSelectedDoc(doc.name);
    setPdfError(false);
    checkPdf(doc.url);
  };

  const checkPdf = url => {
    if (!url) {
      setPdfError(true);
      return;
    }

    fetch(url, {
      mode: "no-cors",
    })
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el PDF.");
        return response.blob();
      })
      .then(blob => {
        if (blob.size === 0) throw new Error("El PDF está vacío.");
        setPdfError(false);
      })
      .catch(() => setPdfError(true));
  };

  const handlePrint = () => {
    if (!pdfUrl) return;
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar el PDF.");
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const iframe = document.createElement("iframe");
        Object.assign(iframe.style, { position: "absolute", width: "0px", height: "0px", border: "none" });
        iframe.src = url;
        document.body.appendChild(iframe);
        iframe.onload = () => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        };
      })
      .catch(() => setPdfError(true));
  };

  const renderDocumentList = () => (
    <SidebarContainer>
      <h3>Documentos</h3>
      {documents.length === 0 ? (
        <p>No hay documentos disponibles.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              style={{
                cursor: "pointer",
                padding: "5px",
                backgroundColor: selectedDoc === doc.name ? "#f0f0f0" : "transparent",
              }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </SidebarContainer>
  );

  const renderPdfContent = () => {
    // if (pdfError)
    //   return (
    //     <div className="empty">
    //       <img src="/imageicon.png" className="empty__image" />
    //       <p className="titleNotFound">No se pudo cargar el PDF o el archivo está vacío.</p>
    //     </div>
    //   );
    if (!pdfUrl) return <p>Seleccione un documento para previsualizarlo.</p>;
    return (
      <iframe
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="780px"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    );
  };

  return (
    <StyledContainer>
      <Button startIcon={<Print />} className="buttonPdf" onClick={openModal}>
        Imprimir
      </Button>

      <StyledModal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <StyledBox>
          <div className="header">
            <h2>Vista previa: {selectedDoc || "Sin documento seleccionado"}</h2>
            <div className="actions">
              <Button className="buttonPrint" onClick={handlePrint} disabled={pdfError || !pdfUrl}>
                Imprimir
              </Button>
              <Button onClick={closeModal} className="close">
                Cerrar
              </Button>
            </div>
          </div>

          <div className="renderList">
            {renderDocumentList()}
            <div className="renderPdf">{renderPdfContent()}</div>
          </div>
        </StyledBox>
      </StyledModal>
    </StyledContainer>
  );
}
