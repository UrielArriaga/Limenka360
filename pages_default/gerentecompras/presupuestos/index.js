import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerBudgets from "../../../features/PurchasingManagerBudgets";

export default function Presupuestos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerBudgets />
    </CommoShoppingLayout>
  );
}
