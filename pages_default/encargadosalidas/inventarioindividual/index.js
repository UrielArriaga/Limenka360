import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepAttendantInventarioUnit from "../../../features/DepAttendantInventarioIndividual";

function InventarioIndividual() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
      <DepAttendantInventarioUnit />
    </CommonLogLayout>
  );
}

export default InventarioIndividual;
