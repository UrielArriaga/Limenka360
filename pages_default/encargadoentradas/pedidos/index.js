import React from "react";

import CommonLogLayout from "../../../layouts/CommonLogLayout";
import DepEntriesOrders from "../../../features/DepEntriesOrders";

export default function Pedidos() {
  return (
    <CommonLogLayout role={"encargadoentradas"}>
      <DepEntriesOrders />
    </CommonLogLayout>
  );
}
