import React from "react";
import AdminManagerLayout from "../../layouts/AdminManagerLayout";
import { AdminManagerDash } from "../../features/AdminManagerDash";
import LayoutManagerAdmin from "../../layouts/LayoutManagerAdmin";

export default function Dashboard() {
  return (
    <LayoutManagerAdmin role={"admin_gerente"}>
      <AdminManagerDash />
    </LayoutManagerAdmin>
  );
}
