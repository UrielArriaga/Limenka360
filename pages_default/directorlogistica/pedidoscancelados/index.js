import React from "react";
import DirLogLayout from "../../../layouts/DirLogLayout";
import DirLogPedidos from "../../../features/DirLogPedidos";

export default function Pedidos() {
  return (
    <DirLogLayout>
      <DirLogPedidos status={"cancelado"}/>
    </DirLogLayout>
  );
}
