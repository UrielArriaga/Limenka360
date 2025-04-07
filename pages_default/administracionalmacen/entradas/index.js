import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";
import AdminAlmacenEntradas from "../../../features/AdminAlmacenEntradas";

export default function Entradas() {
  return (
    <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>
     <AdminAlmacenEntradas/>
    </CommonLogLayout>
  );
}
