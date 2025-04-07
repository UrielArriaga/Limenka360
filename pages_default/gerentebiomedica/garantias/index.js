import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicalWarrantiesManager from "../../../features/BiomedicalWarrantiesManager"

export default function BioWarrantiesManager() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
    <BiomedicalWarrantiesManager/>
    </CommonLogLayout>
  );
}

