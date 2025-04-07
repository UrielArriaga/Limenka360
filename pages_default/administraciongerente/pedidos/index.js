import React from "react";
import AdminManagerLayout from "../../../layouts/AdminManagerLayout";
import AdminManagerOrders from "../../../features/AdminManagerOrders";
import LayoutManagerAdmin from "../../../layouts/LayoutManagerAdmin";

export default function Pedidos() {
  return (
    <LayoutManagerAdmin role={"admin_gerente"}>
      <AdminManagerOrders />
    </LayoutManagerAdmin>
  );
}
