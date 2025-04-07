import React from "react";

import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingProviderNew from './../../../../features/PurchasingManagerShoppingProviderNew';

export default function nuevo() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingProviderNew />
    </CommoShoppingLayout>
  );
}
