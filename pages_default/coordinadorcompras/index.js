import React from "react";
import CommoShoppingLayout from "../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingPedidos from '../../features/PurchasingManagerShoppingPedidos';
export default function Pedidos() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingPedidos />
    </CommoShoppingLayout>
  );
}
