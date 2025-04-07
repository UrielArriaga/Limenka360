import React from "react";
import { useRouter } from "next/router";
import DirLogLayout from "../../../layouts/DirLogLayout";
import DirLogVerPedido from "../../../features/DirLogPedido";

export default function Pedido() {
  const router = useRouter();
  const { pedido } = router.query;
  return (
    <DirLogLayout>
      <DirLogVerPedido pedido={pedido} />
    </DirLogLayout>
  )
}
