import React from "react";
import ProductosBiome from "../../../features/Biomedica";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicalManagerTickets from "../../../features/BiomedicalManagerTickets"


export default function index() {
  return (
    <CommonLogLayout role={"gerente_biomedico"}>
    <BiomedicalManagerTickets/>
    </CommonLogLayout>
  );
}