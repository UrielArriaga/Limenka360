import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepEntriesInventoryUnit from "../../../features/DepEntriesInventoryUnit";

export default function inventarioindividual() {
  return (
    <CommonLogLayout role="encargadoentradas">
      <DepEntriesInventoryUnit />
    </CommonLogLayout>
  );
}
