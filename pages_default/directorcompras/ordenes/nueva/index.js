import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import DirComprasNewOrder from "../../../../features/DirComprasNewOrder";

function NewOrder() {
  return (
    <CommoShoppingLayout role="director_compras">
      <DirComprasNewOrder />
    </CommoShoppingLayout>
  );
}

export default NewOrder;
