import React from "react";
import DirComprasNewOrder from "../../../../features/DirComprasNewOrder";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";

export default function index() {
  return (
    <CommoShoppingLayout role="gerente_compras">
      <DirComprasNewOrder />
    </CommoShoppingLayout>
  );
}
