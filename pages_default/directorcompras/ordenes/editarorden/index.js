import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import DirComprasEditOrder from "../../../../features/DirComprasEditOrder";
import DirComprasEditOrderv1 from "../../../../features/DirComprasEditOrderv1";

function EditOrder() {
  return (
    <CommoShoppingLayout role="director_compras">
      <DirComprasEditOrderv1 />
    </CommoShoppingLayout>
  );
}

export default EditOrder;
