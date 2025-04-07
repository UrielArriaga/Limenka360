import React from "react";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";
import AdminAlmacenEditOrdenesCompra from "../../../../features/AdminAlmacenEditOrdenesCompra";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
        <AdminAlmacenEditOrdenesCompra/>
    </CommonLogLayout>
  );
}
