import React from "react";
import CommoShoppingLayout from "../../../layouts/CommoShoppingLayout";
import PurchasingManagerShoppingPresupuestos from './../../../features/PurchasingManagerShoppingPresupuestos';

export default function Presupuestos() {
  return (
    <CommoShoppingLayout role="coordinador_compras" >
      <PurchasingManagerShoppingPresupuestos/>
    </CommoShoppingLayout>
  );
}
