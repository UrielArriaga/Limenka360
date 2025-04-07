import React, { useState } from "react";
import { Button } from "@mui/material";
import { StyledBox, StyledContainer, StyledModal } from "./styled";
import { Description, Print } from "@material-ui/icons";
import { useEffect } from "react";

export default function ModalPdfPrint({ pdfUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalPdf, setFinalPdf] = useState(null);
  const [pdfError, setPdfError] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
    checkPdf();
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setPdfError(false);
  };

  useEffect(() => {
    if (pdfUrl) {
      setFinalPdf(pdfUrl);
    }
  }, [pdfUrl]);

  const checkPdf = () => {
    if (!pdfUrl) {
      setPdfError(true);
      return;
    }
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el PDF.");
        }
        return response.blob();
      })
      .then(blob => {
        if (blob.size === 0) {
          throw new Error("El PDF está vacío.");
        }
        setPdfError(false);
      })
      .catch(() => {
        setPdfError(true);
      });
  };

  const handlePrint = () => {
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el PDF.");
        }
        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0px";
        iframe.style.height = "0px";
        iframe.style.border = "none";
        iframe.src = url;

        document.body.appendChild(iframe);
        iframe.onload = () => {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        };
      })
      .catch(() => {
        setPdfError(true);
      });
  };

  return (
    <StyledContainer>
      <Button startIcon={<Print />} className="buttonPdf" onClick={openModal} disabled={pdfUrl != "" ?  false : true }>
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
            <h2>Vista previa.</h2>
            <div className="actions">
              <Button
                className="buttonPrint"
                onClick={handlePrint}
                disabled={pdfError || !pdfUrl} // Deshabilitar el botón si hay error o URL vacía
              >
                Imprimir
              </Button>
              <Button onClick={closeModal} className="close">
                Cerrar
              </Button>
            </div>
          </div>
          <div className="content">
            {pdfError ? (
              <div className="empty">
                <img src="/imageicon.png" className="empty__image" />
                <p>
                  No hay vista previa{" "}
                  <span onClick={() => window.open(finalPdf, "_blank")} style={{ color: "blue" }}>
                    Click para ver PDF
                  </span>
                </p>
              </div>
            ) : (
              <iframe
                src={finalPdf}
                // type="application/pdf"
                width="100%"
                height="780px"
                style={{ border: "none" }}
                title="PDF Viewer"
              />
            )}
          </div>
        </StyledBox>
      </StyledModal>
    </StyledContainer>
  );
}
