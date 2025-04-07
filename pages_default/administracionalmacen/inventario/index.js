import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";
import AdminAlmacenInventario from "../../../features/AdminAlmacenInventario";

export default function Inventario() {
  return (
    <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
      <AdminAlmacenInventario />
    </CommonLogLayout>
  );
}
