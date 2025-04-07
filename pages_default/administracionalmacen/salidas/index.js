import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";
import AdminAlmacenSalidas from "../../../features/AdminAlmacenSalidas";

export default function Entradas() {
  return (
    <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
      <AdminAlmacenSalidas />
    </CommonLogLayout>
  );
}
