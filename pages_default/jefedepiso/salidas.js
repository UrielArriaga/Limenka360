import React from "react";

import CommonLogLayout from "../../layouts/CommonLogLayout";
import FloorManagerSalida from "../../features/FloorManagerSalida";

export default function Salidas() {
  return (
    <CommonLogLayout role={"jefedepiso"}>
      <FloorManagerSalida />
    </CommonLogLayout>
  );
}
