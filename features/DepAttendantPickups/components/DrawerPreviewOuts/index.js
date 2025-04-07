import React from "react";
import { ModalAddProductStyled } from "./styles";
import { Drawer } from "@mui/material";
import MerchandiseoutTemplate from "../../../../components/Templates/MerchandiseoutTemplate";
import { Button } from "@material-ui/core";

export default function DrawerPrevieOuts({ open, handleOnClose, data,handleCrated}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleOnClose}
      PaperProps={{
        sx: { width: "900px", padding: "10px" }, // Fijamos el ancho aquí
      }}
    >
      <ModalAddProductStyled>

        <h2>Descargar Archivo</h2>
      <MerchandiseoutTemplate data={data} />
      <div className="container_button">
        <Button className="button" onClick={handleCrated}>Imprimir y Guardar Documento</Button>
      </div>
      </ModalAddProductStyled>
      
    </Drawer>
  );
}
