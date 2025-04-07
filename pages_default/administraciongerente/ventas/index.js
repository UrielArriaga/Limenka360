import React from "react";
import AdminManagerSales from "../../../features/AdminManagerSales";
import LayoutManagerAdmin from "../../../layouts/LayoutManagerAdmin";

export default function ventas() {
  return (
    <LayoutManagerAdmin role={"admin_gerente"}>
      <AdminManagerSales />
    </LayoutManagerAdmin>
  );
}
