import React from "react";
import { StyledContainer, StyledBox, StyledModal } from "./styles";
import { Button } from "@mui/material";

function ModalWarrantyArticle({ isModalOpen, closeModal, url, quantityExist }) {
  return (
    <StyledContainer>
      <StyledModal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <StyledBox>
          <div className="header">
            <h2>Vista Previa de la Garantía</h2>
          </div>
          <div className="content">
            {quantityExist == 0 ? (
              <div className="empty">
                <img src="/imageicon.png" className="empty__image" />
                <p style={{textAlign:"center"}}>No hay vista previa </p>
              </div>
            ) : (
              <iframe
                src={url}
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

export default ModalWarrantyArticle;
