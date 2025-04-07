import React from "react";
import ProductosBiome from "../../../features/Biomedica";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicEntradas from "../../../features/BiomedicEntradas";


export default function index() {
  return (
    <CommonLogLayout role={"areabiomedica"}>
    <BiomedicEntradas/>
    </CommonLogLayout>
  );
}