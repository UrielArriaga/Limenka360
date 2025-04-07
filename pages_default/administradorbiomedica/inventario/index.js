import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminBiomedicalInventory from "../../../features/AdminBiomedicalInventory"

export default function Reparaciones() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
    <AdminBiomedicalInventory/>
    </CommonLogLayout>
  );
}

