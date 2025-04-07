import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepAttendantPickups from "../../../features/DepAttendantPickups";
// import DepAttendantPickups from "../../../features/DepAttendantPickups";

export default function Recolecciones() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantPickups />
    </CommonLogLayout>
  );
}
