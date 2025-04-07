import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingShoppingProveedores from './../../../features/PurchasingShoppingProveedores/index';

export default function proveedores() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingShoppingProveedores />
    </CommoShoppingLayout>
  );
}
