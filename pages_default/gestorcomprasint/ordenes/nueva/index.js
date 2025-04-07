import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import InternationalPurchasingManageNewBuyOrder from './../../../../features/InternationalPurchasingManageNewBuyOrder';

export default function index() {
  return (
    <CommoShoppingLayout role="gestor_de_compras_int">
      <InternationalPurchasingManageNewBuyOrder/>
    </CommoShoppingLayout>
  );
}
