import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingShoppingProductNew from './../../../../features/PurchasingShoppingProductNew/index';

export default function nuevo() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingProductNew  />
    </CommoShoppingLayout>
  );
}
