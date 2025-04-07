import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterAdminEntries from "../../../features/MasterAdminEntries";

export default function inventarioindividual() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterAdminEntries/>
    </CommonLogLayout>
  );
}
