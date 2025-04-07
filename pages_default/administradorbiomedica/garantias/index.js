import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminBiomedicalWarranties from "../../../features/AdminBiomedicalWarranties";

export default function AdminBioWarranties() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
    <AdminBiomedicalWarranties/>
    </CommonLogLayout>
  );
}
