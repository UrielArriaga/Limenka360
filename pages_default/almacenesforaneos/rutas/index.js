import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import MasterAttendantRutas from "../../../features/MasterAttendantRutas";


export default function Rutas() {
  return (
    <CommonLogLayout role={"master_almacen"}>
   <MasterAttendantRutas/>
    </CommonLogLayout>
  );
}
