import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import ProductosBiome from "../../../features/Biomedica";

export default function Reparaciones() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
      <ProductosBiome type="reparación"/>
    </CommonLogLayout>
  );
}

