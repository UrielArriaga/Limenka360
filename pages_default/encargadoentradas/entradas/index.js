import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepEntriesEntries from "../../../features/DepEntriesEntries";

export default function entradas() {
  return (
    <CommonLogLayout role={"encargadoentradas"}>
      <DepEntriesEntries />
    </CommonLogLayout>
  );
}
