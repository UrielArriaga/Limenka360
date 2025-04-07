import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";

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
      return <iframe src={fileUrl} width="100%" height="780px"></iframe>;
  }
};

export default function PreviewFile({ showPreviewDocument, setShowPreviewDocument, fileUrl }) {
  return (
    <AnimatePresence>
      {showPreviewDocument && (
        <motion.div
          key="previewDocument"
          className="previewview"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="header">
            <h3>Vista previa de {showPreviewDocument?.name}</h3>
            <div className="close">
              <IconButton onClick={() => setShowPreviewDocument(null)}>
                <Cancel />
              </IconButton>
            </div>
          </div>

          <div className="body">{renderPreview(showPreviewDocument?.type, fileUrl)}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
