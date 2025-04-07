import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerProducts from "../../../features/PurchasingManagerProducts";

export default function productos() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerProducts />
    </CommoShoppingLayout>
  );
}
