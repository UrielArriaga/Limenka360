import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";

import ResponsiblePurchasingProveedores from './../../../features/ResponsiblePurchasingProveedores';

export default function proveedores() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingProveedores />
    </CommoShoppingLayout>
  );
}
