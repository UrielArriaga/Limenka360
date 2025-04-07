import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerPayments from "../../../features/PurchasingManagerPayments";

export default function pagos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerPayments />
    </CommoShoppingLayout>
  );
}
