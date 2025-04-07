import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import Order from "../../../features/ResponsiblePurchasingOrders/order";

export default function orden() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <Order />
    </CommoShoppingLayout>
  );
}
