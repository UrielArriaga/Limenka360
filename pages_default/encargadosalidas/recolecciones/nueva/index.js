import React from "react";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";
import DepAttendantRecoletionsNewRoute from "../../../../features/DepAttendantRecolectionsNewRoute";

export default function Recolecciones() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
        <DepAttendantRecoletionsNewRoute/>
    </CommonLogLayout>
  );
}
