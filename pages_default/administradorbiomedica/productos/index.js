import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminBiomedicalProduct from "../../../features/AdminBiomedicalProduct"

export default function index() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
      <AdminBiomedicalProduct type="general"/>
    </CommonLogLayout>
  );
}