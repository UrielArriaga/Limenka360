import React from "react";
import AdminManagerLayout from "../../../layouts/AdminManagerLayout";
import AdminOrdersApproved from "../../../features/AdminOrdersApproved";

export default function PedidosAprobados() {
  return (
    <AdminManagerLayout>
        <AdminOrdersApproved/>
    </AdminManagerLayout>
  );
}
