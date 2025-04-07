import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerOrders from "../../../features/PurchasingManagerOrders";

export default function ordenes() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerOrders />
    </CommoShoppingLayout>
  );
}
