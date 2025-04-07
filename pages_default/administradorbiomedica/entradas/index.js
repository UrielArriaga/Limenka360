import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import AdminBiomedicalTickets from "../../../features/AdminBiomedicalTicketes";


export default function index() {
  return (
    <CommonLogLayout role={"administrador_biomedico"}>
    <AdminBiomedicalTickets/>
    </CommonLogLayout>
  );
}