import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import ResponsiblePurchasingOrders from './../../../features/ResponsiblePurchasingOrders'

export default function ordenes() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingOrders  />
    </CommoShoppingLayout>
  );
}
