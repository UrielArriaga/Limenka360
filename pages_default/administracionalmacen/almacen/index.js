import React from "react";
import CommonLogLayout, { rolesCommonLaoyut } from "../../../layouts/CommonLogLayout";

export default function Biomedica() {
  return <CommonLogLayout role={rolesCommonLaoyut.administrador_de_almacen}>Inventario</CommonLogLayout>;
}
