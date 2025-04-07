import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import Order from "../../../features/InternationalPurchasingManageOrders/order";

export default function orden() {
  return (
    <CommoShoppingLayout role="gestor_de_compras_int">
      <Order />
    </CommoShoppingLayout>
  );
}
