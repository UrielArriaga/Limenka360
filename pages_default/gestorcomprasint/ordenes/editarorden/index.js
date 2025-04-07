import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import InternationalPurchasingManageEditOrder from "../../../../features/InternationalPurchasingManageEditOrder";

export default function EditOrder() {
  return (
    <CommoShoppingLayout role="gestor_de_compras_int">
      <InternationalPurchasingManageEditOrder />
    </CommoShoppingLayout>
  );
}
