import React from "react";
import DirLogLayout from "../../../layouts/DirLogLayout";
import DirLogPedidos from "../../../features/DirLogPedidos";
import DirLogPedidosComplete from "../../../features/DirLogPedidosComplete";

export default function Pedidos() {
  return (
    <DirLogLayout>
      <DirLogPedidosComplete />
    </DirLogLayout>
  );
}
