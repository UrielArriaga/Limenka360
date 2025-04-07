import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingProveedores from "../../../features/PurchasingManagerShoppingProveedores";

export default function proveedores() {
  return (
    <CommoShoppingLayout role="coordinador_compras">
      <PurchasingManagerShoppingProveedores />
    </CommoShoppingLayout>
  );
}
