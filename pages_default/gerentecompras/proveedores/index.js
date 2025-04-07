import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerProviders from "../../../features/PurchasingManagerProviders";

export default function proveedores() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerProviders />
    </CommoShoppingLayout>
  );
}
