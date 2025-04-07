import React from "react";
import ShoppingNacionalNewProvider from "../../../../features/ShoppingNacionalNewProvider";
import CommoShoppingLayout from "../../../../layouts/CommoShoppingLayout";

function NewProvider() {
  return (
    <CommoShoppingLayout role="compras">
      <ShoppingNacionalNewProvider />
    </CommoShoppingLayout>
  );
}

export default NewProvider;
