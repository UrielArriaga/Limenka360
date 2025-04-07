import React from "react";
// import CommonLogLayout from "../../layouts/CommonLogLayout";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicalProductManager from "../../../features/BiomedicalProductManager"
// import ProductosBiome from "../../features/Biomedica";

export default function index() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
      <BiomedicalProductManager type="general"/>
    </CommonLogLayout>
  );
}