import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import ResponsiblePurchasingCompraNuevaOrden from './../../../../features/ResponsiblePurchasingCompraNuevaOrden'

export default function index() {
  return (
    <CommoShoppingLayout role="responsable_compras">
      <ResponsiblePurchasingCompraNuevaOrden/>
    </CommoShoppingLayout>
  );
}
