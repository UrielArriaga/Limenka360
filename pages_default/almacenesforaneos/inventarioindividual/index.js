import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterInventarioUnit from "../../../features/MasterInventarioUnit";

export default function inventarioindividual() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterInventarioUnit/>
    </CommonLogLayout>
  );
}
