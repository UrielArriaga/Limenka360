import React from "react";
import DepAttendantNewRoute from "../../../features/DepAttendantNewRoute";
import CommonLogLayout from "../../../layouts/CommonLogLayout";

export default function Nuevo() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantNewRoute />
    </CommonLogLayout>
  );
}
