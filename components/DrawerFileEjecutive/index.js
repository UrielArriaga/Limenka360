import React, { useEffect, useState } from "react";
import { DrawerFileStyled } from "./styles";

const DrawerFileEjecutive = ({ show, closeDrawer, dataFileDrawer }) => {
  return (
    <DrawerFileStyled
      anchor="right"
      open={show}
      onClose={() => {
        closeDrawer();
      }}
    >
      <div className="drawerFile">
        <h3>Archivo: Comprobante de Pago</h3>
        {dataFileDrawer?.type === "application/pdf" ? (
            <iframe src={dataFileDrawer?.url} width={"100%"} height={970}></iframe>
        ):(
            <img src={dataFileDrawer?.url} width={"100%"} />
        )}
      </div>
    </DrawerFileStyled>
  );
};

export default DrawerFileEjecutive;
