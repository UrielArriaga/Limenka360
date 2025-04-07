import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminAlmacenPickups from "../../../features/AdminAlmacenPickups";

function AlmacenRecolecciones() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
      <AdminAlmacenPickups />
    </CommonLogLayout>
  );
}

export default AlmacenRecolecciones;
