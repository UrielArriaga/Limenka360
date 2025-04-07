import React from "react";
import FloorManagerLayout from "../../layouts/FloorManagerLayout";
import FloorManagerPedidos from "../../features/FloorManagerPedidos";
import CommonLogLayout from "../../layouts/CommonLogLayout";

export default function PedidosCompletos() {
  return (
    <CommonLogLayout role={"jefedepiso"}>
      <FloorManagerPedidos />
    </CommonLogLayout>
  );
}
