import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicaInventory from "../../../features/BiomedicaInventory";
import BiomedicalInventoryManager from "../../../features/BiomedicalInventoryManager"

export default function Reparaciones() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
    <BiomedicalInventoryManager/>
    </CommonLogLayout>
  );
}

