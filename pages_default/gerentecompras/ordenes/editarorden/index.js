import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerEditOrder from "../../../../features/PurchasingManagerEditOrder";
import DirComprasEditOrderv1 from "../../../../features/DirComprasEditOrderv1";

export default function EditOrder() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <DirComprasEditOrderv1 />
    </CommoShoppingLayout>
  );
}
