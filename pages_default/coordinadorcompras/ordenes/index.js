import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingOrders from './../../../features/PurchasingManagerShoppingOrders/index';


export default function ordenes() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingOrders/>
    </CommoShoppingLayout>
  );
}
