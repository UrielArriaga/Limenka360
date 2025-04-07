import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminBiomedicalRepair from "../../../features/AdminBiomedicalRepair"

export default function Reparaciones() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
      <AdminBiomedicalRepair type="reparación"/>
    </CommonLogLayout>
  );
}

