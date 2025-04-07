import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import ResponsiblePurchasingNewProvider from './../../../../features/ResponsiblePurchasingNewProvider';

export default function nuevo() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingNewProvider />
    </CommoShoppingLayout>
  );
}
