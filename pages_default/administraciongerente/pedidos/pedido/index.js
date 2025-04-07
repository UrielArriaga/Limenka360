import React from "react";
import AdminManagerLayout from "../../../../layouts/AdminManagerLayout";
import AdminManagerOrder from "../../../../features/AdminManagerOrder";

export default function Pedido() {
  return (
    <AdminManagerLayout>
      <AdminManagerOrder />
    </AdminManagerLayout>
  );
}
