import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import PurchasingManagerCompraNuevaOrden from './../../../../features/PurchasingManagerCompraNuevaOrden';

export default function index() {
  return (
    <CommoShoppingLayout role="gestor_compras">
      <PurchasingManagerCompraNuevaOrden/>
    </CommoShoppingLayout>
  );
}
