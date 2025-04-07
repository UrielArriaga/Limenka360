import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterAttendantExits from "../../../features/MasterAttendantExits";

export default function MasterAlmacen() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterAttendantExits />
    </CommonLogLayout>
  );
}
