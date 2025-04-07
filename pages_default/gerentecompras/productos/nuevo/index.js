import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerProductNew from "../../../../features/PurchasingManagerProductNew";

export default function nuevo() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerProductNew />
    </CommoShoppingLayout>
  );
}
