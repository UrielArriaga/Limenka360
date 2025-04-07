import React from "react";
import DepAttendantPedidos from "../../../features/DepAttendantPedidos";
import CommonLogLayout from "../../../layouts/CommonLogLayout";

export default function Pedidos() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantPedidos />
    </CommonLogLayout>
  );
}
