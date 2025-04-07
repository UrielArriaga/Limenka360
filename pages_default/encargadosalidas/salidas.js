import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import DepAttendantExits from "../../features/DepAttendantExits";

export default function Encargadosalidas() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantExits />
    </CommonLogLayout>
  );
}
