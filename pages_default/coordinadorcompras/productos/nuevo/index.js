import React from "react";

import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingProductNew from './../../../../features/PurchasingManagerShoppingProductNew';

export default function nuevo() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingProductNew />
    </CommoShoppingLayout>
  );
}
