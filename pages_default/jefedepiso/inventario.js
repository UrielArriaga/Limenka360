import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import FloorManagerInventario from "../../features/FloorManagerInventario";

export default function Inventario() {
  return (
    <CommonLogLayout role={"jefedepiso"}>
      <FloorManagerInventario/>
    </CommonLogLayout>
  );
}
