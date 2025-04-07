import React from "react";
import CommonLogLayout from "../../../../layouts/CommonLogLayout";
import EditPurchaseOrder from "../../../../features/DepAttendantEditOrder";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"encargadosalidas"}>
        <EditPurchaseOrder/>
    </CommonLogLayout>
  );
}
