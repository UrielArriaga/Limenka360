import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import Order from "../../../features/DepAttendantOrders/order";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
     <Order/>
    </CommonLogLayout>
  );
}
