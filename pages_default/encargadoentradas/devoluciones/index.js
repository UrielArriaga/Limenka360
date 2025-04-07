import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepEntriesOrdersDevoluciones from "../../../features/DepEntriesOrdersDevoluciones";

export default function entradas() {
  return (
    <CommonLogLayout role={"encargadoentradas"}>
    <DepEntriesOrdersDevoluciones/>
    </CommonLogLayout>
  );
}
