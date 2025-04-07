import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerNewProvider from "../../../../features/PurchasingManagerNewProvider";

export default function nuevo() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <PurchasingManagerNewProvider />
    </CommoShoppingLayout>
  );
}
