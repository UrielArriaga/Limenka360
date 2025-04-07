import React from "react";
// import CommonLogLayout from "../../layouts/CommonLogLayout";
import ProductosBiome from "../../../features/Biomedica";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
// import ProductosBiome from "../../features/Biomedica";

export default function index() {
  return (
    <CommonLogLayout role={"areabiomedica"}>
      <ProductosBiome type="general"/>
    </CommonLogLayout>
  );
}