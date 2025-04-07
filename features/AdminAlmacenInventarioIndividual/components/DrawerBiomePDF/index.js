import React from "react";
import PropTypes from "prop-types";
import { Drawer, IconButton } from "@mui/material";
import { Close } from "@material-ui/icons";

const DrawerBiomePDF = ({ open, onClose, url }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "700px" }, // Fijamos el ancho aquí
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ccc",
          }}
        >
          <h3 style={{ margin: 0 }}>Vista Previa</h3>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        {/* Iframe */}
        <iframe
          src={url}
          style={{
            flex: 1,
            border: "none",
          }}
          title="Vista previa"
        />
      </div>
    </Drawer>
  );
};

DrawerBiomePDF.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default DrawerBiomePDF;
