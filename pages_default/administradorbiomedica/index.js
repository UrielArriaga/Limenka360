import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import AdminBiomedicalDashboard from "../../features/AdminBiomedicalDashboard"

export default function index() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
      <h2>Dashboard</h2>
      <AdminBiomedicalDashboard/>
    </CommonLogLayout>
  );
}

