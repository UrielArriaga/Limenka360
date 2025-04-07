import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingShoppingOrders from './../../../features/PurchasingShoppingOrders';


export default function ordenes() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingOrders/>
    </CommoShoppingLayout>
  );
}
