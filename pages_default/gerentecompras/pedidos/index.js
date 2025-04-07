import React from "react";

import PurchasingManagerPedidos from "../../../features/PurchasingManager";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";

export default function Pedidos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerPedidos />
    </CommoShoppingLayout>
  );
}
