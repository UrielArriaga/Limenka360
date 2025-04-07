import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminAlmacenOrdenesCompra from "../../../features/AdminAlmacenOrdenesCompra";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
     <AdminAlmacenOrdenesCompra/>
    </CommonLogLayout>
  );
}
