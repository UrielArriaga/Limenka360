import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import NuevaOrden from "../../../../features/ComprasNuevaOrden";

export default function index() {
  return (
    <CommoShoppingLayout>
      <NuevaOrden />
    </CommoShoppingLayout>
  );
}
