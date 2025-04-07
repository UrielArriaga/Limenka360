import React from "react";
import AdminAlmacenPedidos from "../../features/AdminAlmacenPedidos";
import CommonLogLayout from "../../layouts/CommonLogLayout";

export default function AdminAlmacen() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
      <AdminAlmacenPedidos />
    </CommonLogLayout>
  );
}
