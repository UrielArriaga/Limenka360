import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";
import AdminDepDevolucione from "../../../features/AdminAlmacenDevoluciones";

export default function Devoluciones() {
  return <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
    <AdminDepDevolucione/>
  </CommonLogLayout>;
}
