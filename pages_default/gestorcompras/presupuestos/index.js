import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingShoppingPresupuestos from "../../../features/PurchasingShoppingPresupuestos";

export default function Presupuestos() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingPresupuestos />
    </CommoShoppingLayout>
  );
}
