import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FloorManagerEntradas from "../../features/FloorManagerEntradas";

export default function Entradas() {
  return (
    <CommonLogLayout role={"jefedepiso"}>
      <FloorManagerEntradas/>
    </CommonLogLayout>
  );
}
