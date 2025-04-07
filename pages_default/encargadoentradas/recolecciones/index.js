import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepEntriesPickups from "../../../features/DepEntriesPickups";

export default function Recolecciones() {
  return (
    <CommonLogLayout role="encargadoentradas">
      <DepEntriesPickups/>
    </CommonLogLayout>
  );
}
