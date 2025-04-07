import React from "react";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";
import DirComprasNewProduct from "../../../../features/DirComprasNewProduct";

function ProductsNew() {
  return (
    <CommoShoppingLayout role="director_compras">
      <DirComprasNewProduct />
    </CommoShoppingLayout>
  );
}

export default ProductsNew;
