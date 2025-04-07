import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import Order from "../../../features/PurchasingManagerOrders/order";

export default function orden() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <Order />
    </CommoShoppingLayout>
  );
}
