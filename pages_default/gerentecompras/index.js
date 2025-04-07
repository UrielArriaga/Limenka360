import React from "react";
import CommoShoppingLayout from "../../layouts/CommoShoppingLayout";
import PurchasingManagerPedidos from "../../features/PurchasingManager";
import PurchasingManagerDashboard from "../../features/PurchasingManagerDashboard";

export default function Pedidos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerDashboard />
    </CommoShoppingLayout>
  );
}
