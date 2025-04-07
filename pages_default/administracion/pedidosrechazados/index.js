import React from "react";
import AdminManagerLayout from "../../../layouts/AdminManagerLayout";
import AdminOrders from "../../../features/AdminOrders";

export default function PedidosRechazados() {
  return (
    <AdminManagerLayout>
        <AdminOrders orderStatus="Rechazado"/>
    </AdminManagerLayout>
  );
}