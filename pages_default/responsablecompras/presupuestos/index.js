import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import ResponsiblePurchasingPresupuestos from "./../../../features/ResponsiblePurchasingPresupuestos";

export default function Presupuestos() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingPresupuestos />
    </CommoShoppingLayout>
  );
}
