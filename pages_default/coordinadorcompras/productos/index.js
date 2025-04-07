import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingProductos from './../../../features/PurchasingManagerShoppingProductos';

export default function productos() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingProductos />
    </CommoShoppingLayout>
  );
}
