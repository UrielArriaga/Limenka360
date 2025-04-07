import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterPedidosEnProceso from "../../../features/MasterPedidosEnProceso";

export default function PedidosEnProceso() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterPedidosEnProceso/>
    </CommonLogLayout>
  );
}
