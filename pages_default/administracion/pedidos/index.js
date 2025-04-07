import React from "react";
import AdminManagerLayout from "../../../layouts/AdminManagerLayout";
import AdminOrders from "../../../features/AdminOrders";

export default function Pedidos() {
  return (
    <AdminManagerLayout>
      <AdminOrders />
    </AdminManagerLayout>
  );
}
