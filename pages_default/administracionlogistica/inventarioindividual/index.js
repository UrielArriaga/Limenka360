import React from "react";
import AdminLogInventarioUnit from "../../../features/AdminLogInventarioUnit";
import CommonLogLayout from "../../../layouts/CommonLogLayout";

export default function Inventario() {
  return (
    <CommonLogLayout role="administrador_logistica">
      <AdminLogInventarioUnit />
    </CommonLogLayout>
  );
}
