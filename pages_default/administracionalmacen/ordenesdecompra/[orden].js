import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import Order from "../../../features/AdminAlmacenOrdenesCompra/order";

export default function Ordenes() {
  return (
    <CommonLogLayout role={"administrador_de_almacen"}>
     <Order/>
    </CommonLogLayout>
  );
}
