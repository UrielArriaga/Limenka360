import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingShoppingProviderNew from './../../../../features/PurchasingShoppingProviderNew/index';

export default function nuevo() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingProviderNew />
    </CommoShoppingLayout>
  );
}
