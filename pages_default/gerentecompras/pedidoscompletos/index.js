import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerOrdersComplete from "../../../features/PurchasingManagerOrdersComplete";

export default function pedidoscompletos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerOrdersComplete />
    </CommoShoppingLayout>
  );
}
