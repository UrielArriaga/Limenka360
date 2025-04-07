import React from "react";
import CommoShoppingLayout from "../../layouts/CommoShoppingLayout";

import ResponsiblePurchasingPedidos from '../../features/ResponsiblePurchasingPedidos';
export default function Pedidos() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingPedidos />
    </CommoShoppingLayout>
  );
}
