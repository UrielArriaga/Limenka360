import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";
import AdminAlmacenInventarioIndividual from "../../../features/AdminAlmacenInventarioIndividual";

export default function InventarioIndividual() {
  return (
    <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
      <AdminAlmacenInventarioIndividual />
    </CommonLogLayout>
  );
}
