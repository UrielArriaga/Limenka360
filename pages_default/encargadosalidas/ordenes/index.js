import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import ShoppingOrdenes from "../../../features/DepAttendantOrders";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
     <ShoppingOrdenes/>
    </CommonLogLayout>
  );
}
