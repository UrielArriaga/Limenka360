import React from "react";
import DirLogLayout from "../../../layouts/DirLogLayout";
import AdminLogPedidos from "../../../features/AdminLogPedidos";

export default function Pedidos() {
  return (
    <DirLogLayout>
      <AdminLogPedidos status={"cancelado"}/>
    </DirLogLayout>
  );
}
