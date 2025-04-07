import React from "react";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";
import DepAttendantRecoletionsNewRoute from "../../../../features/DepAttendantRecolectionsNewRoute";
import DepEntriesGenerateInput from "../../../../features/DepEntriesGenerateInput";

export default function Recolecciones() {
  return (
    <CommonLogLayout role={"encargadoentradas"}>
        <DepEntriesGenerateInput/>
    </CommonLogLayout>
  );
}
