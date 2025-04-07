import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import BiomedicalDashboardManager from "../../features/BiomedicalDashboardManager"

export default function index() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
      <h2>Dashboard</h2>
      <BiomedicalDashboardManager/>
    </CommonLogLayout>
  );
}

