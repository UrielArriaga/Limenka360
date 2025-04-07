import React from "react";
import CommonLogLayout from "../../layouts/CommonLogLayout";
import ProductosBiome from "../../features/Biomedica";

export default function index() {
  return (
    <CommonLogLayout role={"areabiomedica"}>
      <h2>Dashboard</h2>
      {/* <ProductosBiome type="general"/> */}
    </CommonLogLayout>
  );
}

