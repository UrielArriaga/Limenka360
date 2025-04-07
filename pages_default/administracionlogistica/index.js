import React from "react";
import DirLogLayout from "../../layouts/DirLogLayout";
import AdminLogPedidos from "../../features/AdminLogPedidos";
import CommonLogLayout from "../../layouts/CommonLogLayout";

export default function Pedidos() {
  return (
    <CommonLogLayout role="administrador_logistica">
      <AdminLogPedidos />
    </CommonLogLayout>
  );
}
