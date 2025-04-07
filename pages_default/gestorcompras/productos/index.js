import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingShoppingProductos from './../../../features/PurchasingShoppingProductos/index';

export default function productos() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingProductos />
    </CommoShoppingLayout>
  );
}
