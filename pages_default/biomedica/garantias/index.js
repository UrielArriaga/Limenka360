import React from "react";
import CommonLogLayout from "../../../layouts/CommonLogLayout";
import BiomedicaWarranties from "../../../features/BiomedicaWarranties";

export default function BioWarranties() {
    return (
        <CommonLogLayout role={"areabiomedica"}>
            <BiomedicaWarranties />
        </CommonLogLayout>
    )
}