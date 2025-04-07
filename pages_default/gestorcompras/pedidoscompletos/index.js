import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingShoppingCompleteOrders from './../../../features/PurchasingShoppingCompleteOrders/index';

export default function pedidoscompletos() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingCompleteOrders />
    </CommoShoppingLayout>
  );
}
