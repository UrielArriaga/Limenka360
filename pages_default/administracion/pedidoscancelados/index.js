import React from "react";
import AdminManagerLayout from "../../../layouts/AdminManagerLayout";
import AdminOrders from "../../../features/AdminOrders";

export default function PedidosCancelados() {
  return (
    <AdminManagerLayout>
      <AdminOrders orderStatus="Cancelado" />
    </AdminManagerLayout>
  );
}
