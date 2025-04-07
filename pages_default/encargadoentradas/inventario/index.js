import React from "react";
import DepEntriesInventory from "../../../features/DepEntriesInventory";
import CommonLogLayout from "../../../layouts/CommonLogLayout";

export default function inventario() {
  return (
    <CommonLogLayout role={"encargadoentradas"}>
      <DepEntriesInventory />
    </CommonLogLayout>
  );
}
