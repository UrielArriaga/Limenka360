import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepAttendantRutas from "../../../features/DepAttendantRoutes";

export default function Rutas() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantRutas/>
    </CommonLogLayout>
  );
}
