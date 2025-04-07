import React from "react";
import MasterAlmacenPedidos from "../../features/MasterAlmacenPedidos";
import CommonLogLayout from "../../layouts/CommonLogLayout";

export default function MasterAlmacen() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterAlmacenPedidos />
    </CommonLogLayout>
  );
}
