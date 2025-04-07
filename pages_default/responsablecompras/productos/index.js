import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import ResponsiblePurchasingProductos from './../../../features/ResponsiblePurchasingProductos'

export default function productos() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingProductos />
    </CommoShoppingLayout>
  );
}
