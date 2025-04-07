import React from "react";
import DirLogLayout from "../../../layouts/DirLogLayout";
import AdminLogPedidosCompletos from "../../../features/AdminLogPedidosCompletos";

export default function Pedidos() {
  return (
    <DirLogLayout>
      <AdminLogPedidosCompletos />
    </DirLogLayout>
  );
}
