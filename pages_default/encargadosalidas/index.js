import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import DepAttendantExits from "../../features/DepAttendantExits";
import DepAttendantPedidos from "../../features/DepAttendantPedidos";

export default function Encargadosalidas() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantPedidos />
    </CommonLogLayout>
  );
}
