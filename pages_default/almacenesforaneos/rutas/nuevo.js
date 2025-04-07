import React from "react";

import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterAttendantNewRoute from "../../../features/MasterAttendantNewRoute";

export default function Nuevo() {
  return (
    <CommonLogLayout role={"master_almacen"}>
      <MasterAttendantNewRoute />
    </CommonLogLayout>
  );
}
